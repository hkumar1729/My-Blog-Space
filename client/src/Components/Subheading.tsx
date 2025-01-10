import { Link } from "react-router-dom"

interface Labels{
    l1:string,
    l2:string,
    to:string
}


export const Subheading = ({l1,l2, to}:Labels)=>{
    return <div className='text-slate-500 text-sm font-sans mb-3 flex'>
        <div className="">{l1}</div>
        <Link className="text-blue-600 underline cursor-pointer ml-1" to={to}>{l2}</Link>
  </div>
}