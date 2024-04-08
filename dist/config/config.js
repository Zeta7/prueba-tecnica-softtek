"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    tableName: process.env.TABLE_NAME,
    swapi: process.env.SWAPI,
};
module.exports = { config: exports.config };
