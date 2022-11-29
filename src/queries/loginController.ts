import { authenticate } from './security/authenticate';
import { Manager } from './manager';

export class loginController {

    configs;
    manager;
    
    constructor(configs, manager: Manager) {
        this.configs = configs
        this.manager = manager;
    }
    
    async get(req, res, next) {

        let result;
        try {
            result = await this.manager.get(
                `SELECT iduser, username, name, lastName, email, now() as currentdate 
                FROM user
                WHERE username = ? AND password = ?;`, [req.query.iduser, req.query.password]);
            if(result.length > 0) {
              return  new authenticate().generateToken(result[0]);
            }
        } catch (error) {
            next(error);
        }       
        res.json(result);
    }
}