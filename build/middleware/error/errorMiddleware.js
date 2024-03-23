"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errMiddleware = void 0;
const errMiddleware = (err, req, resp, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Server Failed To Response';
    resp.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.errMiddleware = errMiddleware;
//# sourceMappingURL=errorMiddleware.js.map