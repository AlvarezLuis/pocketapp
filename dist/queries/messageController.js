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
exports.messageController = void 0;
class messageController {
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
                result = yield this.manager.get(`SELECT m.idmessage, m.name, m.template as templateID, m.type, m.idgroup, \`index\`, m.expected, m.resource, 
                t.name as template 
                FROM message m 
                INNER JOIN template t ON t.idtemplate = m.template `);
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
                result = yield this.getById(req.params.id);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    getById(idMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT m.idmessage, m.name, m.template as templateID, m.type, m.idgroup, \`index\`, m.expected, m.resource, 
                t.name as template 
                FROM message m 
                INNER JOIN template t ON t.idtemplate = m.template 
                WHERE m.idmessage = ? `, [idMessage], true);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    getByIdGroupAndIndexRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getByIdGroupAndIndex(req.params.idGroup, req.params.index);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    getByIdGroupAndIndex(idGroup, index) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT m.idmessage, m.name, m.template as templateID, m.type, m.idgroup, \`index\`, m.expected, m.resource, 
                t.name as template 
                FROM message m 
                INNER JOIN template t ON t.idtemplate = m.template 
                WHERE m.idgroup = ? AND \`index\` = ?`, [idGroup, index], true);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    getNextMesssage(idCurrentMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT m.idmessage, m.name, m.template as templateID, m.type, m.idgroup, \`index\`, m.expected, m.resource, 
                t.name as template, o.action as nextMessage  
                FROM message m 
                INNER JOIN template t ON t.idtemplate = m.template 
                INNER JOIN options o ON o.idmessage = m.idmessage  
                WHERE m.idmessage = ?`, [idCurrentMessage], true);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    messageByIdGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT m.idmessage, m.name, m.template as templateID, m.type, m.idgroup, \`index\`, m.expected, m.resource, 
                t.name as template 
                FROM message m 
                INNER JOIN template t ON t.idtemplate = m.template 
                WHERE m.idgroup = ? `, [req.params.idGroup]);
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
            if (info.idmessage) {
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
            INSERT INTO message (name, template, type, idgroup, \`index\`, expected, resource, idBusiness) 
            VALUES (?,?,?,?,?,?,?,?);`, [info.template, info.templateID, info.type, info.idgroup, info.index, info.expected, info.resource, 1]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    info.idmessage = resultAction[0].insertId;
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
            UPDATE message SET name = ?,  template= ?, type = ?, idgroup = ?, expected = ?, resource = ?
            WHERE idmessage = ?;`, [info.template, info.templateID, info.type, info.idgroup, info.expected, info.resource, info.idmessage]);
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
exports.messageController = messageController;
//# sourceMappingURL=messageController.js.map