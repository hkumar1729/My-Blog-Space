import BlogCard from "../Components/BlogCard"
import {Appbar} from '../Components/Appbar'
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"


type Author = {
    name: string;
  };

interface post {
    id: string;
    title: string;
    content: string;
    author: Author;
    publishDate:string;
  }

export default function Blogs(){
    const [post, newPost] = useState<post[]>([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            }).then((resolve)=>{
                newPost(resolve.data.post)
            })
        }
        else{
            navigate('../signin')
        }
    },[])


    return <div>
        <Appbar/>
        <div className="flex flex-col p-48 -mt-32">
            <div className="-mb-6 flex">
                <div className="text-blue-600">
                    ♦
                </div>
                <div className="pl-5">
                    For You
                </div>
            </div>
            <div className="-mb-10">
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300"/>
            </div>
        </div>
        {post.map((value)=>{
            return <BlogCard
            key={value.id}
            authorName={value.author.name} 
            publishDate={value.publishDate} 
            title={value.title} 
            description={value.content}
            />

        })}

    </div>
}