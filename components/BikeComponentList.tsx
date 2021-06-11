import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'
import Product from '../src/Product' 
import {xRead} from '../model'

interface IProps{

}
interface IState{
    items: Array<Product>
}

export default class BikeComponentList extends React.Component<IProps, IState>{

    constructor(props){
        super(props)

        this.state = {
            items : []
        }
    }

    componentDidMount(){
        // const opts = {
        //     method : 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // }
        // const response = fetch('/product/', opts)

        // response.then((data) => {
        //     data.json()
        //     .then((data) => {
        //         console.log(data)
        //        
        //     })
        //     .catch((err) => console.log('Json' + ' ' + err)
        //     )
        // })
        // .catch((err) => console.log(err))

        let data = xRead('/product/').then((data)=>{
            if(!data.res.ok){

            }

            else{
            this.setState<typeof data.json.data>({
                items : data.json.data
            })
        }
        })

   
        // console.log('xRead ' + data)
        // console.log(document.cookie)
    }


    render(){
    const bikeComps = this.state.items.map((item) =>  <BikeComponent product={item} key={item._id.toString()} /> )
    return(
    <div className="px-4 py-2  my-4 flex flex-row flex-wrap justify-center">
        {bikeComps}
    </div>
    )
    }
}