import { Manager } from './manager';
export declare class botController {
    configs: any;
    manager: any;
    constructor(configs: any, manager: Manager);
    verify_token: string;
    token: string;
    test(req: any, res: any, next: any): Promise<void>;
    test2(req: any, res: any, next: any): Promise<void>;
    get(req: any, res: any, next: any): Promise<void>;
    post(req: any, res: any, next: any): Promise<void>;
    private getNextmessage;
    private getMessageNone;
    private sendMessage;
    private sendMessageTemplate;
    private sendMessageText;
    private sendMessageList;
    private sendMessageButton;
    private sendMessageImage;
    private sendMessageDocument;
    private sendMessageRequest;
}
//# sourceMappingURL=botController.d.ts.map