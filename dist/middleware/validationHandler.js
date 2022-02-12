"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const baseSchema_1 = require("./schema/baseSchema");
const validate = (data, schema) => {
    const { error } = joi_1.default.object(schema).validate(data);
    return error;
};
const validationHandler = (req, schema = baseSchema_1.baseSchema({}), check = ['body']) => {
    const errors = check.map((toCheck) => {
        const validationError = validate(req[toCheck], schema[toCheck]);
        if (!validationError)
            return null;
        return {
            error_type: validationError.name,
            message: validationError.message.replace(/"/g, "'"),
            status_code: 400
        };
    }).filter(Boolean);
    if (errors.length === 0)
        return null;
    console.log(errors);
    return errors[0];
};
exports.default = validationHandler;
//# sourceMappingURL=validationHandler.js.map