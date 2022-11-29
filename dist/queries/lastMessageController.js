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
exports.lastMessageController = void 0;
class lastMessageController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT *
                FROM lastmessage`);
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
                FROM lastmessage
                WHERE idlastmessage = ?;`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastMessageInfo = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            INSERT INTO lastmessage (iduser, idmessage, answer, expected)
            VALUES (?,?,?,?);`, [lastMessageInfo.iduser, lastMessageInfo.idmessage, lastMessageInfo.answer, lastMessageInfo.expected]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    lastMessageInfo.iduser = resultAction[0].insertId;
                    res.json(lastMessageInfo);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByIdUsermethod(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT m.*
                FROM lastmessage lm
                INNER JOIN message m ON m.idmessage = lm.idmessage 
                WHERE iduser = ?;`, [idUser], true);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    addmethod(lastMessageInfo) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.manager.get(`SELECT 1 as exist FROM lastmessage WHERE iduser = ?`, [lastMessageInfo.iduser]);
                if (((_a = exist[0]) === null || _a === void 0 ? void 0 : _a.exist) == 1) {
                    const resultAction = yield this.manager.actionWithParameters(`
                UPDATE lastmessage 
                SET 
                idmessage = ?, answer = ?, expected = ? 
                WHERE iduser = ?`, [lastMessageInfo.idmessage, lastMessageInfo.answer, lastMessageInfo.expected, lastMessageInfo.iduser]);
                    if (resultAction == 0) {
                        return { error: 'A error was ocurred' };
                    }
                    else {
                        lastMessageInfo.iduser = resultAction[0].insertId;
                        return lastMessageInfo;
                    }
                }
                else {
                    const resultAction = yield this.manager.actionWithParameters(`
                INSERT INTO lastmessage (iduser, idmessage, answer, expected)
                VALUES (?,?,?,?);`, [lastMessageInfo.iduser, lastMessageInfo.idmessage, lastMessageInfo.answer, lastMessageInfo.expected]);
                    if (resultAction == 0) {
                        return { error: 'A error was ocurred' };
                    }
                    else {
                        lastMessageInfo.iduser = resultAction[0].insertId;
                        return lastMessageInfo;
                    }
                }
            }
            catch (error) {
                return { error };
            }
        });
    }
    updateLastAnswerClientAnswer(idUser, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                const result = yield this.manager.actionWithParameters(`
            UPDATE lastmessage 
            SET clientanswer = ?
            WHERE iduser = ?`, [answer, idUser]);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
}
exports.lastMessageController = lastMessageController;
//# sourceMappingURL=lastMessageController.js.map