import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'
import Product from '../src/Product' 
import { connect } from 'react-redux'
import {fetchProducts} from '../redux/models/products'
import {xRead} from '../module'

interface IProps{
    fetchProducts: () => void;
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
        const {fetchProducts} = this.props
        fetchProducts()
    }

    render(){
        const {product} = this.props
        console.log("product list",product)
        // const bikeComps = product.length ? product.map((item) =>  <BikeComponent product={item} key={item._id.toString()} /> ) : []
        let bikeComps = []
        for(let i in product){
            if(product.hasOwnProperty(i)){
                bikeComps.push(<BikeComponent product={product[i]} key={product[i]._id.toString()} />)
            }
        }
        return(
        <div className="px-4 py-2  my-4 flex flex-row flex-wrap justify-center">
            {bikeComps}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { product } = state;
    return {
        product
    };
};

export default connect(mapStateToProps, { fetchProducts  })(BikeComponentList);