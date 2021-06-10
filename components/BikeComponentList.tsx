import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'
import Product from '../src/Product' 

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
        const opts = {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = fetch('/product/', opts)

        response.then((data) => {
            data.json()
            .then((data) => {
                console.log(data)
                this.setState<typeof data.data>({
                    items : data.data
                })
            })
            .catch((err) => console.log('Json' + ' ' + err)
            )
        })
        .catch((err) => console.log(err))

        
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