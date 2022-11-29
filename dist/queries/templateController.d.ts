import { Manager } from './manager';
export declare class templateController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    exist(req: any, res: any, next: any): Promise<void>;
    get(req: any, res: any, next: any): Promise<void>;
    getOne(idTemplate: any): Promise<any>;
    createOrUpdate(req: any, res: any, next: any): Promise<void>;
    private add;
    private update;
    delete(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=templateController.d.ts.map