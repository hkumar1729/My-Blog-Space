import { useState } from "react";
import { Appbar } from "../Components/Appbar";
import { blogParam } from "../../../common/dist";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function Blog(){
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const name = params.get('name')!
    const [content, setContent] = useState<blogParam>({
        title:'',
        content:'',
        publishDate:date()

    })

    function date():string{
        const date = new Date()
        const day = String(date.getDate()).padStart(2,'0')
        const month = String((date.getMonth())+1).padStart(2,'0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    async function publish() {
        try{const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`,content,{
            headers:{
                Authorization:localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
    if(response.data.msg ==="Blog Posted successfully"){
        alert(response.data.msg)
        navigate(`../blogs?name=${name}`)
    }
    else{
        alert(response.data.msg)
    }
}catch(e:any){
            alert(e.response.data.msg)
        }
    }
    return<>
        <Appbar name={name}/>
        <div className="p-16 mt-10">
        
            <h1 className="mb-4 text-lg font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Write your own blog post.</span></h1>
            <textarea id="message" rows={1} onChange={(e)=>{setContent((c:blogParam)=>({...c, title:e.target.value}))}} className="block mt-9 p-2.5 w-full text-sm mb-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Topic..."></textarea>
            <textarea id="message" rows={15} onChange={(e)=>{setContent((c:blogParam)=>({...c, content:e.target.value}))}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Write your blog post here..."></textarea>
            <button type="button" onClick={publish} className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Post</button>
    </div>
    </>
}