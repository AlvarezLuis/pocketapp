import { user } from '../model/user';
import { Manager } from './manager';

export class userController {

    configs: any;
    manager: any;

    constructor(configs: any, manager: Manager) {
        this.configs = configs;
        this.manager = manager;
    }

    async getAll(req, res, next) {
        let result;
        try {
            result =    await this.manager.get(
                `SELECT *
                FROM user`);
        } catch (error) {
            next(error);
        }
        res.json(result);
    }

    async exist(req, res, next) {
        let result;
        try {
            result = await this.manager.get(
                `SELECT 1 as status
                FROM user
                WHERE iduser = ?`, [req.params.id], true);
        } catch (error) {
            next(error);
        }
        res.json(result);
    }

    async get(req, res, next) {
        let result;
        try {
            result = await this.manager.get(
                `SELECT *
                FROM user
                WHERE iduser = ?`, [req.params.id], true);
        } catch (error) {
            next(error);
        }
        res.json(result);
    }

    public async createOrUpdate(req, res, next) {
        const userInfo: user = req.body;
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
    }

    public async add(req, res, next) {
        try {
            const userInfo: user = req.body;
            const resultAction = await this.manager.actionWithParameters(`
            INSERT IGNORE INTO user (name, lastName, documentType, document, phone, indicativeId, departamentId,
                cityId, address, dateBirth, email, userName, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
            [userInfo.name, userInfo.lastName, userInfo.documentType, userInfo.document, userInfo.phone, userInfo.indicativeId, userInfo.departamentId,
                userInfo.cityId, userInfo.address, userInfo.dateBirth, userInfo.email, userInfo.userName, userInfo.password]);
            if (resultAction == 0) {
                return 'A error was ocurred';
            } else {
                userInfo.iduser = resultAction[0].insertId;
                res.json(userInfo);
            }
        } catch (error) {
            next(error);
        }
    }

    private async update(req, res, next) {
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
    }

    public async delete(req, res, next) {
        const userInfo: user = req.body;
        const resultAction = await this.manager.action(`DELETE FROM user WHERE iduser =?`, [userInfo.iduser]);
        if (resultAction[0].affectedRows == 0) {
            res.status(404).send({
                error: 'user not found'
            })
        } else {
            res.json(1);
        }
    }
}