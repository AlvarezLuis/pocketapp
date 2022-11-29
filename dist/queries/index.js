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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const manager_1 = require("./manager");
const mail_1 = require("../util/mail");
const path_1 = __importDefault(require("path"));
const authenticate_1 = require("./security/authenticate");
const loginController_1 = require("./loginController");
const userController_1 = require("./userController");
const myApiName = 'PocketApp';
function asyncHandler(routeHandler) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield routeHandler(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });
}
function index(req, res, next) {
    var appRoot = path_1.default.resolve(__dirname);
    res.json({
        name: `Welcome to ${myApiName} API`,
        root_folder: appRoot
    });
}
function init(server, configs, database) {
    const _manager = new manager_1.Manager(database);
    const _loginController = new loginController_1.loginController(configs, _manager);
    const _userController = new userController_1.userController(configs, _manager);
    server.get('/api/', asyncHandler(index));
    //USER
    server.get('/api/users', asyncHandler(_userController.getAll.bind(_userController)));
    server.get('/api/user/:id', asyncHandler(_userController.get.bind(_userController)));
    server.get('/api/userexist/:id', asyncHandler(_userController.exist.bind(_userController)));
    server.post('/api/createOrUpdateUser', asyncHandler(_userController.createOrUpdate.bind(_userController)));
    server.delete('/api/deleteUser', new authenticate_1.authenticate().authenticateUser, asyncHandler(_userController.delete.bind(_userController)));
    //LOGIN
    server.get('/api/login', asyncHandler(_loginController.get.bind(_loginController)));
    server.get('/Health', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.status(200).json('OK');
    }));
    server.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.status(200).json('OK');
    }));
    server.post('/api/send_email', new authenticate_1.authenticate().authenticateUser, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const args = req.body;
            const mail = new mail_1.Mail(args.fullName, args.remitent, args.receiver, args.subject, args.message, args.file);
            mail.sendMail();
            res.status(200).json('OK');
        }
        catch (error) {
            res.status(500).json(error);
        }
    }));
}
exports.init = init;
//# sourceMappingURL=index.js.map