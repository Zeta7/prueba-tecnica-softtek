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
const task_service_1 = __importDefault(require("../../services/task/task.service"));
class TaskController {
    getAllTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rTasks = yield task_service_1.default.getAllTasks();
                res.status(rTasks.getStatus()).json(rTasks.getData());
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rTask = yield task_service_1.default.getOneTask(req.params.id);
                res.status(rTask.getStatus()).json(rTask.getData());
            }
            catch (error) {
                next(error);
            }
        });
    }
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rTask = yield task_service_1.default.createTask(req.body);
                res.status(rTask.getStatus()).json(rTask.getData());
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rTask = yield task_service_1.default.updateTask(req.body, req.params.id);
                res.status(rTask.getStatus()).json(rTask.getData());
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rTask = yield task_service_1.default.deleteTask(req.params.id);
                res.status(rTask.getStatus()).json(rTask.getData());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new TaskController();
