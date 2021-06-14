import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'
import Product from '../src/Product' 
import { connect } from 'react-redux'
import {fetchProducts} from '../models/products'
import {xRead} from '../model'

interface IProps{

}
interface IState{
    items: Array<Product>
}

export class BikeComponentList extends React.Component<IProps, IState>{

    constructor(props){
        super(props)

        this.state = {
            items : []
        }
    }

    componentDidMount(){
        // let data = xRead('/product/').then((data)=>{
        //     if(!data.res.ok){

        //     }

        //     else{
        //     this.setState<typeof data.json.data>({
        //         items : data.json.data
        //     })
        // }
        // })

        const {fetchProducts} = this.props
        fetchProducts()
    }

    render(){
        const {products} = this.props
        console.log("product list",products)
        const bikeComps = []
        // products ? products.map((item) =>  <BikeComponent product={item} key={item._id.toString()} /> ) : []
        return(
        <div className="px-4 py-2  my-4 flex flex-row flex-wrap justify-center">
            {bikeComps}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { products } = state;
    return {
        products
    };
};

export default connect(mapStateToProps, { fetchProducts  })(BikeComponentList);