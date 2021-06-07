import dynamic from 'next/dynamic'
const Footer = dynamic(()=> import('../components/Footer'))

export default function SignUp(){
    return(
        <div className="flex flex-wrap justify-center items-center  min-h-screen bg-sign-in-back">
            <div className="-mt-10">
                
                <div className="flex flex-col items-center">
                    <svg className="w-48 h-14"  viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg"><path d="M0 167.5V26.8h111.3c20.6 0 36.4 1.1 47.3 3.5 10.9 2.3 19.7 6.6 26.4 12.8s10 13.8 10 22.8c0 7.8-2.6 14.5-7.7 20.2s-12.2 10.3-21.1 13.8c-5.7 2.3-11.5 3.8-21.4 5.2 16.4 16.5 35.2 37.4 55.7 62.4H137c-11.9-15.3-31.1-37.5-45.9-57.2H66.9v57.2H0zm67.1-79.8h37.4c7.9 0 14.2-.7 18.6-2.2 4.5-1.5 7.9-3.9 10.2-7.1s3.5-6.8 3.5-10.6c0-5.6-2.2-10.2-6.8-13.9-4.5-3.6-11.6-5.4-21.4-5.4H67.1v39.2zM222.4 121l63.6-2.6c1.4 6.7 4.2 11.8 8.4 15.4 6.8 5.7 16.7 8.5 29.5 8.5 9.5 0 16.9-1.4 22-4.4 5.1-2.9 7.7-6.3 7.7-10.1 0-3.6-2.4-6.9-7.3-9.8s-16.3-5.6-34.2-8.2c-29.3-4.3-50.2-10-62.7-17.1-12.6-7.1-18.9-16.2-18.9-27.2 0-7.2 3.2-14.1 9.7-20.5 6.4-6.4 16.1-11.5 29-15.2s30.7-5.5 53.2-5.5c27.6 0 48.7 3.3 63.2 10s23.1 17.3 25.9 31.9l-63 2.4c-1.7-6.3-5.2-10.9-10.6-13.8-5.3-2.9-12.7-4.3-22.1-4.3-7.8 0-13.6 1-17.6 3.2-3.9 2.1-5.9 4.8-5.9 7.8 0 2.2 1.6 4.2 4.8 6 3.2 1.9 10.6 3.6 22.4 5.2 29.2 4.1 50.1 8.3 62.7 12.4 12.6 4.2 21.8 9.4 27.6 15.6 5.7 6.2 8.7 13.1 8.7 20.8 0 9-3.9 17.3-11.5 24.9-7.7 7.6-18.4 13.4-32.2 17.3-13.7 3.9-31.1 5.9-52 5.9-36.7 0-62.2-4.6-76.4-13.8-14.2-8.9-22.2-20.6-24-34.8zM437 26.8h203v34.8h-68.2v106H505v-106h-68V26.8z" fill="red"/><text x="580" y="22" font-family="Arial,sans-serif" font-size="2.5em">.ua</text></svg>
                </div>
                
                <div className="flex flex-col items-center py-10">
                    <h1 className="text-center  font-semibold text-lg text-gray-700">Sign Up</h1>
                    <h3 className="text-center text-gray-400">Enter your details to create your account</h3>
                </div>
                
                <div className="flex flex-col items-center w-full sm:w-435">
                    <div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Fullname" type="text" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Email" type="text" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Password" type="password" />
                        </div>
                        <div className="pt-7 w-full max-w-full sm:w-435">
                            <input className="py-2 px-6 w-full rounded-md focus:outline-none bg-gray-100  text-gray-900 focus:bg-gray-200" placeholder="Confirm password" type="password" />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between mt-4 w-72 sm:w-435">
                        <div>
                            <span className="text-sm font-normal px-2 text-gray-300">I Agree with the <a href="#" className="text-blue-600 hover:text-blue-400">terms and conditions</a>.</span>
                            <input className="form-checkbox h-4 w-4 bg-gray-300 rounded-md" type="checkbox" name="balcony"/>
                        </div>
                    </div>

                    <div className="flex mt-7">
                        <button className="bg-red-600 px-6  text-white text-sm font-medium  py-3 rounded-md ">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}