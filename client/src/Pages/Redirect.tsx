import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

export const Redirect = ()=>{
    const navgate = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navgate('/signin')
        },2000)
    },[])
    return <div>
        Redirecting to My-Blog-Space
    </div>
}