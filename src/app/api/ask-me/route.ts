import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 5, // Maximum requests per session
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
};

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

import { buildAskMeContext } from "../../lib/profile-data";

const CONTEXT = buildAskMeContext();

// Define types for better type safety
interface ApiResponse {
  answer: string;
  timestamp: string;
  model: string;
}

// Validate environment variables
function validateEnv(): { apiKey: string; model: string } {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  const model = process.env.AI_MODEL;

  if (!apiKey) {
    throw new Error("AI_GATEWAY_API_KEY environment variable is not set");
  }
  if (!model) {
    throw new Error("AI_MODEL environment variable is not set");
  }

  return { apiKey, model };
}

async function queryAI(question: string): Promise<string> {
  const { model } = validateEnv();

  const { text } = await generateText({
    model: model,
    system: CONTEXT,
    prompt: `Question: ${question}\n\nProvide a clear, direct answer based on the context above. Keep it brief but complete. Use Markdown formatting with bold for emphasis.`,
    maxRetries: 3,
  });

  return text;
}

export async function POST(request: NextRequest) {
  try {
    // Get client identifier (IP address or session)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    const clientId = ip || request.headers.get("x-real-ip") || "anonymous";

    // Check rate limit
    const now = Date.now();
    const rateLimitData = rateLimitStore.get(clientId);

    if (rateLimitData) {
      if (now < rateLimitData.resetTime) {
        if (rateLimitData.count >= RATE_LIMIT.maxRequests) {
          const resetInMinutes = Math.ceil(
            (rateLimitData.resetTime - now) / 60000
          );
          return NextResponse.json(
            {
              error: `Rate limit exceeded. You can ask ${
                RATE_LIMIT.maxRequests
              } questions per hour. Please try again in ${resetInMinutes} minute${
                resetInMinutes !== 1 ? "s" : ""
              }.`,
              remainingRequests: 0,
              resetTime: new Date(rateLimitData.resetTime).toISOString(),
            },
            { status: 429 }
          );
        }
      } else {
        // Reset the counter if window has passed
        rateLimitStore.set(clientId, {
          count: 0,
          resetTime: now + RATE_LIMIT.windowMs,
        });
      }
    } else {
      // First request from this client
      rateLimitStore.set(clientId, {
        count: 0,
        resetTime: now + RATE_LIMIT.windowMs,
      });
    }

    // Parse request body
    let body: { question?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { question } = body;
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required and must be a string" },
        { status: 400 }
      );
    }

    // Query AI via Vercel Gateway
    console.log(`Querying AI with question: ${question}`);
    const answer = await queryAI(question);

    // Increment request count after successful query
    const currentData = rateLimitStore.get(clientId)!;
    rateLimitStore.set(clientId, {
      count: currentData.count + 1,
      resetTime: currentData.resetTime,
    });

    const { model } = validateEnv();
    const remainingRequests = RATE_LIMIT.maxRequests - (currentData.count + 1);

    const response: ApiResponse = {
      answer: answer || "I couldn't generate a proper response.",
      timestamp: new Date().toISOString(),
      model: model,
    };

    return NextResponse.json(response, {
      headers: {
        "X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
        "X-RateLimit-Remaining": Math.max(0, remainingRequests).toString(),
        "X-RateLimit-Reset": new Date(currentData.resetTime).toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in ask-me API:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate response",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
