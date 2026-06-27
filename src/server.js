import express from "express";
import "dotenv/config";
import cors from "cors";
import pino from "pino-http";

const app = express();
const PORT = process.env.PORT || 3000; // Додаємо значення за замовчуванням для порту


app.use(
  cors({
    origin: "*",
    methods: "GET,PATCH,POST,DELETE",
  }),
);
// 2. Підключаємо логер pino-http з базовими налаштуваннями красівого виводу
app.use(
  pino({
    transport: {
      target: "pino-pretty", // робить логи читаємими для людини в консолі
      options: {
        colorize: true,     // додає кольори для різних статусів (зелений, жовтий, червоний)
      },
    },
  }),
);

// Додаємо middleware для парсингу JSON у тілі запитів
app.use(express.json());

// Додаємо обробку головної сторінки (відповідь на запит типу GET)
app.get("/notes", (req, res) => {
  console.log("get notes controller");
  res.status(200).json({
	"message": "Retrieved all notes"
  });
});

app.get("/notes/:noteId", (req, res) => {
  console.log("get notes controller");
  res.status(200).json({
	"message": "Retrieved note with ID: " + req.params.noteId
  });
});

app.get("/test-error", (req, res) => {
  throw new Error('Simulated server error');
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "Oops something went wrong 😑" : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
