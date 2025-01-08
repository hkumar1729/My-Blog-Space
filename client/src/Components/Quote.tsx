interface Inspiration{
    label:string,
    author:string,
    about:string
}

export const Quote = ({label, author, about}:Inspiration)=>{
    return <div className="h-screen bg-slate-200 flex justify-center text-center">
        <div className="flex flex-col justify-center text-center w-96">
            <div className="text-xl font-semibold font-serif text-start">
                {label}
            </div>
            <div className="text-start font-medium mt-3">
                {author}
            </div>
            <div className="text-start text-gray-500">
                {about}
            </div>
        </div>
    </div>
}