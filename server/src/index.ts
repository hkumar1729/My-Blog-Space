import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify, sign} from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { cors } from 'hono/cors'
import {signUpInput, signInInput, blogParam, blogInput} from '../../common/dist/index'

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

app.use(cors())

app.use('/api/v1/blog/*',async (c,next)=>{
  try{const header = c.req.header("authorization") || ""
  const token = header.split(" ")[1]
  const verification = await verify(token, c.env.JWT_Secret) as {id:string}
  if(!verification){
    c.status(401)
    return c.json({msg:"You are not logged in"})
  }
  c.set('userId', verification.id)
  await next()}
  catch(e){
    c.status(403);
    return c.json({msg:"Not Authorised"})
  }
})

app.post('/api/v1/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
        try{const body = await c.req.json()
            console.log(body)
        
          const {success} = signUpInput.safeParse(body)
            if (!success){
              c.status(404)
              return c.json({msg:"Invalid Input"})
            }
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

        const {success} = signInInput.safeParse(body)
          if (!success){
            c.status(404)
            return c.json({msg:"Invalid Input"})
          }

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
      c.status(403)
      return c.json({msg:'Error in signin try again'})
    }
  
})

app.post('/api/v1/blog/post',async (c)=>{
  try{const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body =await c.req.json()
  const {success} = blogInput.safeParse(body)
    if(!success){
    c.status(404)
    return c.json({msg:"Invalid Input"})
  }
  const id = c.get('userId')

  const create = await prisma.blog.create({
    data:{
      title: body.title,
      content:body.content,
      publishDate:body.publishDate,
      authorId: c.get("userId")

    }
  })
  return c.json({msg:"Blog Posted successfully"})}
  catch(e){
    c.status(403)
    return c.json({msg:"Something wrong try again later"})
  }

})

app.put('/api/v1/blog/update',(c)=>{
  const id = c.get('userId')
  return c.json(id)
})

app.get('/api/v1/blog/bulk',async (c)=>{
  try{const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.blog.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      publishDate:true,
      author:{
        select:{
          name:true
        }
      }
    }
  })
  return c.json({post})}
  catch(e){
    c.status(403)
    return c.json({msg:"Please try again"})
  }
})

export default app
