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
exports.roleController = void 0;
class roleController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT *
                FROM role;`);
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
                FROM role
                WHERE idrole = ?`, [req.params.id], true);
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
                FROM role
                WHERE idrole = ?`, [req.params.id], true);
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
            if (info.idrole) {
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
            INSERT INTO role (name) VALUES (?);`, [info.name]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    info.idrole = resultAction[0].insertId;
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
            UPDATE role SET name =  "${info.name}" WHERE idrole = ${info.idrole};`);
                if (resultAction[0].affectedRows == 0) {
                    next('role not found');
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
            const resultAction = yield this.manager.actionWithParameters(`DELETE FROM role WHERE idrole = ?`, [info.idrole]);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'role not found'
                });
            }
            else {
                res.json(1);
            }
        });
    }
    //con un listado para multiples inserciones
    createRelation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = req.body;
                if (info.id && info.relationList.length > 0) {
                    const resultAction = yield this.manager.action(`
                INSERT INTO userSysRole (idRole, idUserSys) VALUES ${this.getValuesForRelation(info)};`);
                    if (resultAction == 0) {
                        next('A error was ocurred');
                    }
                    else {
                        res.json(info);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getValuesForRelation(info) {
        let values = [];
        info.relationList.forEach(function (value) {
            values.push(`(${info.id}, ${value})`);
        });
        return values.join(",");
    }
    //con un listado para multiples eliminaciones
    deleteRelation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            INSERT INTO userSysRole (idRole, idUserSys) VALUES (?, ?);`, [info.name]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    info.idrole = resultAction[0].insertId;
                    res.json(info);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.roleController = roleController;
//# sourceMappingURL=roleController.js.map