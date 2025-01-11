import { z } from 'zod';
export declare const signUpInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    publishDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    publishDate: string;
}, {
    title: string;
    content: string;
    publishDate: string;
}>;
export declare const Update: z.ZodObject<{
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    password: string;
}, {
    name: string;
    password: string;
}>;
export type signInParam = z.infer<typeof signInInput>;
export type signUpParam = z.infer<typeof signUpInput>;
export type blogParam = z.infer<typeof blogInput>;
export type updateParam = z.infer<typeof Update>;
