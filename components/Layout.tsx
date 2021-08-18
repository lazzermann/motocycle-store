import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SearchBar from './SearchBar'
interface ILayoutProps{
    children : React.ReactNode
}

export default function Layout(props: ILayoutProps){
    const {children} = props

    return (
        <div className="bg-gray-200 pb-3 min-h-screen mx-auto max-w-5xl">
            <Header />
            <SearchBar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}