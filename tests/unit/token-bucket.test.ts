import { describe, expect, it } from "vitest";
import { createTokenBucket } from "@/lib/utils/tokenBucket";

describe("token bucket", () => {
  it("limits and refills requests", () => {
    let now = 0;
    const bucket = createTokenBucket(2, 1, () => now);
    expect(bucket.take()).toBe(true);
    expect(bucket.take()).toBe(true);
    expect(bucket.take()).toBe(false);
    now = 1000;
    expect(bucket.take()).toBe(true);
    expect(bucket.remaining()).toBe(0);
  });
});
