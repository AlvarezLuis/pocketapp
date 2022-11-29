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
exports.loginController = void 0;
const authenticate_1 = require("./security/authenticate");
class loginController {
    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.manager.get(`SELECT iduser, username, name, lastName, email, now() as currentdate 
                FROM user
                WHERE username = ? AND password = ?;`, [req.query.iduser, req.query.password]);
                if (result.length > 0) {
                    return new authenticate_1.authenticate().generateToken(result[0]);
                }
            }
            catch (error) {
                next(error);
            }
            res.json(result);
        });
    }
}
exports.loginController = loginController;
//# sourceMappingURL=loginController.js.map