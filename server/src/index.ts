import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify, sign} from 'hono/jwt'
import bcrypt from 'bcryptjs'

type Binding = {
  DATABASE_URL: string,
  JWT_Secret: string
}

const app = new Hono<{
  Bindings:Binding,
  Variables:{
    userId: string
  }
}>()

// const dburl = process.env.DATABASE_URL can't use here.

app.use('/api/v1/blog/*',async (c,next)=>{
  const header = c.req.header("authorization") || ""
  const token = header.split(" ")[1]
  const verification = await verify(token, c.env.JWT_Secret) as {id:string}
  if(!verification){
    c.status(401)
    return c.json({msg:"Unauthorized"})
  }
  c.set('userId', verification.id)
  await next()
})

app.post('/api/v1/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
        try{const body = await c.req.json()
        
          const check = await prisma.user.findUnique({
            where:{
              email: body.email
            }
          })
          if(check){
            c.status(403);
            return c.json({error: 'User already exist'})
          }
          const hashing = await bcrypt.hash(body.password, 10)
        
          const user = await prisma.user.create({
            data:{
              email: body.email,
              password: hashing,
              name: body.name
            }
          })
          const token = await sign({id: user.id}, c.env.JWT_Secret)
          return c.json({msg:'User created successfully', token})}
    
    catch(error){
      return c.json({msg: 'Error in signup. Try again'})
    } 
  
})

app.post('/api/v1/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
      try{const body = await c.req.json()

        const check = await prisma.user.findUnique({
          where:{
            email: body.email,
          }
        })
        if(!check){
          c.status(403)
          return c.json({error: 'User does not exist'})
        }
        const isValid = await bcrypt.compare(body.password, check.password);
        if(!isValid){
          return c.json({msg:"Incorrect password"})
        }
        const token = await sign({id: check.id}, c.env.JWT_Secret)
        return c.json({token, msg:'Successfully Logged In'})}
    
    catch{
      return c.json({msg:'Error in signin try again'})
    }
  
})

app.post('/api/v1/blog/post',(c)=>{
  return c.json({msg:c.get('userId')})
})

app.put('/api/v1/blog/update',(c)=>{
  return c.text('hello')
})

app.get('/api/v1/blogg',(c)=>{
  return c.text('hello')
})

export default app
