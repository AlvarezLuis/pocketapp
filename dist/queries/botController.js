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
exports.botController = void 0;
const axios_1 = __importDefault(require("axios"));
const lastMessageController_1 = require("./lastMessageController");
const messageController_1 = require("./messageController");
const optionController_1 = require("./optionController");
const templateController_1 = require("./templateController");
const buttonsTemplateController_1 = require("./buttonsTemplateController");
const userController_1 = require("./userController");
class botController {
    constructor(configs, manager) {
        this.verify_token = 'HELLO';
        this.token = 'EAAuc0JQrCoIBAB0hP0g6GrjzljS0wH7GEH09LOP1qxH6Y2WmEKzWP9H9ibBuRVVz2QnbRIjwIEKR1jKDwnUqIKqI8bJTKDWMJrKgmqKBFqTSnB663fVgAY6ruWNMybEe8jgAdZCBBJLdkDYuLGFxmEJNiEJmVZCYWVmsZBVHBmHvEZAa4wDujWZBo1ufXAMI242IVS9UqZCgZDZD';
        this.configs = configs;
        this.manager = manager;
    }
    test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield axios_1.default({
                method: 'get',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Harry_Potter_wordmark.svg/800px-Harry_Potter_wordmark.svg.png'
            }));
            console.log(response);
            res.send('Un texto');
        });
    }
    test2(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send([{ text: "un texto" }]);
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Parse params from the webhook verification request
            let mode = req.query['hub.mode'];
            let token = req.query['hub.verify_token'];
            let challenge = req.query['hub.challenge'];
            // Check if a token and mode were sent
            if (mode && token) {
                // Check the mode and token sent are correct
                if (mode === 'subscribe' && token === this.verify_token) {
                    // Respond with 200 OK and challenge token from the request
                    console.log('WEBHOOK_VERIFIED');
                    res.status(200).send(challenge);
                }
                else {
                    // Responds with '403 Forbidden' if verify tokens do not match
                    res.sendStatus(403);
                }
            }
        });
    }
    post(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            // Parse the request body from the POSToptions.find
            let body = req.body;
            const _lastMessageController = new lastMessageController_1.lastMessageController(this.configs, this.manager);
            const _messageController = new messageController_1.messageController(this.configs, this.manager);
            const _userController = new userController_1.userController(this.configs, this.manager);
            // Check the Incoming webhook message
            console.log(JSON.stringify(body, null, 2));
            // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
            if (body.object) {
                if (body.entry &&
                    body.entry[0].changes &&
                    body.entry[0].changes[0] &&
                    body.entry[0].changes[0].value.messages &&
                    body.entry[0].changes[0].value.messages[0]) {
                    let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
                    let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
                    //Insert client if not exist
                    _userController.add(from);
                    let msg_body = '';
                    const type = (_d = (_c = (_b = (_a = body === null || body === void 0 ? void 0 : body.entry[0]) === null || _a === void 0 ? void 0 : _a.changes[0]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.messages[0]) === null || _d === void 0 ? void 0 : _d.type;
                    const message = yield _lastMessageController.getByIdUsermethod(from);
                    if (type == 'interactive') {
                        const subtype = (_j = (_h = (_g = (_f = (_e = body === null || body === void 0 ? void 0 : body.entry[0]) === null || _e === void 0 ? void 0 : _e.changes[0]) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.messages[0]) === null || _h === void 0 ? void 0 : _h.interactive) === null || _j === void 0 ? void 0 : _j.type;
                        if (subtype == 'list_reply') {
                            msg_body = body.entry[0].changes[0].value.messages[0].interactive.list_reply.title; // extract the message text from the webhook payload
                            this.getNextmessage(phone_number_id, from, msg_body, type, message);
                        }
                        else {
                            msg_body = body.entry[0].changes[0].value.messages[0].interactive.button_reply.title; // extract the message text from the webhook payload
                            this.getNextmessage(phone_number_id, from, msg_body, type, message);
                        }
                    }
                    else if (type == 'image') {
                        if (message && message.expected == type) {
                            const nextmessage = yield _messageController.getNextMesssage(message.idmessage);
                            const newmessage = yield _messageController.getById(nextmessage.nextMessage);
                            yield this.sendMessageTemplate(phone_number_id, from, newmessage);
                            this.getMessageNone(phone_number_id, from, newmessage);
                        }
                    }
                    else if (type == 'video') {
                        if (message && message.expected == type) {
                            const nextmessage = yield _messageController.getNextMesssage(message.idmessage);
                            const newmessage = yield _messageController.getById(nextmessage.nextMessage);
                            yield this.sendMessageTemplate(phone_number_id, from, newmessage);
                            this.getMessageNone(phone_number_id, from, newmessage);
                        }
                    }
                    else if (type == 'text') {
                        if (message && message.expected == type) {
                            yield _lastMessageController.updateLastAnswerClientAnswer(from, message.clientanswer);
                        }
                        msg_body = body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
                        this.getNextmessage(phone_number_id, from, msg_body, type, message);
                    }
                }
                res.sendStatus(200);
            }
            else {
                // Return a '404 Not Found' if event is not from a WhatsApp API
                res.sendStatus(404);
            }
        });
    }
    getNextmessage(phone_number_id, from, input, type, previousMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const _messageController = new messageController_1.messageController(this.configs, this.manager);
            const _optionController = new optionController_1.optionController(this.configs, this.manager);
            if ((previousMessage && previousMessage.expected == "text") && type == 'text') {
                const nextmessage = yield _messageController.getNextMesssage(previousMessage.idmessage);
                const newmessage = yield _messageController.getById(nextmessage.nextMessage);
                yield this.sendMessageTemplate(phone_number_id, from, newmessage);
                this.getMessageNone(phone_number_id, from, previousMessage);
                return;
            }
            //una palabra
            if (input.split(' ').length == 1) {
                const option = yield _optionController.getInAnswer(input.toLowerCase());
                if (option) {
                    if (option.action == 0) {
                        //buscar ultimo mensaje
                        //repetir mensaje
                    }
                    else if (option.action == -1) {
                        //terminar conversacion
                        //eliminar ultimo mensaje
                    }
                    else if (option.action == null || option.action == undefined) {
                        if (!(previousMessage && previousMessage.expected == 'text')) {
                            //enviar mensaje no idenfificado
                            this.sendMessage(phone_number_id, from, 'No entiendo lo que dices usa una de las opciones tal vez esta mal escrita');
                        }
                    }
                    else {
                        const message = yield _messageController.getById(option.action);
                        yield this.sendMessageTemplate(phone_number_id, from, message);
                        if (message.expected == 'none') {
                            this.getMessageNone(phone_number_id, from, message);
                        }
                    }
                }
                else {
                    if (!(previousMessage && previousMessage.expected == 'text')) {
                        //enviar mensaje no idenfificado
                        this.sendMessage(phone_number_id, from, 'No entiendo lo que dices usa una de las opciones tal vez esta mal escrita');
                    }
                }
            }
            //mas de una palabra
            else {
                const option = yield _optionController.getInAnswerLike(input.toLowerCase().split(' '));
                if (option && option.action) {
                    const message = yield _messageController.getById(option.action);
                    yield this.sendMessageTemplate(phone_number_id, from, message);
                    if (message.expected == 'none') {
                        this.getMessageNone(phone_number_id, from, message);
                    }
                }
                else {
                    if (!(previousMessage && previousMessage.expected == 'text')) {
                        //enviar mensaje no idenfificado
                        this.sendMessage(phone_number_id, from, 'No entiendo lo que dices usa una de las opciones tal vez esta mal escrita');
                    }
                }
            }
        });
    }
    getMessageNone(phone_number_id, from, messageNone) {
        return __awaiter(this, void 0, void 0, function* () {
            const _messageController = new messageController_1.messageController(this.configs, this.manager);
            if (messageNone && messageNone.expected == 'none') {
                const nextmessage = yield _messageController.getNextMesssage(messageNone.idmessage);
                const message = yield _messageController.getById(nextmessage.nextMessage);
                yield this.sendMessageTemplate(phone_number_id, from, message);
                this.getMessageNone(phone_number_id, from, message);
            }
        });
    }
    sendMessage(phone_number_id, from, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default({
                method: 'POST',
                url: 'https://graph.facebook.com/v12.0/' +
                    phone_number_id +
                    '/messages?access_token=' +
                    this.token,
                data: {
                    messaging_product: 'whatsapp',
                    preview_url: true,
                    to: from,
                    text: { body: message },
                },
                headers: { 'Content-Type': 'application/json' },
            }).catch((error) => { console.error(error); });
            // const _lastMessageController = new lastMessageController(this.configs, this.manager);
            // _lastMessageController.addmethod();        
        });
    }
    sendMessageTemplate(phone_number_id, from, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const _templateController = new templateController_1.templateController(this.configs, this.manager);
            const template = yield _templateController.getOne(message.templateID);
            const url = `https://graph.facebook.com/v13.0/${phone_number_id}/messages`;
            if (template.headerId == 3 && template.header) {
                yield this.sendMessageImage(from, url, template);
            }
            else {
                if (template.typeId == 2) {
                    yield this.sendMessageText(from, url, template);
                }
                else if (template.typeId == 1) {
                    yield this.sendMessageButton(from, url, template);
                }
                else if (template.typeId == 3) {
                }
                else if (template.typeId == 4) {
                    yield this.sendMessageList(from, url, template);
                }
                else if (template.typeId == 5) {
                    yield this.sendMessageRequest(from, url, template);
                }
            }
            const _lastMessageController = new lastMessageController_1.lastMessageController(this.configs, this.manager);
            _lastMessageController.addmethod({ iduser: from, idmessage: message.idmessage, answer: '', expected: message.expected });
        });
    }
    sendMessageText(from, url, template) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default({
                method: 'POST',
                url,
                data: {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to: from,
                    type: 'text',
                    text: {
                        preview_url: true,
                        body: template.text
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            }).catch((error) => { console.error(error); });
        });
    }
    sendMessageList(from, url, template) {
        return __awaiter(this, void 0, void 0, function* () {
            const _buttonsTemplateController = new buttonsTemplateController_1.buttonsTemplateController(this.configs, this.manager);
            const buttons = yield _buttonsTemplateController._getByTemplate(template.idtemplate);
            yield axios_1.default({
                method: 'POST',
                url,
                data: {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to: from,
                    type: 'interactive',
                    interactive: {
                        type: 'list',
                        body: {
                            text: template.text
                        },
                        action: {
                            button: 'Escoga una opcion',
                            sections: [
                                {
                                    title: 'Opciones',
                                    rows: buttons.map(elem => ({
                                        id: elem.idbuttonsTemplate,
                                        title: elem.text
                                    }))
                                }
                            ]
                        }
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            }).catch((error) => { console.error(error); });
        });
    }
    sendMessageButton(from, url, template) {
        return __awaiter(this, void 0, void 0, function* () {
            const _buttonsTemplateController = new buttonsTemplateController_1.buttonsTemplateController(this.configs, this.manager);
            const buttons = yield _buttonsTemplateController._getByTemplate(template.idtemplate);
            yield axios_1.default({
                method: 'POST',
                url,
                data: {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to: from,
                    type: 'interactive',
                    interactive: {
                        type: 'button',
                        body: {
                            text: template.text
                        },
                        action: {
                            buttons: buttons.map(elem => ({
                                type: 'reply',
                                reply: {
                                    id: elem.idbuttonsTemplate,
                                    title: elem.text
                                }
                            }))
                        }
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            }).catch((error) => { console.error(error); });
        });
    }
    sendMessageImage(from, url, template) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default({
                method: 'POST',
                url,
                data: {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to: from,
                    type: 'image',
                    image: {
                        link: template.header,
                        caption: template.text || ''
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            }).catch((error) => { console.error(error); });
        });
    }
    sendMessageDocument(from, url, template) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default({
                method: 'POST',
                url,
                data: {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to: from,
                    type: 'document',
                    document: {
                        link: template.header,
                        caption: template.text || ''
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            }).catch((error) => { console.error(error); });
        });
    }
    sendMessageRequest(from, url, template) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataBody = {};
            if (template.payload && template.payload.includes('{iduser}')) {
                dataBody = JSON.parse(template.payload.replace('{iduser}', from));
            }
            const response = yield axios_1.default({
                method: template.action,
                url: template.endpoint.replace('{id}', from),
                data: dataBody
            });
            const result = response.data;
            if (response.headers["content-type"].includes('text') || response.headers["content-type"].includes('json')) {
                const variables = template.text.match(/\{(.+?)\}/g);
                if (variables && Array.isArray(variables)) {
                    for (const variable of variables) {
                        template.text = template.text.replace(variable, result[variable.replace('{', '').replace('}', '')]);
                    }
                }
                this.sendMessageText(from, url, template);
            }
            else if (response.headers["content-type"].includes('image')) {
                this.sendMessageImage(from, url, {
                    header: template.endpoint
                });
            }
            else if (response.headers["content-type"].includes('pdf')) {
                this.sendMessageDocument(from, url, {
                    header: template.endpoint
                });
            }
        });
    }
}
exports.botController = botController;
//# sourceMappingURL=botController.js.map