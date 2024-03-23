"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router/router"));
const errorMiddleware_1 = require("./middleware/error/errorMiddleware");
require("./config/config");
require("./config/cloudinaryConfig");
const app = (0, express_1.default)();
//MIDDLEWARES
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/upload', express_1.default.static(path_1.default.resolve(__dirname, '../upload')));
const server = http_1.default.createServer(app);
app.use('/api/v1', router_1.default);
app.use(errorMiddleware_1.errMiddleware);
//TODO: SERVER RUNNING ON PORT 3000
server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map