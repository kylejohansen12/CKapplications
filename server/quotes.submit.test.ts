import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  createQuote: vi.fn().mockResolvedValue({ insertId: 1 }),
  getAllQuotes: vi.fn().mockResolvedValue([]),
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

describe("quotes.submit", () => {
  it("successfully submits a quote request with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.submit({
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "9195551234",
      propertyType: "residential",
      serviceType: "Pressure Washing",
      description: "Need pressure washing for my deck",
    });

    expect(result).toEqual({
      success: true,
      message: "Quote request submitted successfully. We will contact you soon!",
    });
  });

  it("rejects quote with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.submit({
        customerName: "John Smith",
        customerEmail: "invalid-email",
        customerPhone: "9195551234",
        propertyType: "residential",
        serviceType: "Pressure Washing",
        description: "Need pressure washing",
      })
    ).rejects.toThrow();
  });

  it("rejects quote with missing required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.submit({
        customerName: "",
        customerEmail: "john@example.com",
        customerPhone: "9195551234",
        propertyType: "residential",
        serviceType: "Pressure Washing",
      })
    ).rejects.toThrow();
  });

  it("rejects quote with invalid phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.submit({
        customerName: "John Smith",
        customerEmail: "john@example.com",
        customerPhone: "123",
        propertyType: "residential",
        serviceType: "Pressure Washing",
      })
    ).rejects.toThrow();
  });

  it("accepts commercial property type", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.submit({
      customerName: "ABC Corp",
      customerEmail: "contact@abccorp.com",
      customerPhone: "9195559876",
      propertyType: "commercial",
      serviceType: "Roof Coating",
      description: "Need roof coating for our building",
    });

    expect(result.success).toBe(true);
  });
});
