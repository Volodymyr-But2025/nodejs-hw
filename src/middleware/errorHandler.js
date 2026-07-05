// export const errorHandler = (err, req, res, next) => {
//   // Якщо у помилки є статус (від createHttpError), беремо його. Якщо немає — 500
//   const status = err.status || err.statusCode || 500;

//   res.status(status).json({
//     status,
//     message: err.message || "Oops something went wrong 😑",
//     // Покаже оригінальну помилку в консолі/відповіді, якщо ми не в продакшні
//     stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
//   });
// };

import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  console.error('Error message: ', error.message);

  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong!' });
};
