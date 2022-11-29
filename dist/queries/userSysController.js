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
exports.userSysController = void 0;
class userSysController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT us.iduserSys, us.name, us.phone, us.email, us.dni, us.address, GROUP_CONCAT(r.name SEPARATOR ' ,') as roles 
                FROM userSys us
                INNER JOIN userSysRole usR ON usR.idUserSys = us.iduserSys
                INNER JOIN role r ON r.idrole = usR.idRole 
                GROUP BY us.iduserSys;`);
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
                FROM userSys
                WHERE iduserSys = ?`, [req.params.id], true);
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
                FROM userSys
                WHERE iduserSys = ?`, [req.params.id], true);
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
            if (info.iduserSys) {
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
            INSERT INTO userSys (name, phone, email, dni, address)
            VALUES (?, ?, ?, ?, ?);`, [info.name, info.phone, info.email, info.dni, info.address]);
                if (resultAction == 0) {
                    next('A error was ocurred');
                }
                else {
                    info.iduserSys = resultAction[0].insertId;
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
            UPDATE userSys SET name = ?, phone = ?, email = ?, dni = ?, address = ? 
            WHERE iduserSys = ?;`, info.name, info.phone, info.email, info.dni, info.address, info.iduserSys);
                if (resultAction[0].affectedRows == 0) {
                    next('userSys not found');
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
            const resultAction = yield this.manager.actionWithParameters(`DELETE FROM userSys WHERE iduserSys = ?`, [info.iduserSys]);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'userSys not found'
                });
            }
            else {
                res.json(1);
            }
        });
    }
}
exports.userSysController = userSysController;
//# sourceMappingURL=userSysController.js.map