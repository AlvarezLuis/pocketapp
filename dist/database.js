"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
class database {
    init(configs) {
        return promise_1.default.createPool({
            host: process.env.MYSQL_HOST || configs.host,
            user: process.env.MYSQL_USER || configs.user,
            password: configs.password,
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || configs.connectionLimit,
            database: configs.database,
            port: 3306,
            debug: configs.debug
        });
    }
    ;
}
exports.database = database;
//# sourceMappingURL=database.js.map