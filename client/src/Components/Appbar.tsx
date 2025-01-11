import {Link} from 'react-router-dom'

export const Appbar = ()=>{
    return <>
        

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">My Blog Space</span>
                    </div>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-blue-700">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{"Harsh"[0]}</span>
                    </div>
                        <Link to="../signin" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                    </div>
                </div>
            </nav>
    </>
}