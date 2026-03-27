import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createQuote, getAllQuotes, updateQuoteStatus, getQuotesAnalytics } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  quotes: router({
    submit: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1, "Name is required"),
          customerEmail: z.string().email("Valid email is required"),
          customerPhone: z.string().min(10, "Valid phone is required"),
          propertyType: z.enum(["residential", "commercial"]),
          serviceType: z.string().min(1, "Service type is required"),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Create quote in database
          await createQuote({
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            propertyType: input.propertyType,
            serviceType: input.serviceType,
            description: input.description,
          });

          // Send email notification to owner
          const emailContent = `New Quote Request from ${input.customerName}

Contact Information:
- Email: ${input.customerEmail}
- Phone: ${input.customerPhone}

Property Type: ${input.propertyType}
Service Type: ${input.serviceType}

Description:
${input.description || "No additional details provided"}

Please follow up with the customer as soon as possible.`;

          await notifyOwner({
            title: `New Quote Request from ${input.customerName}`,
            content: emailContent,
          });

          return {
            success: true,
            message: "Quote request submitted successfully. We will contact you soon!",
          };
        } catch (error) {
          console.error("[Quote Submission] Error:", error);
          throw new Error("Failed to submit quote request");
        }
      }),
    list: publicProcedure.query(async () => {
      return await getAllQuotes();
    }),
    updateStatus: publicProcedure
      .input(
        z.object({
          quoteId: z.number().int().positive(),
          status: z.enum(["new", "contacted", "completed"]),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await updateQuoteStatus(input.quoteId, input.status);
          return {
            success: true,
            message: "Quote status updated successfully",
          };
        } catch (error) {
          console.error("[Quote Update] Error:", error);
          throw new Error("Failed to update quote status");
        }
      }),
    analytics: publicProcedure.query(async () => {
      return await getQuotesAnalytics();
    }),
  }),
});

export type AppRouter = typeof appRouter;
