import aws from 'aws-sdk';
declare const uploadFiles: any;
export declare const getFilesFromFolder: (idBussine: any, idForm: any) => Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.ListObjectsOutput, aws.AWSError>>;
export declare const getFilesFromFolderCompany: (idBussine: any) => Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.ListObjectsOutput, aws.AWSError>>;
export declare const getFileS3: (idBussine: any, file: any) => Promise<any | undefined>;
export declare const putFile: (fileInfo: any, idBussine: any) => Promise<aws.S3.ManagedUpload>;
export default uploadFiles;
//# sourceMappingURL=s3.d.ts.map