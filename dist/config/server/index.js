"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../../routes"));
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../../middlewares/error-handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
app.use((req, res) => {
    return res.status(404).json({
        error: 'Route not found',
    });
});
exports.default = app;
