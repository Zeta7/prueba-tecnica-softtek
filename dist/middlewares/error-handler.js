"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
function errorHandler(req, res, error) {
    const err = boom_1.default.internal(error);
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
}
exports.errorHandler = errorHandler;
function boomErrorHandler(error, req, res, next) {
    if (!error.isBoom) {
        next(error);
    }
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
}
exports.boomErrorHandler = boomErrorHandler;
