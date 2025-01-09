"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.signInInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
