import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertQuote, quotes } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createQuote(quote: InsertQuote) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create quote: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(quotes).values(quote);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create quote:", error);
    throw error;
  }
}

export async function getAllQuotes() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get quotes: database not available");
    return [];
  }

  try {
    const result = await db.select().from(quotes).orderBy(quotes.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get quotes:", error);
    throw error;
  }
}

export async function updateQuoteStatus(quoteId: number, status: "new" | "contacted" | "completed") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update quote: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.update(quotes).set({ status }).where(eq(quotes.id, quoteId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update quote:", error);
    throw error;
  }
}

export async function getQuotesAnalytics() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get analytics: database not available");
    return null;
  }

  try {
    const allQuotes = await db.select().from(quotes);
    
    // Calculate status distribution
    const statusCounts = {
      new: allQuotes.filter(q => q.status === 'new').length,
      contacted: allQuotes.filter(q => q.status === 'contacted').length,
      completed: allQuotes.filter(q => q.status === 'completed').length,
    };

    // Calculate service distribution
    const serviceCounts: Record<string, number> = {};
    allQuotes.forEach(q => {
      if (q.serviceType) {
        serviceCounts[q.serviceType] = (serviceCounts[q.serviceType] || 0) + 1;
      }
    });

    // Calculate property type distribution
    const propertyTypeCounts: Record<string, number> = {};
    allQuotes.forEach(q => {
      if (q.propertyType) {
        propertyTypeCounts[q.propertyType] = (propertyTypeCounts[q.propertyType] || 0) + 1;
      }
    });

    // Calculate conversion rate
    const totalQuotes = allQuotes.length;
    const completedQuotes = statusCounts.completed;
    const conversionRate = totalQuotes > 0 ? ((completedQuotes / totalQuotes) * 100).toFixed(1) : '0';

    // Get quotes by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const quotesByDate: Record<string, number> = {};
    allQuotes
      .filter(q => q.createdAt && new Date(q.createdAt) >= thirtyDaysAgo)
      .forEach(q => {
        const dateStr = q.createdAt ? new Date(q.createdAt).toISOString().split('T')[0] : '';
        if (dateStr) {
          quotesByDate[dateStr] = (quotesByDate[dateStr] || 0) + 1;
        }
      });

    return {
      totalQuotes,
      statusCounts,
      serviceCounts,
      propertyTypeCounts,
      conversionRate,
      quotesByDate,
      recentQuotes: allQuotes.slice(-5).reverse(),
    };
  } catch (error) {
    console.error("[Database] Failed to get analytics:", error);
    throw error;
  }
}
