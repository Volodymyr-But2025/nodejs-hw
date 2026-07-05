import express from "express";
import "dotenv/config";
import cors from "cors";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { connectMongoDB }from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000; // Додаємо значення за замовчуванням для порту

app.use(  cors({    origin: "*",    methods: "GET,PATCH,POST,DELETE",  }),);

app.use(logger);
app.use(express.json());
app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);


connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
