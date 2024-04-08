"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const uuid = __importStar(require("uuid"));
const boom_1 = __importDefault(require("@hapi/boom"));
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const config_1 = require("../../config/config");
const config_2 = require("../../libs/dynamo/config");
const http_response_1 = require("../../bases/responses/http.response");
class TaskService {
    // Get tasks list
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    TableName: config_1.config.tableName,
                };
                const { Items } = yield config_2.dynamoDbClient.send(new lib_dynamodb_1.ScanCommand(params));
                return new http_response_1.HttpResponse.getSuccessful(Items);
            }
            catch (error) {
                throw boom_1.default.badRequest(error);
            }
        });
    }
    // Get a task
    getOneTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    TableName: config_1.config.tableName,
                    Key: { id },
                };
                const { Item } = yield config_2.dynamoDbClient.send(new lib_dynamodb_1.GetCommand(params));
                if (!Item)
                    throw boom_1.default.notFound('Task not found');
                return new http_response_1.HttpResponse.getSuccessful(Item);
            }
            catch (error) {
                throw boom_1.default.badRequest(error);
            }
        });
    }
    // Create a task
    createTask(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description } = body;
                if (!title || !description || typeof title !== "string" || typeof description !== "string") {
                    throw boom_1.default.badRequest('title and description must be valid text strings');
                }
                const params = {
                    TableName: config_1.config.tableName,
                    Item: {
                        id: uuid.v1(),
                        title,
                        description,
                        createdAt: new Date().toISOString()
                    },
                };
                yield config_2.dynamoDbClient.send(new lib_dynamodb_1.PutCommand(params));
                return new http_response_1.HttpResponse.postSuccessful(params);
            }
            catch (error) {
                throw boom_1.default.badRequest(error);
            }
        });
    }
    // Update task
    updateTask(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getOneTask(id);
                const { title, description } = body;
                const params = {
                    TableName: config_1.config.tableName,
                    Key: {
                        id,
                    },
                    UpdateExpression: "set",
                    ExpressionAttributeNames: {},
                    ExpressionAttributeValues: {},
                    ReturnValues: "ALL_NEW",
                };
                if (title) {
                    params.UpdateExpression += " #t = :title,";
                    params.ExpressionAttributeNames["#t"] = "title";
                    params.ExpressionAttributeValues[":title"] = title;
                }
                if (description) {
                    params.UpdateExpression += " #d = :description,";
                    params.ExpressionAttributeNames["#d"] = "description";
                    params.ExpressionAttributeValues[":description"] = description;
                }
                params.UpdateExpression = params.UpdateExpression.slice(0, -1);
                const { Attributes } = yield config_2.dynamoDbClient.send(new lib_dynamodb_1.UpdateCommand(params));
                return new http_response_1.HttpResponse.putSuccessful(Attributes);
            }
            catch (error) {
                throw boom_1.default.badRequest(error);
            }
        });
    }
    // Delete task
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    TableName: config_1.config.tableName,
                    Key: {
                        id,
                    },
                };
                yield config_2.dynamoDbClient.send(new lib_dynamodb_1.DeleteCommand(params));
                return new http_response_1.HttpResponse.deleteSuccessful();
            }
            catch (error) {
                throw boom_1.default.badRequest(error);
            }
        });
    }
}
exports.default = new TaskService();
