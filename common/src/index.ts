import {string, z} from 'zod'

export const signUpInput = z.object({
    name:z.string().min(1),
    email:z.string().email(),
    password:z.string().min(8)
})

export const signInInput = z.object({
    email:z.string().email(),
    password: z.string().min(8)
})

export const blogInput = z.object({
    title:z.string().min(1),
    content:z.string().min(1),
    publishDate:z.string(),

})

export const Update = z.object({
    name:z.string().min(1),
    password:z.string().min(8)
})

export type signInParam = z.infer<typeof signInInput>
export type signUpParam = z.infer<typeof signUpInput>
export type blogParam = z.infer<typeof signInInput>
export type updateParam = z.infer<typeof signUpInput>
