import { Quote } from "../Components/Quote";
import {Button} from "../Components/Button"
import { Inputfield } from "../Components/Inputfield";
import { Heading } from "../Components/Heading";
import { Subheading } from "../Components/Subheading";
import {signInParam} from '../../../common/dist/index'
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signup(){
    const navigate = useNavigate()
    const [input, setInputs] = useState<signInParam>({
        email:"",
        password:""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,input)

            if(response.data.msg === 'Successfully Logged In'){
                const token = response.data.token
                alert(response.data.msg)
                localStorage.setItem("token", `Bearer ${token}`)
                navigate('/blogs')
            }
        }catch(e:any){
            alert(e.response.data.msg)
        }
        
    }


    return<div className="grid grid-cols-1 justify-center items-center md:grid-cols-2">
        <div className="flex flex-col justify-center items-center">
            <Heading label={'Enter your credentials'}/>
            <Subheading l1={"Don't have an account? "} l2={'Sign Up'} to={'/signup'}/>
            <Inputfield onchange={(e)=>{setInputs((c:signInParam)=>({...c, email:e.target.value}))}} label={'Email'} placeholder={'John@gmail.com'} type={'text'}/>
            <Inputfield onchange={(e)=>{setInputs((c:signInParam)=>({...c, password:e.target.value}))}} label={'Password'} placeholder={'•••••••••'} type={'password'}/>
            <Button onclick={sendRequest} label={'Sign In'}/>
        </div>
        <div className="hidden md:block">
         <Quote label={"The customer service I recieved was exceptional. The support Team went above and beyond and to address my concerns"} author={"Jules Winnfield"} about={"CEO, Acme Inc"}/>
        </div>
    </div>
}
