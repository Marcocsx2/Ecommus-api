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
exports.deleteFile = exports.deleteFileToPost = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
});
exports.deleteFileToPost = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const filetoDelete = {
        Bucket: process.env.aws_bucket_name,
        Key: file.split(".com/")[1],
    };
    const isDelete = yield s3
        .deleteObject(filetoDelete, (err, data) => {
        if (err) {
            console.log(err, err.stack);
            return false;
        }
        else {
            console.log(data);
            return true;
        }
    })
        .promise();
    console.log("RESPONSE:", isDelete);
    return isDelete;
});
exports.deleteFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const Objects = [];
    for (let x = 0; x < file.length; x++) {
        const deleteKey = { Key: file[x].split(".com/")[1] };
        Objects.push(deleteKey);
    }
    const params = {
        Bucket: process.env.aws_bucket_name,
        Delete: { Objects, Quiet: false },
    };
    console.log(Objects);
    const isDelete = yield s3
        .deleteObjects(params, (err, data) => {
        if (err) {
            console.log("Error al eliminar las fotos", err);
            return false;
        }
        else {
            console.log("Data", JSON.stringify(data));
            return true;
        }
    })
        .promise();
    return isDelete;
});
//# sourceMappingURL=deleteFile.js.map