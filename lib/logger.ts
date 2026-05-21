import pino from "pino";

export const logger = pino({ name: "atlas", level: process.env.LOG_LEVEL ?? "info" });
