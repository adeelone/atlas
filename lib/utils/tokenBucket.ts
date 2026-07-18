export interface TokenBucket {
  take: (count?: number) => boolean;
  remaining: () => number;
}

export function createTokenBucket(capacity: number, refillPerSecond: number, now = () => Date.now()): TokenBucket {
  let tokens = capacity;
  let last = now();

  function refill() {
    const current = now();
    const elapsedSeconds = Math.max(0, (current - last) / 1000);
    tokens = Math.min(capacity, tokens + elapsedSeconds * refillPerSecond);
    last = current;
  }

  return {
    take(count = 1) {
      refill();
      if (tokens < count) return false;
      tokens -= count;
      return true;
    },
    remaining() {
      refill();
      return Math.floor(tokens);
    }
  };
}
