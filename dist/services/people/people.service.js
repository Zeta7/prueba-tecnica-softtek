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
const boom_1 = __importDefault(require("@hapi/boom"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config/config");
const language_1 = require("../../utils/language");
const http_response_1 = require("../../bases/responses/http.response");
class PeopleService {
    getPeoples() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${config_1.config.swapi}/people`);
                const data = response.data.results;
                const dataTrad = data.map((objeto) => {
                    const nuevoObjeto = {};
                    for (const propiedad in objeto) {
                        if (language_1.language.hasOwnProperty(propiedad)) {
                            nuevoObjeto[language_1.language[propiedad]] = objeto[propiedad];
                        }
                        else {
                            nuevoObjeto[propiedad] = objeto[propiedad];
                        }
                    }
                    return nuevoObjeto;
                });
                return new http_response_1.HttpResponse.getSuccessful(dataTrad);
            }
            catch (error) {
                throw boom_1.default.badRequest(error);
            }
        });
    }
}
exports.default = new PeopleService();
