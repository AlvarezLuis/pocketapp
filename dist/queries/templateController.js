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
exports.templateController = void 0;
class templateController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT temp.idtemplate, temp.name, temp.header, h.idheaderType as headerId, h.name as headerName,
                temp.footer, temp.text, t.idtemplateType as typeId, t.name as typeName, temp.action, temp.endpoint, 
                temp.token, temp.payload, temp.headerRequest, temp.errorMessage, b.name as businessname
                FROM cpocketbot.template as temp
                INNER JOIN headerType as h on h.idheaderType = temp.headerType
                INNER JOIN templateType as t on t.idtemplateType = temp.type 
                INNER JOIN business as b on temp.idbusiness = b.idbusiness
                ORDER BY temp.idtemplate`);
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
                FROM template
                WHERE idtemplate = ?`, [req.params.id], true);
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
                result = yield this.manager.get(`SELECT temp.idtemplate, temp.name, temp.header, h.idheaderType as headerId, h.name as headerName,
                temp.footer, temp.text, t.idtemplateType as typeId, t.name as typeName, temp.action, temp.endpoint, 
                temp.token, temp.payload, temp.headerRequest, temp.errorMessage, b.name as businessname
                FROM cpocketbot.template as temp
                INNER JOIN headerType as h on h.idheaderType = temp.headerType
                INNER JOIN templateType as t on t.idtemplateType = temp.type 
                INNER JOIN business as b on temp.idbusiness = b.idbusiness
                WHERE temp.idtemplate = ?
                ORDER BY temp.idtemplate`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    getOne(idTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT temp.idtemplate, temp.name, temp.header, h.idheaderType as headerId, h.name as headerName,
                temp.footer, temp.text, t.idtemplateType as typeId, t.name as typeName, temp.action, temp.endpoint, 
                temp.token, temp.payload, temp.headerRequest, temp.errorMessage, b.name as businessname
                FROM cpocketbot.template as temp
                INNER JOIN headerType as h on h.idheaderType = temp.headerType
                INNER JOIN templateType as t on t.idtemplateType = temp.type 
                INNER JOIN business as b on temp.idbusiness = b.idbusiness
                WHERE temp.idtemplate = ?
                ORDER BY temp.idtemplate`, [idTemplate], true);
            }
            catch (error) {
                return { error };
            }
            return result;
        });
    }
    createOrUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateInfo = req.body;
            if (templateInfo.idtemplate) {
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
                const templateInfo = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            INSERT INTO template (name, header, headerType, footer, text, type, action, endpoint, token, payload, headerRequest, errorMessage, idBusiness)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );`, [templateInfo.name, templateInfo.header,
                    templateInfo.headerId, templateInfo.footer, templateInfo.text, templateInfo.typeId,
                    templateInfo.action, templateInfo.endpoint, templateInfo.token, templateInfo.payload,
                    templateInfo.headerRequest, templateInfo.errorMessage, 1]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    templateInfo.idtemplate = resultAction[0].insertId;
                    res.json(templateInfo);
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
                const templateInfo = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            UPDATE template SET name = ?, header = ?, headerType = ?, footer = ?, text = ?,
            type = ?, action = ?, endpoint = ?, token = ?, payload = ? , headerRequest = ?, 
            errorMessage = ? 
            WHERE idtemplate = ?;`, [templateInfo.name, templateInfo.header, templateInfo.headerId, templateInfo.footer,
                    templateInfo.text, templateInfo.typeId, templateInfo.action, templateInfo.endpoint, templateInfo.token, templateInfo.payload,
                    templateInfo.headerRequest, templateInfo.errorMessage, templateInfo.idtemplate]);
                if (resultAction[0].affectedRows == 0) {
                    next('template not found');
                }
                else {
                    res.json(templateInfo);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateInfo = req.body;
            const resultAction = yield this.manager.actionWithParameters(`DELETE FROM template WHERE idtemplate = ?`, [templateInfo.idtemplate]);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'template not found'
                });
            }
            else {
                res.json(1);
            }
        });
    }
}
exports.templateController = templateController;
//# sourceMappingURL=templateController.js.map