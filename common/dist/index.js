"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = exports.blogInput = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.blogInput = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    publishDate: zod_1.z.string(),
});
exports.Update = zod_1.z.object({
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(8)
});
