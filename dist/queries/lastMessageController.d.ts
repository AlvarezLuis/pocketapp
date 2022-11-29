import { lastMessage } from '../model/lastMessage';
import { Manager } from './manager';
export declare class lastMessageController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    getAll(req: any, res: any, next: any): Promise<void>;
    get(req: any, res: any, next: any): Promise<void>;
    add(req: any, res: any, next: any): Promise<void>;
    getByIdUsermethod(idUser: any): Promise<any>;
    addmethod(lastMessageInfo: lastMessage): Promise<lastMessage | {
        error: any;
    }>;
    updateLastAnswerClientAnswer(idUser: any, answer: any): Promise<any>;
}
//# sourceMappingURL=lastMessageController.d.ts.map