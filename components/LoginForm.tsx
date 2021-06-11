import dynamic from "next/dynamic"
import React from "react"
import Link from 'next/link'
import Router  from 'next/router'
import { xSave } from '../model' 
interface WithRouterProps{
    // router : NextRouter
}
interface IState{
    email : string,
    password : string
}

export default class LoginForm extends React.Component<WithRouterProps, IState>{
    constructor(props){
        super(props)

        this.state = {
            email : '',
            password : ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmitChange = this.handleSubmitChange.bind(this)
    }

    handleInputChange(e){
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState<typeof name>({
            [name]: value
        })
    }

    handleSubmitChange(e){
        e.preventDefault()
        
        // const opts = {
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // }
        
        // const response = fetch('/auth/login', opts)
        
        // response.then((data) => {
        //     data.json()
        //     .then((data) => console.log(data))
        //     .catch((err) => console.log('Json' + ' ' + err)
        //     )
        // })
        // .catch((err) => console.log(err))

        const data = xSave('/auth/login', this.state).then((res) =>{
            console.log(res.json)
            console.log(document.cookie)
            return res.json
        })

        Router.push({
            pathname : '/'
        })
    }
    
    render(){
        
        return(     
            <form onSubmit={this.handleSubmitChange} className="flex flex-col items-center w-full sm:w-435">
                <div className = "w-full sm:w-435">
                    <div className="pt-5">
                        <input name="email" value={this.state.email} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Email" type="text" />
                    </div>
                    <div className="pt-5">
                        <input name="password" value={this.state.password} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Password" type="password" />
                    </div>
                </div>

                <div className="flex flex-row justify-between mt-4 w-64 sm:w-435">
                    {/* <div>
                        <input className="form-checkbox h-5 w-5 bg-gray-300 rounded-md" type="checkbox" name="balcony"/>
                        <span className="text-sm font-normal px-2 text-gray-300">Remember me</span>
                    </div> */}
                    
                    <div>
                        <a className="text-sm font-normal text-gray-300 hover:text-blue-600" href="#">Forget Password ?</a>
                    </div>
                </div>

                <div className="flex mt-4">
                    <button type="submit" className="bg-red-600 px-6  text-white text-sm font-medium  py-3 rounded-md ">
                        Sign In
                    </button>
                </div>

                <div className="flex mt-12">
                    <h3 className="text-gray-600 text-center text-sm px-2">Don`t you have account yet?</h3>
                    <Link href ="/signUp">
                        <a className="text-gray-400 text-center text-sm px-2 hover:text-blue-600">Sign up</a> 
                    </Link>
                </div>
            </form>
        )
    }
}

