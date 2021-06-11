import dynamic from "next/dynamic"
import React from "react"
import {xSave} from '../model'
import Router from 'next/router'
interface IProps{

}
interface IState{
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    confirmPassword : string
}

export default class SignUpForm extends React.Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            confirmPassword : ''
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

        // if(this.state.confirmPassword !== this.state.password){
        //     alert('Password don`t match')
        //     return
        // }
        
        // const opts = {
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // }
        
        // const response = fetch('/auth/signup', opts)
        
        // response.then((data) => {
        //     data.json()
        //     .then((data) => console.log(data))
        //     .catch((err) => console.log('Json' + ' ' + err)
        //     )
        // })
        // .catch((err) => console.log(err))

        const data = xSave('/auth/signup', this.state).then((res) =>{
            console.log(res.json)
            return res.json
        })

        Router.push({
            pathname: '/'
        })
    }
    
    render(){
        return(     
            <form onSubmit={this.handleSubmitChange} className="flex flex-col items-center w-full sm:w-435">
                    <div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input name="firstName" value={this.state.firstName} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="First name" type="text" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input name="lastName" value={this.state.lastName} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Last name" type="text" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input name="email" value={this.state.email} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Email" type="text" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input name="password" value={this.state.password} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Password" type="password" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Confirm password" type="password" />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between mt-4 w-72 sm:w-435">
                        <div>
                            <span className="text-sm font-normal px-2 text-gray-300">I Agree with the <a href="#" className="text-blue-600 hover:text-blue-400">terms and conditions</a>.</span>
                            <input className="form-checkbox h-4 w-4 bg-gray-300 rounded-md" type="checkbox" name="balcony"/>
                        </div>
                    </div>

                    <div className="flex mt-7">
                        <button type="submit" className="bg-red-600 px-6  text-white text-sm font-medium  py-3 rounded-md ">
                            Sign Up
                        </button>
                    </div>
            </form>
        )
    }
}