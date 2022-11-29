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
exports.optionController = void 0;
class optionController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getAllMethod();
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    getAllMethod() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT idoption, idmessage, action, answer, idgroup, indice 
                FROM options`);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT idoption, idmessage, action, answer, idgroup, indice 
                FROM options
                WHERE idoption = ?`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    optionsByMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT o.idoption, o.idmessage, o.action, o.answer, o.idgroup, o.indice, m.template  
                FROM options o 
                LEFT JOIN message m ON m.idmessage = o.action 
                WHERE o.idmessage = ?`, [req.params.idMessage]);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    getInAnswer(word) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT idoption, idmessage, action, answer, idgroup, indice 
                FROM options 
                WHERE answer = ?`, [word]);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    getInAnswerLike(words) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT idoption, idmessage, action, answer, idgroup, indice 
                FROM options
                WHERE answer LIKE ?`, [`%${words.join('%')}%`], true);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    optionsByGroupAndNotAsociated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT idoption, idmessage, action, answer, idgroup, indice 
                FROM options
                WHERE idgroup = ? and idmessage is null`, [req.params.idGroup]);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    createOrUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = req.body;
            if (info.idoption) {
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
                const info = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            INSERT INTO options (idmessage, action, answer, idgroup, indice) 
            VALUES (?,?,?,?,?);`, [info.idmessage, info.action, info.answer, info.idgroup, info.indice]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    info.idoption = resultAction[0].insertId;
                    res.json(info);
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
                const info = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            UPDATE options SET action = ? 
            WHERE idoption = ?;`, [info.action, info.idoption]);
                if (resultAction[0].affectedRows == 0) {
                    next('group not found');
                }
                else {
                    res.json(info);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.optionController = optionController;
//# sourceMappingURL=optionController.js.map