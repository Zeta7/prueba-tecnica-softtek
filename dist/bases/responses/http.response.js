"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const base_responseHttp_1 = require("./base.responseHttp");
var HttpResponse;
(function (HttpResponse) {
    const _context = 'HttpResponse';
    class getSuccessful extends base_responseHttp_1.BaseResponse {
        constructor(data) {
            super(200, data, _context);
            this._context = _context + 'GetSuccessful';
        }
    }
    HttpResponse.getSuccessful = getSuccessful;
    class postSuccessful extends base_responseHttp_1.BaseResponse {
        constructor(data) {
            super(201, data, _context);
            this._context = _context + 'PostSuccessful';
        }
    }
    HttpResponse.postSuccessful = postSuccessful;
    class putSuccessful extends base_responseHttp_1.BaseResponse {
        constructor(data) {
            super(201, data, _context);
            this._context = _context + 'PutSuccessful';
        }
    }
    HttpResponse.putSuccessful = putSuccessful;
    class deleteSuccessful extends base_responseHttp_1.BaseResponse {
        constructor() {
            super(204, {}, _context);
            this._context = _context + 'DeleteSuccessful';
        }
    }
    HttpResponse.deleteSuccessful = deleteSuccessful;
})(HttpResponse || (exports.HttpResponse = HttpResponse = {}));
