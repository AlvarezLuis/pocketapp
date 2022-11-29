"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mail {
    constructor(fullName, remitent, receiver, subject, message, file) {
        this.fullName = '';
        this.remitent = '';
        this.receiver = '';
        this.subject = '';
        this.message = '';
        this.file = '';
        this.fullName = fullName;
        this.remitent = remitent;
        this.receiver = receiver;
        this.subject = subject;
        this.message = message;
        this.file = file;
    }
    // async..await is not allowed in global scope, must use a wrapper
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = yield nodemailer_1.default.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer_1.default.createTransport({
                host: 'mail.fwsafetycontrol.com',
                port: 2525,
                secureConnection: true,
                tls: {
                    rejectUnauthorized: false
                },
                auth: {
                    user: 'noreply@fwsafetycontrol.com',
                    pass: 'Canimafa1' // generated ethereal password
                }
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
                from: `'${this.fullName} 🏬' <noreply@fwsafetycontrol.com>`,
                to: `${this.receiver}`,
                subject: `${this.subject}`,
                text: `${this.message}`,
                html: `${this.message}`,
                attachments: [
                    // Binary Buffer attachment
                    {
                        filename: 'report.pdf',
                        path: this.file,
                        contentType: 'application/pdf'
                    },
                ],
            });
            console.log('Message sent: %s', info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}
exports.Mail = Mail;
//# sourceMappingURL=mail.js.map