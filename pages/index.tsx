import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import BikeComponentList from '../components/BikeComponentList'
import Layout from '../components/Layout'
import React from 'react' 


export default function Home() {
  return (
    <Layout>
      <section className="mt-8 px-4">
        <div className="flex flex-col bg-white rounded-xl py-3">
          <h2 className=" text-center text-gray-800 text-3xl">
            Categories
          </h2>
          <p className="mt-3 text-gray-500 text-center">
            This types of motorcycles you can buy
          </p>
        </div>

        <div className="mt-4 flex flex-col px-4 sm:flex-row sm:w-full sm:flex-wrap">
          <div className="mt-2 sm:w-1/2 bg-white sm:bg-gray-200 rounded-lg px-4 pt-4 pb-3 shadow-lg sm:shadow-sm">
            <img className="rounded-lg" src="http://placeimg.com/500/250/any" alt="" />
            <h2 className="text-center font-medium text-gray-900">Classic</h2>
          </div>
          <div className="mt-2 sm:w-1/2 bg-white sm:bg-gray-200 rounded-lg px-4 pt-4 pb-3 shadow-lg sm:shadow-sm">
            <img className="rounded-lg" src="http://placeimg.com/500/250/any" alt="" />
            <h2 className="text-center font-medium text-gray-900">Sport bike</h2>
          </div>
          <div className="mt-2 sm:w-1/2 bg-white sm:bg-gray-200 rounded-lg px-4 pt-4 pb-3 shadow-lg sm:shadow-sm">
            <img className="rounded-lg" src="http://placeimg.com/500/250/any" alt="" />
            <h2 className="text-center font-medium text-gray-900">Super sport</h2>
          </div>
          <div className="mt-2 sm:w-1/2 bg-white sm:bg-gray-200 rounded-lg px-4 pt-4 pb-3 shadow-lg sm:shadow-sm">
            <img className="rounded-lg" src="http://placeimg.com/500/250/any" alt="" />
            <h2 className="text-center font-medium text-gray-900">Chopper</h2>
          </div>
          
        </div>
      </section>

      <section className="pt-0 mt-4 border-t border-gray-300">
        <BikeComponentList/>
      </section>
    </Layout>
  )
}
