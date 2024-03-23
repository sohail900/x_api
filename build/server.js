"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router/router"));
const errorMiddleware_1 = require("./middleware/error/errorMiddleware");
require("./config/config");
require("./config/cloudinaryConfig");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//MIDDLEWARES
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
//enable only for local file handling
//app.use('/upload', express.static(path.resolve(__dirname, '../upload')))
app.use('/api/v1', router_1.default);
app.use(errorMiddleware_1.errMiddleware);
//TODO: SERVER RUNNING ON PORT 3000
server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map