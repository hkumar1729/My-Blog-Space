import { Quote } from "../Components/Quote";
import {Button} from "../Components/Button"
import { Inputfield } from "../Components/Inputfield";
import { Heading } from "../Components/Heading";
import { Subheading } from "../Components/Subheading";
import { useState } from "react";
import {signUpParam} from '../../../common/dist/index'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Signup(){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState<signUpParam>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,inputs)

            if(response.data.msg === 'User created successfully'){
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
        <div className="flex flex-col justify-center items-center px-32">
            <Heading label={'Create an Account'}/>
            <Subheading l1={'Already have an account?'} l2={'Login'} to={'/signin'}/>
            <Inputfield onchange={(e)=>{setInputs((c:signUpParam)=>({...c, name:e.target.value}))}} label={'Your Name'} placeholder={'John'} type={'text'}/>
            <Inputfield onchange={(e)=>{setInputs((c:signUpParam)=>({...c, email:e.target.value}))}} label={'Email'} placeholder={'John@gmail.com'} type={'text'}/>
            <Inputfield onchange={(e)=>{setInputs((c:signUpParam)=>({...c, password:e.target.value}))}} label={'Password'} placeholder={'•••••••••'} type={'password'}/>
            <Button onclick={sendRequest} label={'Sign Up'}/>
        </div>
        <div className="hidden md:block">
            <Quote label={"The customer service I recieved was exceptional. The support Team went above and beyond and to address my concerns"} author={"Jules Winnfield"} about={"CEO, Acme Inc"}/>
        </div>
    </div>

}