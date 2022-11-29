"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = __importDefault(require("../../config/config.json"));
class authenticate {
    authenticateUser(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verifyToken = jsonwebtoken_1.default.verify(token, config_json_1.default.server.jwtSign);
            if (verifyToken) {
                req.user = verifyToken;
                return next();
            }
        }
        catch (error) {
            res.json({ error: 'ERROR0001: Error validating user', innerError: error });
        }
    }
    generateToken(data) {
        try {
            return jsonwebtoken_1.default.sign(data, config_json_1.default.server.jwtSign);
        }
        catch (error) {
            return error;
        }
    }
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map