import { z } from 'zod';
export declare const signUpInput: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    username: string;
    password: string;
}, {
    name: string;
    username: string;
    password: string;
}>;
export declare const signInInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signInParam = z.infer<typeof signInInput>;
export type signUpParam = z.infer<typeof signUpInput>;
