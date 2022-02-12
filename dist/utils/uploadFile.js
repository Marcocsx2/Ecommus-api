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
exports.uploadFile = exports.uploadOneFile = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
});
exports.uploadOneFile = (file, folder, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date().getTime();
    const filetoUpload = {
        Bucket: `${process.env.aws_bucket_name}/${folder}/${user_id}`,
        Key: `${date}-${file.name}`.replace(/ /g, ""),
        Body: file.data,
        ACL: "public-read",
    };
    const responseS3 = yield s3
        .upload(filetoUpload, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data.Location);
    })
        .promise();
    console.log("RESPONSE:", responseS3);
    return responseS3;
});
exports.uploadFile = (file, folder, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    var urlPhotos = [];
    for (var i = 0; i < file.length; i++) {
        let date = new Date().getTime();
        const filetoUpload = {
            Bucket: `${process.env.aws_bucket_name}/${folder}/${user_id}`,
            Key: `${date}-${file[i].name}`.replace(/ /g, ""),
            Body: file[i].data,
            ACL: "public-read",
        };
        const responseS3 = yield s3
            .upload(filetoUpload, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log("success");
        })
            .promise();
        urlPhotos.push(responseS3.Location);
    }
    return urlPhotos;
});
//# sourceMappingURL=uploadFile.js.map