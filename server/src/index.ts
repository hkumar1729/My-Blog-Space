import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify, sign} from 'hono/jwt'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_seceret: string
  }
}>()

// const dburl = process.env.DATABASE_URL can't use here.

app.post('/api/v1/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const check = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  })
  if(!check){
    c.status(403);
    return c.json({error: 'User already exist'})
  }

  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
      name: body.name
    }
  })
  const token = sign({id: user.id}, c.env.JWT_seceret)
  return c.json({token: token})
})

app.post('/api/v1/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()

  const check = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  })
  if(!check){
    c.status(403)
    return c.json({error: 'User already exist'})
  }
  const token = sign({id: check.id}, c.env.JWT_seceret)
  return c.json({token})
})

app.post('/api/v1/blog',(c)=>{
  return c.text('hello')
})

app.put('/api/v1/blog',(c)=>{
  return c.text('hello')
})

app.get('/api/v1/blog:id',(c)=>{
  return c.text('hello')
})

export default app
