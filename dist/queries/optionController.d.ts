import { Manager } from './manager';
export declare class optionController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    getAllMethod(): Promise<any>;
    get(req: any, res: any, next: any): Promise<void>;
    optionsByMessage(req: any, res: any, next: any): Promise<void>;
    getInAnswer(word: string): Promise<any>;
    getInAnswerLike(words: string[]): Promise<any>;
    optionsByGroupAndNotAsociated(req: any, res: any, next: any): Promise<void>;
    createOrUpdate(req: any, res: any, next: any): Promise<void>;
    private add;
    private update;
}
//# sourceMappingURL=optionController.d.ts.map