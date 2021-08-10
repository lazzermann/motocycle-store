import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'
import Product from '../src/Product' 
import { connect } from 'react-redux'
import {fetchProducts} from '../redux/models/products'
import {xRead} from '../module'
import {isEmpty} from '../src/common'
import { Reviews } from "src/Review"
import {Map, List} from 'immutable'

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
        const {products, reviews} = this.props

        return(
        <div className="px-4 py-2  my-4 flex flex-row flex-wrap justify-center">
            {
                products && products.valueSeq().map((prod: any) =>{
                    let revs = prod.get('reviews').toArray().length !== 0 ?
                        prod.get('reviews').toArray().map((x) => reviews.get(x)) : null
                    return <BikeComponent product={prod} reviews={revs} key={prod._id} />
                }
                )
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { entities } = state;
    return {
        products : !isEmpty(entities) && entities.get('product'),
        reviews : !isEmpty(entities) && entities.get('reviews')
    };
};

export default connect(mapStateToProps, { fetchProducts  })(BikeComponentList);