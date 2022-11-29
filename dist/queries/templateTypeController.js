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
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateTypeController = void 0;
class templateTypeController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT * FROM templateType`);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    exist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT 1 as status
                FROM templateType
                WHERE idtemplateType = ?`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT *
                FROM templateType
                WHERE idtemplateType = ?`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    createOrUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateTypeInfo = req.body;
            if (templateTypeInfo.idtemplateType) {
                this.update(req, res, next);
            }
            else {
                this.add(req, res, next);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templateTypeInfo = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            INSERT INTO templateType (name)
            VALUES (?);`, [templateTypeInfo.name]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    templateTypeInfo.idtemplateType = resultAction[0].insertId;
                    res.json(templateTypeInfo);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templateTypeInfo = req.body;
                const resultAction = yield this.manager.action(`
            UPDATE templateType SET name =  "${templateTypeInfo.name}"
            WHERE idtemplateType = ${templateTypeInfo.idtemplateType};`);
                if (resultAction[0].affectedRows == 0) {
                    next('templateType not found');
                }
                else {
                    res.json(templateTypeInfo);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateTypeInfo = req.body;
            const resultAction = yield this.manager.actionWithParameters(`DELETE FROM templateType WHERE idtemplateType = ?`, [templateTypeInfo.idtemplateType]);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'templateType not found'
                });
            }
            else {
                res.json(1);
            }
        });
    }
}
exports.templateTypeController = templateTypeController;
//# sourceMappingURL=templateTypeController.js.map