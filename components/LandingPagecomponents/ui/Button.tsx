
import React from "react"

export const Button = ({className , children}:{className?:String , children:React.ReactNode}) => {
    return (
     <button className={`relative cursor-pointer border border-border px-3 py-1 rounded-xl ${className || ''}`}>
                <div className=" absolute -bottom-px inset-x-0 w-full bg-linear-to-r from-transparent via-sky-400 to-transparent h-px  "></div>
                {children}
     </button>
    )
}
