import { Quote } from "../Components/Quote";
import {Button} from "../Components/Button"
import { Inputfield } from "../Components/Inputfield";
import { Heading } from "../Components/Heading";
import { Subheading } from "../Components/Subheading";
export default function Signup(){
    return<div className="grid grid-cols-2 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
            <Heading label={'Enter your credentials'}/>
            <Subheading l1={"Don't have an account? "} l2={'Sign Up'}/>
            <Inputfield label={'Email'} placeholder={'John@gmail.com'} type={'text'}/>
            <Inputfield label={'Password'} placeholder={''} type={'password'}/>
            <Button label={'Sign In'}/>
        </div>
        <Quote label={"The customer service I recieved was exceptional. The support Team went above and beyond and to address my concerns"} author={"Jules Winnfield"} about={"CEO, Acme Inc"}/>
    </div>
}