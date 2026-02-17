import 'express-async-errors';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import ErrorHandlerMiddleware from "./shared/http/middlewares/ErrorHandlerMiddleware.js";


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);


app.use(ErrorHandlerMiddleware)

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
