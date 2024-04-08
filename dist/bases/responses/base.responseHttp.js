"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
class BaseResponse {
    constructor(status, data, context) {
        this.status = status;
        this.data = data;
        this.context = context;
    }
    getObject() {
        return this;
    }
    getStatus() {
        return this.status;
    }
    getData() {
        return {
            status: this.status,
            context: this.context,
            data: this.data,
        };
    }
}
exports.BaseResponse = BaseResponse;
