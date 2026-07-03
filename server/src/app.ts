import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { adminRouter } from "./admin.js";
import * as path from "node:path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/admin", adminRouter);

app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.static(path.join(process.cwd(), "public")));

export default app;
