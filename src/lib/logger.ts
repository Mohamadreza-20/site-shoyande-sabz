type LogContext = Record<string, unknown> | undefined;

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return error;
}

function write(level: "log" | "warn" | "error", message: string, context?: LogContext) {
  if (process.env.NODE_ENV === "production" && level === "log") return;

  const payload = context ? [message, context] : [message];
  console[level](...payload);
}

export const logger = {
  info(message: string, context?: LogContext) {
    write("log", message, context);
  },
  warn(message: string, context?: LogContext) {
    write("warn", message, context);
  },
  error(message: string, error?: unknown, context?: LogContext) {
    write(
      "error",
      message,
      error === undefined ? context : { error: normalizeError(error), ...context }
    );
  },
};
