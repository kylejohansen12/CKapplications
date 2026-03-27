import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createQuote: vi.fn().mockResolvedValue({ insertId: 1 }),
  getAllQuotes: vi.fn().mockResolvedValue([
    {
      id: 1,
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "9195551234",
      propertyType: "residential",
      serviceType: "Pressure Washing",
      description: "Need pressure washing",
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  updateQuoteStatus: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("quotes.updateStatus", () => {
  it("successfully updates quote status to contacted", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.updateStatus({
      quoteId: 1,
      status: "contacted",
    });

    expect(result).toEqual({
      success: true,
      message: "Quote status updated successfully",
    });
  });

  it("successfully updates quote status to completed", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.updateStatus({
      quoteId: 1,
      status: "completed",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid quote ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.updateStatus({
        quoteId: -1,
        status: "contacted",
      })
    ).rejects.toThrow();
  });

  it("rejects invalid status", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.updateStatus({
        quoteId: 1,
        status: "invalid" as any,
      })
    ).rejects.toThrow();
  });

  it("retrieves all quotes successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.list();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("customerName");
    expect(result[0]).toHaveProperty("status");
  });
});
