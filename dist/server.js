"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.app = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const signale_1 = __importDefault(require("signale"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const db_1 = __importDefault(require("./config/db"));
const cluster_2 = require("./config/cluster");
const logger_1 = __importDefault(require("./middleware/logger"));
const error_1 = __importDefault(require("./middleware/error"));
const auth_1 = require("./services/auth");
const controllers_1 = require("./resources/controllers/");
const routing_1 = __importDefault(require("./routing"));
const socket_1 = require("./services/socket/socket");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = express_1.default();
exports.app = app;
app.use(cors_1.default());
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const PORT = process.env.PORT;
let numberCPUs;
numberCPUs = 1;
if (process.env.NODE_ENV === "production") {
    numberCPUs = os_1.default.cpus().length;
}
socket_1.socket();
app.disable("x-powered-by");
app.use(express_fileupload_1.default({
    createParentPath: true,
}));
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(cluster_2.payload);
app.use(morgan_1.default(logger_1.default()));
app.post("/api/v1/signup", controllers_1.signup);
app.post("/api/v1/email-validation", controllers_1.validateEmail);
app.post("/api/v1/signin", controllers_1.signin);
app.post("/api/v1/google", controllers_1.googleSignin);
app.post("/api/v1/refresh-token", controllers_1.refreshTokenController);
app.post("/api/v1/recover-password", controllers_1.recoverPassword);
app.post("/api/v1/change-password", controllers_1.changePassword);
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../temp"), { maxAge: 2 * 24 * 60 * 60 }));
if (process.env.NODE_ENV === "production") {
    app.use("/api/v1", auth_1.protect, routing_1.default);
}
else {
    app.use("/api/v1", auth_1.protect, routing_1.default);
}
app.use("*", (req, res, next) => {
    res.json({
        message: "Ruta no disponible",
        path: req.originalUrl,
    });
});
app.use(error_1.default);
let server;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (cluster_1.default.isMaster) {
            for (let i = 0; i < numberCPUs; i++) {
                cluster_1.default.fork();
            }
            cluster_1.default.on("exit", (worker) => {
                cluster_1.default.fork();
            });
        }
        else {
            yield db_1.default();
            yield httpServer.listen(PORT, () => {
                signale_1.default.success(`API-Gateway on ${chalk_1.default.yellow(`http://localhost:${PORT}`)} process pip: ${process.pid}`);
                signale_1.default.success("Press CTRL-C to stop\n");
            });
        }
    }
    catch (e) {
        signale_1.default.success("Error server");
    }
});
exports.start = start;
process.on("unhandledRejection", (err, promise) => {
    signale_1.default.error(`Error ${err}`);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map