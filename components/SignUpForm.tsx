import React from "react"
import { connect } from 'react-redux'
import Identity from '../redux/models/identity'
import Router from 'next/router'
import saga from "redux/decorators/saga"
interface IProps{
    saveUser: (data: any) => void
}
interface IState{
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    confirmPassword : string
}
@saga(Identity)
export  class SignUpForm extends React.Component<IProps, IState>{
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
        console.log('HANDLE_SUBMIT')
        
        const {saveUser} = this.props
        e.preventDefault()
        saveUser(this.state)
        Router.push('/login')
        console.log('PREVENT_DEFAULT')

    }
    
    render(){
        return(     
            <form className="flex flex-col items-center w-full sm:w-435">
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
                        <button onClick={this.handleSubmitChange} className="bg-red-600 px-6  text-white text-sm font-medium  py-3 rounded-md ">
                            Sign Up
                        </button>
                    </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, Identity.getTriggers())(SignUpForm);