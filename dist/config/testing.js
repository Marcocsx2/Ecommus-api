"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    secrets: {
        jwt: 'SecretKeyTest'
    },
    database: 'aluka',
    dbUrl: () => process.env.MONGO_URI_DEV
};
//# sourceMappingURL=testing.js.map