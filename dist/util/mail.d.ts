export declare class Mail {
    fullName: string;
    remitent: string;
    receiver: string;
    subject: string;
    message: string;
    file: string;
    constructor(fullName: string, remitent: string, receiver: string, subject: string, message: string, file: string);
    sendMail(): Promise<void>;
}
//# sourceMappingURL=mail.d.ts.map