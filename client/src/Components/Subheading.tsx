interface Labels{
    l1:string,
    l2:string
}


export const Subheading = ({l1,l2}:Labels)=>{
    return <div className='text-slate-500 text-sm font-sans mb-3 flex'>
        <div className="">{l1}</div>
        <div className="text-blue-600 underline cursor-pointer">{l2}</div>
  </div>
}