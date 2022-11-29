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
exports.userController = void 0;
class userController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT *
                FROM user`);
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
                FROM user
                WHERE iduser = ?`, [req.params.id], true);
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
                FROM user
                WHERE iduser = ?`, [req.params.id], true);
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
    createOrUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = req.body;
            this.add(req, res, next);
            // if (userInfo.iduser) {
            //     const userdExist: any[] = await this.manager.get(
            //         `SELECT 1
            //         FROM user  
            //         WHERE iduser = "${userInfo.iduser}";`);
            //     if (userdExist && userdExist.length > 0) {
            //         res.status(400).send({
            //             errorCode: 'Error0004',
            //             error: `the id user ${userInfo.iduser} already exist`
            //         })
            //     } else {
            //         this.add(req, res, next);
            //     }
            // } else {
            //     this.add(req, res, next);
            // }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = req.body;
                const resultAction = yield this.manager.actionWithParameters(`
            INSERT IGNORE INTO user (name, lastName, documentType, document, phone, indicativeId, departamentId,
                cityId, address, dateBirth, email, userName, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [userInfo.name, userInfo.lastName, userInfo.documentType, userInfo.document, userInfo.phone, userInfo.indicativeId, userInfo.departamentId,
                    userInfo.cityId, userInfo.address, userInfo.dateBirth, userInfo.email, userInfo.userName, userInfo.password]);
                if (resultAction == 0) {
                    return 'A error was ocurred';
                }
                else {
                    userInfo.iduser = resultAction[0].insertId;
                    res.json(userInfo);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const userInfo: user = req.body;
            //     const resultAction = await this.manager.action(`
            //     UPDATE user SET username =  "${userInfo.username}", password = "${userInfo.password}", 
            //     identification = "${userInfo.identification}",
            //     name = "${userInfo.name}", last_name =  "${userInfo.last_name}", address = "${userInfo.address}", 
            //     phone = "${userInfo.phone}", email = "${userInfo.email}", role = ${userInfo.role} 
            //     WHERE id = ${userInfo.id};`);
            //     if (resultAction[0].affectedRows == 0) {
            //         next('user not found');
            //     } else {
            //         res.json(userInfo);
            //     }
            // } catch (error) {
            //     next(error);
            // }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = req.body;
            const resultAction = yield this.manager.action(`DELETE FROM user WHERE iduser =?`, [userInfo.iduser]);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'user not found'
                });
            }
            else {
                res.json(1);
            }
        });
    }
}
exports.userController = userController;
//# sourceMappingURL=userController.js.map