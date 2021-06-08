import Link from 'next/link'
import React,{useEffect, useState}  from 'react'

export default function Header(){
    const [isToggle, setIsToggle] = useState(false)

    return(
        <header>
        <div className="flex justify-between px-2 py-2">
          <div className="">
            <svg className="w-48 h-14 " viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg"><path d="M0 167.5V26.8h111.3c20.6 0 36.4 1.1 47.3 3.5 10.9 2.3 19.7 6.6 26.4 12.8s10 13.8 10 22.8c0 7.8-2.6 14.5-7.7 20.2s-12.2 10.3-21.1 13.8c-5.7 2.3-11.5 3.8-21.4 5.2 16.4 16.5 35.2 37.4 55.7 62.4H137c-11.9-15.3-31.1-37.5-45.9-57.2H66.9v57.2H0zm67.1-79.8h37.4c7.9 0 14.2-.7 18.6-2.2 4.5-1.5 7.9-3.9 10.2-7.1s3.5-6.8 3.5-10.6c0-5.6-2.2-10.2-6.8-13.9-4.5-3.6-11.6-5.4-21.4-5.4H67.1v39.2zM222.4 121l63.6-2.6c1.4 6.7 4.2 11.8 8.4 15.4 6.8 5.7 16.7 8.5 29.5 8.5 9.5 0 16.9-1.4 22-4.4 5.1-2.9 7.7-6.3 7.7-10.1 0-3.6-2.4-6.9-7.3-9.8s-16.3-5.6-34.2-8.2c-29.3-4.3-50.2-10-62.7-17.1-12.6-7.1-18.9-16.2-18.9-27.2 0-7.2 3.2-14.1 9.7-20.5 6.4-6.4 16.1-11.5 29-15.2s30.7-5.5 53.2-5.5c27.6 0 48.7 3.3 63.2 10s23.1 17.3 25.9 31.9l-63 2.4c-1.7-6.3-5.2-10.9-10.6-13.8-5.3-2.9-12.7-4.3-22.1-4.3-7.8 0-13.6 1-17.6 3.2-3.9 2.1-5.9 4.8-5.9 7.8 0 2.2 1.6 4.2 4.8 6 3.2 1.9 10.6 3.6 22.4 5.2 29.2 4.1 50.1 8.3 62.7 12.4 12.6 4.2 21.8 9.4 27.6 15.6 5.7 6.2 8.7 13.1 8.7 20.8 0 9-3.9 17.3-11.5 24.9-7.7 7.6-18.4 13.4-32.2 17.3-13.7 3.9-31.1 5.9-52 5.9-36.7 0-62.2-4.6-76.4-13.8-14.2-8.9-22.2-20.6-24-34.8zM437 26.8h203v34.8h-68.2v106H505v-106h-68V26.8z" fill="red"/><text x="580" y="22" font-family="Arial,sans-serif" font-size="2.5em">.ua</text></svg>
          </div>

          <div className="flex mt-4 mr-2">
            <div className="pr-10">
                <button type="button"> {/*Add link to login page*/}
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459"><path d="M229.5 0C102.53 0 0 102.845 0 229.5 0 356.301 102.719 459 229.5 459 356.851 459 459 355.815 459 229.5 459 102.547 356.079 0 229.5 0zm118.101 364.67C314.887 393.338 273.4 409 229.5 409c-43.892 0-85.372-15.657-118.083-44.314a16.37 16.37 0 01-5.245-15.597c11.3-55.195 46.457-98.725 91.209-113.047C174.028 222.218 158 193.817 158 161c0-46.392 32.012-84 71.5-84s71.5 37.608 71.5 84c0 32.812-16.023 61.209-39.369 75.035 44.751 14.319 79.909 57.848 91.213 113.038a16.39 16.39 0 01-5.243 15.597z"/></svg>
                </button>
            </div>

            <div>
              <button onClick={()=>{setIsToggle(!isToggle)}} type="button">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 95.95"><path d="M8.94 0h105c4.92 0 8.94 4.02 8.94 8.94s-4.02 8.94-8.94 8.94h-105C4.02 17.88 0 13.86 0 8.94S4.02 0 8.94 0zm0 78.07h105c4.92 0 8.94 4.02 8.94 8.94s-4.02 8.94-8.94 8.94h-105C4.02 95.95 0 91.93 0 87.01s4.02-8.94 8.94-8.94zm0-39.04h105c4.92 0 8.94 4.02 8.94 8.94s-4.02 8.94-8.94 8.94h-105C4.02 56.91 0 52.89 0 47.97c0-4.91 4.02-8.94 8.94-8.94z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <nav className={`sm:fixed sm:h-full sm:z-10 sm:w-1/4 sm:inset-0 sm:bg-gray-100 ${isToggle ? 'block' : 'hidden'}`}>
          <div className="block cursor-pointer">
            <div className="bg-white sm:bg-gray-100">
            
              <div className="border-t-8 sm:border-none sm:border-gray-300 transition ease-out duration-300  hover:bg-gray-300">
                 <Link href="/login">
                  <div className="flex justify-between pr-4 pl-6 py-3">
                        <a className="flex justify-between" href="">
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459"><path d="M229.5 0C102.53 0 0 102.845 0 229.5 0 356.301 102.719 459 229.5 459 356.851 459 459 355.815 459 229.5 459 102.547 356.079 0 229.5 0zm118.101 364.67C314.887 393.338 273.4 409 229.5 409c-43.892 0-85.372-15.657-118.083-44.314a16.37 16.37 0 01-5.245-15.597c11.3-55.195 46.457-98.725 91.209-113.047C174.028 222.218 158 193.817 158 161c0-46.392 32.012-84 71.5-84s71.5 37.608 71.5 84c0 32.812-16.023 61.209-39.369 75.035 44.751 14.319 79.909 57.848 91.213 113.038a16.39 16.39 0 01-5.243 15.597z"/></svg>
                          <span className="pl-4">Sign in</span>
                        </a>
                        
                        <a className="" href="">
                          <svg className="fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.47 16.47a.75.75 0 001.06 1.06l5-5a.75.75 0 000-1.061l-5-5A.75.75 0 009.47 7.53L13.94 12z" fill="#141124"/></svg>
                        </a>
                        
                    </div>
                </Link>  
              </div>
            </div>
            
            <div className="bg-white sm:bg-gray-100 px-4 py-3 border-t-8 sm:border-t sm:border-gray-300">
              <span className="font-bold text-xl">Search</span>
            </div>
            
            <div className="bg-white sm:bg-gray-100">
            
            <div className="border-t sm:border-gray-300 transition ease-out duration-300  hover:bg-gray-300">
               <Link href="/test">
                <div className="flex justify-between pr-4 pl-6 py-3">
                      <a className="flex justify-between" href="">
                        <span className="pl-1">Classic</span>
                      </a>
                      
                      <a className="" href="">
                        <svg className="fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.47 16.47a.75.75 0 001.06 1.06l5-5a.75.75 0 000-1.061l-5-5A.75.75 0 009.47 7.53L13.94 12z" fill="#141124"/></svg>
                      </a>
                      
                  </div>
              </Link>  
            </div>
          
            <div className="border-t sm:border-gray-300 transition ease-out duration-300  hover:bg-gray-300">
                <Link href="/test">
                  <div className="flex justify-between pr-4 pl-6 py-3">
                      <a className="flex justify-between" href="">
                        <span className="pl-1">Sport bike</span>
                      </a>
                      
                      <a className="" href="">
                        <svg className="fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.47 16.47a.75.75 0 001.06 1.06l5-5a.75.75 0 000-1.061l-5-5A.75.75 0 009.47 7.53L13.94 12z" fill="#141124"/></svg>
                      </a>
                  </div> 
                </Link>
            </div>
            
            <div className="border-t sm:border-gray-300 transition ease-out duration-300 hover:bg-gray-300">
              <Link href="/test">
                  <div className="flex justify-between pr-4 pl-6 py-3">
                      <a className="flex justify-between" href="">
                        <span className="pl-1">Super sport</span>          
                      </a>
                      
                      <a className="" href="">
                        <svg className="fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.47 16.47a.75.75 0 001.06 1.06l5-5a.75.75 0 000-1.061l-5-5A.75.75 0 009.47 7.53L13.94 12z" fill="#141124"/></svg>
                      </a>
                  </div>
              </Link> 
            </div>

            <div className="border-t sm:border-gray-300 transition ease-out duration-300 hover:bg-gray-300">
              <Link href="/test">
                  <div className="flex justify-between pr-4 pl-6 py-3">
                      <a className="flex justify-between" href="">
                        <span className="pl-1">Chopper</span>          
                      </a>
                      
                      <a className="" href="">
                        <svg className="fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.47 16.47a.75.75 0 001.06 1.06l5-5a.75.75 0 000-1.061l-5-5A.75.75 0 009.47 7.53L13.94 12z" fill="#141124"/></svg>
                      </a>
                  </div>
              </Link> 
            </div>

          </div>
          </div>
        </nav>
        <h1 className="pt-4 text-gray-700 text-center text-3xl sm:text-4xl">Best motorcycles !</h1>
      </header>
    )
}