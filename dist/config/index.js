"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerConfig = exports.getDatabaseConfig = void 0;
const config_json_1 = __importDefault(require("./config.json"));
function getDatabaseConfig() {
    return config_json_1.default['database'];
}
exports.getDatabaseConfig = getDatabaseConfig;
function getServerConfig() {
    return config_json_1.default['server'];
}
exports.getServerConfig = getServerConfig;
//# sourceMappingURL=index.js.map