import { Manager } from './manager';
export declare class groupController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    getAllMethod(): Promise<any>;
    get(req: any, res: any, next: any): Promise<void>;
    createOrUpdate(req: any, res: any, next: any): Promise<void>;
    private add;
    private update;
}
//# sourceMappingURL=groupController.d.ts.map