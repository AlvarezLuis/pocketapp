import { Manager } from './manager';
export declare class buttonTypeController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    exist(req: any, res: any, next: any): Promise<void>;
    get(req: any, res: any, next: any): Promise<void>;
    createOrUpdate(req: any, res: any, next: any): Promise<void>;
    private add;
    private update;
    delete(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=buttonTypeController.d.ts.map