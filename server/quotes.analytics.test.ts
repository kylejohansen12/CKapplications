import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  const user = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("quotes.analytics", () => {
  it("returns analytics data with correct structure", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.analytics();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("totalQuotes");
    expect(result).toHaveProperty("statusCounts");
    expect(result).toHaveProperty("serviceCounts");
    expect(result).toHaveProperty("propertyTypeCounts");
    expect(result).toHaveProperty("conversionRate");
    expect(result).toHaveProperty("quotesByDate");
    expect(result).toHaveProperty("recentQuotes");
  });

  it("returns valid status counts", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.analytics();

    expect(result?.statusCounts).toHaveProperty("new");
    expect(result?.statusCounts).toHaveProperty("contacted");
    expect(result?.statusCounts).toHaveProperty("completed");
    expect(typeof result?.statusCounts.new).toBe("number");
    expect(typeof result?.statusCounts.contacted).toBe("number");
    expect(typeof result?.statusCounts.completed).toBe("number");
  });

  it("calculates conversion rate correctly", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.analytics();

    expect(result?.conversionRate).toBeDefined();
    const rate = parseFloat(result?.conversionRate || "0");
    expect(rate).toBeGreaterThanOrEqual(0);
    expect(rate).toBeLessThanOrEqual(100);
  });

  it("returns arrays for service and property type counts", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.analytics();

    expect(typeof result?.serviceCounts).toBe("object");
    expect(typeof result?.propertyTypeCounts).toBe("object");
    expect(typeof result?.quotesByDate).toBe("object");
  });

  it("returns recent quotes as array", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.analytics();

    expect(Array.isArray(result?.recentQuotes)).toBe(true);
  });
});
