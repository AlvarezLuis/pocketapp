import { Manager } from './manager';
export declare class userController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    exist(req: any, res: any, next: any): Promise<void>;
    get(req: any, res: any, next: any): Promise<void>;
    createOrUpdate(req: any, res: any, next: any): Promise<void>;
    add(req: any, res: any, next: any): Promise<any>;
    private update;
    delete(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=userController.d.ts.map