interface Values {
  label:string,
  placeholder: string,
  type:string
}

export const Inputfield = ({label,placeholder, type}:Values)=>{
    return <div className=" flex flex-col justify-center item-center font-medium">
        <div className="ml-2 mt-3">
          {label}
        </div>
        <div>
          <input type={type} placeholder={placeholder} className='border border-gray-500 w-72 rounded pl-3 pt-1 pb-1 mt-1' ></input>
        </div>
  </div>

}