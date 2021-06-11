import React from "react"
import {xRead} from '../model'
import Router from 'next/router'
interface IProps{

}
interface IState{
    searchText : string
}

export default class SearchBar extends React.Component<IProps, IState>{

    constructor(props){
        super(props)

        this.state = {
            searchText : ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleInputChange(e){
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState<typeof name>({
            [name]: value
        })
    }

    handleOnClick(){
        // const data = xRead(`/product/search/${this.state.searchText}`)
        // .then((data) =>{
        //     console.log(data.json.data)
        //     return data.json.data            
        // })

        Router.push({
            pathname: `/search/${this.state.searchText}`
        })
    }

    render(){
        return(
            <div className="max-w-5xl mx-auto pt-3">
                <div className="mt-6 px-6 flex items-center justify-center">
                    <svg className="relative left-9 sm:left-12 h-6 w-9 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" /></svg>
                    <input name="searchText" value={this.state.searchText} onChange={this.handleInputChange} className="block w-full sm:w-1/2 mr-4 focus:outline-none rounded-lg pl-10 pr-3 py-2 shadow-lg" placeholder="Search by model" />
                    <button onClick={this.handleOnClick} className="px-4 py-2 block text-white bg-pink-600 focus:outline-none focus:bg-pink-800 rounded-lg focus:rounded-xl font-semibold shadow-lg">Find</button>
                </div>
            </div>
        )
    }
}