"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    secrets: {
        jwt: 'SecretKeyProd'
    },
    database: "aluka",
    dbUrl: () => process.env.MONGO_URI,
};
//# sourceMappingURL=prod.js.map