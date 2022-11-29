"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.putFile = exports.getFileS3 = exports.getFilesFromFolderCompany = exports.getFilesFromFolder = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const configs = __importStar(require("../config/config.json"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const bucketName = configs.aws.BucketName;
const region = configs.aws.BucketRegion;
const accessKeyId = configs.aws.accessKey;
const secretAccessKey = configs.aws.secretKey;
aws_sdk_1.default.config.update({
    region,
    accessKeyId,
    secretAccessKey
});
const s3 = new aws_sdk_1.default.S3();
const uploadFiles = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: bucketName,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log('entro');
            console.log(file.fieldname);
            req.fieldname = file.fieldname;
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let path = `Documents/${req.params.idbussine}/${req.params.idTemplate}/${req.params.docName}.${file.mimetype.split('/')[1]}`;
            console.log(path);
            req.path = path;
            cb(null, path);
        }
    })
});
exports.getFilesFromFolder = (idBussine, idForm) => __awaiter(void 0, void 0, void 0, function* () {
    var params = {
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: `Documents/${idBussine}/${idForm}/`
    };
    return yield s3.listObjects(params).promise();
});
exports.getFilesFromFolderCompany = (idBussine) => __awaiter(void 0, void 0, void 0, function* () {
    var params = {
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: `Documents/${idBussine}/`
    };
    return yield s3.listObjects(params).promise();
});
exports.getFileS3 = (idBussine, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: bucketName,
            Key: `Documents/${idBussine}/${file}`,
        };
        const { Body } = yield s3.getObject(params).promise();
        return Body;
    }
    catch (e) {
        return undefined;
    }
});
exports.putFile = (fileInfo, idBussine) => __awaiter(void 0, void 0, void 0, function* () {
    return yield s3.upload({
        Bucket: bucketName,
        Key: `Documents/${idBussine}/${fileInfo.name}`,
        Body: fileInfo.data,
    }, (err) => { });
});
exports.default = uploadFiles;
//# sourceMappingURL=s3.js.map