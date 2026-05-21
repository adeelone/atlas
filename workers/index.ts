import { Worker } from "bullmq";
import { logger } from "@/lib/logger";

const connection = { url: process.env.REDIS_URL ?? "redis://localhost:6379" };

const worker = new Worker(
  "atlas-jobs",
  async (job) => {
    logger.info({ jobId: job.id, name: job.name }, "processing atlas job");
    return { ok: true };
  },
  { connection }
);

worker.on("failed", (job, error) => logger.error({ jobId: job?.id, error }, "atlas job failed"));
