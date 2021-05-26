import dynamic from 'next/dynamic'

const Header = dynamic(()=> import('../components/Header'))
const Footer = dynamic(()=> import('../components/Footer'))
const BikeComponent = dynamic(()=> import('../components/BikeComponent'))

export default function Product(){
    return(
        <div className="bg-gray-200 pb-3 min-h-screen mx-auto max-w-5xl">
            <Header />
            <h1 className="mt-10 text-3xl text-center">Product</h1>
            <section className="mt-4 mx-5 p-4 rounded-md bg-white flex flex-col items-center sm:flex-row sm:shadow-lg">
                <div className="mx-auto sm:self-start sm:mx-0">
                    <img className="rounded-md" width="400" height="200" src="http://placeimg.com/640/360/any" alt="" />
                    <div className="mt-2 text-sm text-gray-600 flex items-start sm:justify-center sm:items-center">
                        <svg className="h-6 w-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                        <svg className="h-6 w-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                        <svg className="h-6 w-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                        <svg className="h-6 w-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                        <svg className="h-6 w-6 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                        <span className="ml-2 text-lg">34 reviews</span>
                    </div>
                </div>

                
                <div className="block mt-3 sm:-mt-3 sm:ml-6 sm:w-5/6">
                    <span className="font-bold text-lg">Characteristics :</span>
                    <div className="pt-2">
                        <div className="flex hover:bg-gray-100 w-auto">
                            <h1 className="font-semibold text-lg">Price :</h1>
                            <span className="pl-6 -mt-0.5 text-2xl">2000 $</span>
                        </div>
                        <div className="flex hover:bg-gray-100 w-auto">
                            <h1 className="font-semibold text-lg">Year :</h1>
                            <span className="pl-7 -mt-0.5 text-2xl">2007</span>
                        </div>
                        <div className="flex hover:bg-gray-100 w-auto">
                            <h1 className="font-semibold text-lg">Type :</h1>
                            <span className="pl-6 -mt-0.5 text-2xl">Classic</span>
                        </div>
                    </div>

                    <div className="border-t-2 mt-2 border-gray-500">
                        <div className="my-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Duis non felis volutpat, pellentesque tellus vel, iaculis odio.
                        </div>
                    </div>

                    <div className="flex justify-center sm:justify-end">
                        <button className="text-white px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 w-24" type="button">
                            Buy
                        </button>
                    </div>
                </div>
            </section>

            <section className="p-3">
                <h2 className="text-center mt-6 text-3xl">Similar motorcycles</h2>
                <div className="mt-6 flex flex-row justify-center flex-wrap">
                    <BikeComponent/>
                    <BikeComponent/>
                    <BikeComponent/>
                    <BikeComponent/>
                </div>
            </section>

            <Footer />
        </div>
    )
}