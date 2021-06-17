import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'
import Product from '../src/Product' 
import { connect } from 'react-redux'
import {fetchProducts} from '../redux/models/products'
import {xRead} from '../module'
import {isEmpty} from '../src/common'

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
        console.log('Comp did mount bike comp list')
        
        const {fetchProducts} = this.props
        fetchProducts()
    }

    render(){
        const {products, reviews} = this.props
        console.log('Props products from redux',products)
        
        // if(products !== undefined){
        //     console.log("product list",entities.product)
        //     // const bikeComps = product.length ? product.map((item) =>  <BikeComponent product={item} key={item._id.toString()} /> ) : []
        //     for(let i in entities.product){
        //         if(entities.product.hasOwnProperty(i)){
        //             bikeComps.push(<BikeComponent product={entities.product[i]} key={entities.product[i]._id.toString()} />)
        //         }
        //     }
        // }
        return(
        <div className="px-4 py-2  my-4 flex flex-row flex-wrap justify-center">
            {
                products && products.valueSeq().map((product: any, i: number) =>
                    <BikeComponent product={product} key={product._id} />
                )
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { entities } = state;
    return {
        products : !isEmpty(entities) && entities.get('product')
    };
};

export default connect(mapStateToProps, { fetchProducts  })(BikeComponentList);