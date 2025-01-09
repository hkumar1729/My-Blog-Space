import {z} from 'zod'

export const signUpInput = z.object({
    name:z.string().min(1),
    username:z.string().email(),
    password:z.string().min(8)
})

export const signInInput = z.object({
    username:z.string().email(),
    password: z.string().min(8)
})

export type signInParam = z.infer<typeof signInInput>
export type signUpParam = z.infer<typeof signUpInput>
