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
exports.buttonsTemplateController = void 0;
class buttonsTemplateController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT b.idbuttonsTemplate, bt.idbuttonType as typeId, bt.name as typeName,
                b.text, c.id as countryId, CONCAT('+',c.phonecode) as countryCode, b.phone, b.url, 
                u.idurlType as typeUrlId, u.name as typeUrlName, b.idtemplate
                FROM cpocketbot.buttonsTemplate as b
                INNER JOIN buttonType as bt ON bt.idbuttonType = b.type
                LEFT JOIN country as c ON c.id = b.country
                LEFT JOIN urlType as u ON u.idurlType = b.typeUrl;`);
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
                FROM buttonsTemplate
                WHERE idbuttonsTemplate = ?`, [req.params.id], true);
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
                result = yield this.manager.get(`SELECT b.idbuttonsTemplate, bt.idbuttonType as typeId, bt.name as typeName,
                b.text, c.id as countryId, CONCAT('+',c.phonecode) as countryCode, b.phone, b.url, 
                u.idurlType as typeUrlId, u.name as typeUrlName, b.idtemplate
                FROM cpocketbot.buttonsTemplate as b
                INNER JOIN buttonType as bt ON bt.idbuttonType = b.type
                LEFT JOIN country as c ON c.id = b.country
                LEFT JOIN urlType as u ON u.idurlType = b.typeUrl
                WHERE b.idbuttonsTemplate = ?`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    getByTemplate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT b.idbuttonsTemplate, bt.idbuttonType as typeId, bt.name as typeName,
                b.text, c.id as countryId, CONCAT('+',c.phonecode) as countryCode, b.phone, b.url, 
                u.idurlType as typeUrlId, u.name as typeUrlName, b.idtemplate
                FROM cpocketbot.buttonsTemplate as b
                INNER JOIN buttonType as bt ON bt.idbuttonType = b.type
                LEFT JOIN country as c ON c.id = b.country
                LEFT JOIN urlType as u ON u.idurlType = b.typeUrl
                WHERE b.idtemplate = ?`, [req.params.id], false);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    _getByTemplate(idTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT b.idbuttonsTemplate, bt.idbuttonType as typeId, bt.name as typeName,
                b.text, c.id as countryId, CONCAT('+',c.phonecode) as countryCode, b.phone, b.url, 
                u.idurlType as typeUrlId, u.name as typeUrlName, b.idtemplate
                FROM cpocketbot.buttonsTemplate as b
                INNER JOIN buttonType as bt ON bt.idbuttonType = b.type
                LEFT JOIN country as c ON c.id = b.country
                LEFT JOIN urlType as u ON u.idurlType = b.typeUrl
                WHERE b.idtemplate = ?`, [idTemplate], false);
            }
            catch (error) {
                return (error);
            }
            return result;
        });
    }
    getByTemplateOption(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT b.idbuttonsTemplate, bt.idbuttonType as typeId, bt.name as typeName,
                b.text, c.id as countryId, CONCAT('+',c.phonecode) as countryCode, b.phone, b.url, 
                u.idurlType as typeUrlId, u.name as typeUrlName, b.idtemplate, b.text as answer 
                FROM cpocketbot.buttonsTemplate as b
                INNER JOIN buttonType as bt ON bt.idbuttonType = b.type
                LEFT JOIN country as c ON c.id = b.country
                LEFT JOIN urlType as u ON u.idurlType = b.typeUrl
                WHERE b.idtemplate = ?`, [req.params.id], false);
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
            if (info.idbuttonsTemplate) {
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
            INSERT INTO buttonsTemplate (type, text, country, phone, url, typeUrl, idtemplate)
            VALUES (?, ?, ?, ?, ?, ?, ?);`, [info.typeId, info.text, info.countryId, info.phone, info.url, info.typeUrlId, info.idtemplate]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    info.idbuttonsTemplate = resultAction[0].insertId;
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
                const resultAction = yield this.manager.action(`
            UPDATE buttonsTemplate SET type =  ${info.typeId}, text =  "${info.text}", country =  ${info.countryId},
            phone =  "${info.phone}", url =  "${info.url}", typeUrl =  ${info.typeUrlId}
            WHERE idbuttonsTemplate = ${info.idbuttonsTemplate};`);
                if (resultAction[0].affectedRows == 0) {
                    next('buttonsTemplate not found');
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = req.body;
            const resultAction = yield this.manager.actionWithParameters(`DELETE FROM buttonsTemplate WHERE idbuttonsTemplate = ?`, [info.idbuttonsTemplate]);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'buttonsTemplate not found'
                });
            }
            else {
                res.json(1);
            }
        });
    }
}
exports.buttonsTemplateController = buttonsTemplateController;
//# sourceMappingURL=buttonsTemplateController.js.map