import { Manager } from './manager';
export declare class messageController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    getAllMethod(): Promise<any>;
    get(req: any, res: any, next: any): Promise<void>;
    getById(idMessage: number): Promise<any>;
    getByIdGroupAndIndexRequest(req: any, res: any, next: any): Promise<void>;
    getByIdGroupAndIndex(idGroup: number, index: number): Promise<any>;
    getNextMesssage(idCurrentMessage: number): Promise<any>;
    messageByIdGroup(req: any, res: any, next: any): Promise<void>;
    createOrUpdate(req: any, res: any, next: any): Promise<void>;
    private add;
    private update;
}
//# sourceMappingURL=messageController.d.ts.map