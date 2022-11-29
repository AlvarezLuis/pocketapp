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
exports.Manager = void 0;
class Manager {
    constructor(database) {
        this.database = database;
    }
    process(conn, data, query) {
        return conn.query(query, [data]);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let conn;
            try {
                conn = yield this.database.getConnection();
                yield conn.query('START TRANSACTION');
                promises.push(this.process(conn, data, query));
                let results = yield Promise.all(promises);
                yield conn.query('COMMIT');
                yield conn.release();
                return results.reduce((acc, r) => {
                    return r ? acc + r[0].affectedRows : acc;
                }, 0);
            }
            catch (error) {
                if (conn != null) {
                    yield conn.query('ROLLBACK');
                }
                return 0;
            }
        });
    }
    action(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let conn;
            try {
                conn = yield this.database.getConnection();
                let result = conn.query(query);
                yield conn.release();
                return result;
            }
            catch (error) {
                if (conn != null) {
                    yield conn.query('ROLLBACK');
                }
                return 0;
            }
        });
    }
    actionWithParameters(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let conn;
            try {
                conn = yield this.database.getConnection();
                let result = conn.query(query, params);
                yield conn.release();
                return result;
            }
            catch (error) {
                if (conn != null) {
                    yield conn.query('ROLLBACK');
                }
                return 0;
            }
        });
    }
    get(query, params, isobject) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            let conn = yield this.database.getConnection();
            let res = yield conn.execute(query, params);
            if (Array.isArray(res) && res.length > 0 && isobject) {
                result = res[0];
                if (Array.isArray(res[0]) && res[0].length > 0) {
                    result = res[0][0];
                }
            }
            else {
                result = res[0];
            }
            conn.release();
            return result;
        });
    }
}
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map