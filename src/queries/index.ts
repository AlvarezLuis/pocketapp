
import { Manager } from './manager';
import { Mail } from '../util/mail';
import path from 'path';
import { authenticate } from './security/authenticate';


import { loginController } from './loginController';
import { userController } from './userController';


const myApiName = 'PocketApp'

function asyncHandler(routeHandler) {
    return async (req, res, next) => {
        try {
        await routeHandler(req, res, next);
        } catch (err) {
        next(err);
        }
    }
}

function index(req, res, next) {
    var appRoot = path.resolve(__dirname);
    res.json({
        name: `Welcome to ${myApiName} API`,
        root_folder: appRoot
    });
}

export function init (server, configs, database) {
    const _manager: Manager = new Manager(database);
    const _loginController = new loginController(configs, _manager);
    const _userController = new userController(configs, _manager);

    server.get('/api/',  asyncHandler(index));
    //USER
    server.get('/api/users', asyncHandler(_userController.getAll.bind(_userController)));
    server.get('/api/user/:id', asyncHandler(_userController.get.bind(_userController)));
    server.get('/api/userexist/:id', asyncHandler(_userController.exist.bind(_userController)));
    server.post('/api/createOrUpdateUser', asyncHandler(_userController.createOrUpdate.bind(_userController)));
    server.delete('/api/deleteUser', new authenticate().authenticateUser, asyncHandler(_userController.delete.bind(_userController)));

    //LOGIN
    server.get('/api/login', asyncHandler(_loginController.get.bind(_loginController)));
    

    server.get('/Health', async (req, res) => {
        res.status(200).json('OK');
      });

      server.get('/', async (req, res) => {
        res.status(200).json('OK');
      });

    server.post('/api/send_email', new authenticate().authenticateUser, async (req, res) => {
      try {
          const args = req.body;
          const mail = new Mail(args.fullName, args.remitent, args.receiver, args.subject, args.message, args.file);
          mail.sendMail();
          res.status(200).json('OK');
      } catch (error) {
          res.status(500).json(error);
      }
    });
}