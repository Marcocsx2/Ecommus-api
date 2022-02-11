import express from "express";
import dotenv from "dotenv";
import color from "chalk";
import path from "path";
import morgan from "morgan";
import http from "http";
import consola from "signale";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import cluster from "cluster";
import os from "os";
import fileUpload from "express-fileupload";

// import files
import connectDB from "./config/db";
import { payload } from "./config/cluster";
import logger from "./middleware/logger";
import errorHandler from "./middleware/error";
import { protect } from "./services/auth";
import {
  signin,
  signup,
  googleSignin,
  validateEmail,
  refreshTokenController,
  recoverPassword,
  changePassword,
} from "./resources/controllers/";
import routing from "./routing";

import { socket } from "./services/socket/socket";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT;
let numberCPUs;
numberCPUs = 1;

if (process.env.NODE_ENV === "production") {
  numberCPUs = os.cpus().length;
}

socket();

app.disable("x-powered-by");
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(payload);
app.use(morgan(logger()));

/** Routes */
app.post("/api/v1/signup", signup);
app.post("/api/v1/email-validation", validateEmail);
app.post("/api/v1/signin", signin);
app.post("/api/v1/google", googleSignin);
app.post("/api/v1/refresh-token", refreshTokenController);
app.post("/api/v1/recover-password", recoverPassword);
app.post("/api/v1/change-password", changePassword);

app.use(
  "/",
  express.static(path.join(__dirname, "../temp"), { maxAge: 2 * 24 * 60 * 60 })
);

if (process.env.NODE_ENV === "production") {
  app.use("/api/v1", protect, routing);
} else {
  app.use("/api/v1", protect, routing);
}

app.use("*", (req, res, next) => {
  res.json({
    message: "Ruta no disponible",
    path: req.originalUrl,
  });
});

/** Error */
app.use(errorHandler);

let server: any;
const start = async () => {
  try {
    if (cluster.isMaster) {
      for (let i = 0; i < numberCPUs; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker) => {
        cluster.fork();
      });
    } else {
      await connectDB();
      await httpServer.listen(PORT, () => {
        consola.success(
          `API-Gateway on ${color.yellow(
            `http://localhost:${PORT}`
          )} process pip: ${process.pid}`
        );
        consola.success("Press CTRL-C to stop\n");
      });
    }
  } catch (e) {
    consola.success("Error server");
  }
};

process.on("unhandledRejection", (err, promise) => {
  consola.error(`Error ${err}`);
  server.close(() => {
    /** close server & exit process */
    process.exit(1);
  });
});

export { app, start };
