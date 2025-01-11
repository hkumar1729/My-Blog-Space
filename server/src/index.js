import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify, sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import { cors } from 'hono/cors';
import { signUpInput, signInInput } from '../../common/dist/index';
const app = new Hono();
// const dburl = process.env.DATABASE_URL can't use here.
app.use(cors());
app.use('/api/v1/blog/*', async (c, next) => {
    try {
        const header = c.req.header("Authorization") || "";
        const token = header.split(" ")[1];
        const verification = await verify(token, c.env.JWT_Secret);
        if (!verification) {
            c.status(401);
            return c.json({ msg: "You are not logged in" });
        }
        c.set('userId', verification.id);
        await next();
    }
    catch (e) {
        c.status(403);
        return c.json({ msg: "Not Authorised" });
    }
});
app.post('/api/v1/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const { success } = signUpInput.safeParse(body);
        if (!success) {
            c.status(404);
            return c.json({ msg: "Invalid Input" });
        }
        const check = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (check) {
            c.status(403);
            return c.json({ error: 'User already exist' });
        }
        const hashing = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashing,
                name: body.name
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_Secret);
        return c.json({ msg: 'User created successfully', token });
    }
    catch (error) {
        return c.json({ msg: 'Error in signup. Try again' });
    }
});
app.post('/api/v1/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const { success } = signInInput.safeParse(body);
        if (!success) {
            c.status(404);
            return c.json({ msg: "Invalid Input" });
        }
        const check = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });
        if (!check) {
            c.status(403);
            return c.json({ error: 'User does not exist' });
        }
        const isValid = await bcrypt.compare(body.password, check.password);
        if (!isValid) {
            return c.json({ msg: "Incorrect password" });
        }
        const token = await sign({ id: check.id }, c.env.JWT_Secret);
        return c.json({ token, msg: 'Successfully Logged In' });
    }
    catch {
        return c.json({ msg: 'Error in signin try again' });
    }
});
app.post('/api/v1/blog/post', (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = c.req.json();
});
app.put('/api/v1/blog/update', (c) => {
    const id = c.get('userId');
    return c.json(id);
});
app.get('/api/v1/blog/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({ post });
});
export default app;