/**
 * Defines server and middleware.
 */

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import taskRoutes from "src/routes/task";

const app = express();

// initializes express to accept json in the request/response body
app.use(express.json());

app.use("/api/task", taskRoutes);

/**
 * Error handler; all errors thrown by server are handled here.
 * Explicit typings required here because TypeScript cannot infer the argument types.
 *
 * An eslint-disable is being used below because the "next" argument is never used. However,
 * it is still required for express to recognize it as an error handler. For this reason, I've
 * disabled the eslint error. This should be used sparingly and only in situations where the lint
 * error cannot be fixed in another way. Alternatively, the variable name can be prefixed with an
 * underscore (i.e. _next). Use underscores for variables that are unused but are still required.
 * In this case, eslint-disable is used for educational purposes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  // 500 is the "internal server error" error code, this will be our fallback
  let statusCode = 500;
  let errorMessage = "An error has occurred.";

  // check is necessary because anything can be thrown, type is not guaranteed
  if (isHttpError(error)) {
    // error.status is unique to the http error class, it allows us to pass status codes with errors
    statusCode = error.status;
    errorMessage = error.message;
  }
  // prefer custom http errors but if they don't exist, fallback to default
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
