import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface ILayoutProps{
    children : React.ReactNode
}

export default function AuthLayout(props: ILayoutProps){
    const {children} = props

    return (
        <div className="flex flex-wrap justify-center items-center  min-h-screen bg-sign-in-back">
            <div>
                {children}
            </div>
        </div>
    )
}