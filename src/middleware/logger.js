import pino from "pino-http";

export const logger =
  pino({
    transport: {
      target: "pino-pretty", // робить логи читаємими для людини в консолі
      options: {
        colorize: true,     // додає кольори для різних статусів (зелений, жовтий, червоний)
      },
    },
  });

