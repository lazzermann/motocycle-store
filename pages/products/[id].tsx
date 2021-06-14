import React from "react"
import Router, { withRouter, NextRouter } from 'next/router'
import Layout from '../../components/Layout'
import {xRead} from '../../model'
import ProductModel from '../../src/Product'
import { connect } from 'react-redux'
import {fetchProductById} from '../../models/products'

interface WithRouterProps {
    router: NextRouter,
    item: ProductModel
}

interface IStates{
    item : ProductModel
}

class Product extends React.Component<WithRouterProps, IStates>{
    constructor(props){
        super(props)
        this.state = {
            item : this.props.item
        }
    }

    static async getInitialProps(ctx) {
        console.log('Context : ' + ctx.query.id)
        const res = await xRead(`/product/${ctx.query.id}`)
        return { item: res.data}
    }

    componentDidMount(){
        const {fetchProductById} = this.props
        fetchProductById({uri : `/product/${Router.query.id}`})
    }

    render(){
        console.log(this.state.item)
        let averageGradeMarkers = []
        const prodCategories = this.state.item.category.map((item) => item.name.replace('_', ' ')).join(' - ')
        const reviews = this.state.item.reviews.map((item) => {
            return <Review review={item} />
        })
        
        const averageGradeByReviews = this.state.item.reviews.reduce((acc, curr) =>{
            return acc + curr.grade
        }, 0) / this.state.item.reviews.length

        console.log(averageGradeByReviews)
     
        for(let i = 1; i <= 5; i++){
            if(i <= averageGradeByReviews){
                averageGradeMarkers.push(<svg className="h-6 w-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>)
            }
            else{
                averageGradeMarkers.push(<svg className="h-6 w-6 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>)
            }
        }

        return(
            <Layout>
                <h1 className="mt-10 text-3xl text-center">{this.state.item.name}</h1>
                <section className="mt-4 mx-5 p-4 rounded-md bg-white flex flex-col items-center sm:flex-row sm:shadow-lg">
                    <div className="mx-auto sm:self-start sm:mx-0">
                        <img className="rounded-md w-96 h-52" src={this.state.item.image} alt="" />
                        <div className="mt-2 text-sm text-gray-600 flex items-start sm:justify-center sm:items-center">
                            {averageGradeMarkers}
                            <span className="ml-2 text-lg">{this.state.item.reviews.length} reviews</span>
                        </div>
                    </div>
    
                    
                    <div className="block mt-3 sm:-mt-3 sm:ml-6 sm:w-5/6">
                        <span className="font-bold text-lg">Characteristics :</span>
                        <div className="pt-2">
                            <div className="flex hover:bg-gray-100 w-auto">
                                <h1 className="font-semibold text-lg">Price :</h1>
                                <span className="pl-6 -mt-0.5 text-2xl">{this.state.item.price} $</span>
                            </div>
                            <div className="flex hover:bg-gray-100 w-auto">
                                <h1 className="font-semibold text-lg">Type :</h1>
                                <span className="pl-6 -mt-0.5 text-2xl">{prodCategories}</span>
                            </div>
                        </div>
    
                        <div className="border-t-2 mt-2 border-gray-500">
                            <div className="my-4">
                                {this.state.item.description}
                            </div>
                        </div>
    
                        <div className="flex justify-center sm:justify-end">
                            <button className="text-white px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 w-24" type="button">
                                Buy
                            </button>
                        </div>
                    </div>
                </section>
    

                <section className="p-3 rounded-lg justify-center">
                    <h2 className="mt-2 text-4xl text-center">Reviews</h2>
                    {reviews}
                </section>


                {/* <section className="p-3">
                    <h2 className="text-center mt-6 text-3xl">Similar motorcycles</h2>
                    <div className="mt-6 flex flex-row justify-center flex-wrap">
                        
                    </div>
                </section> */}
        </Layout>            
        )}
}

const mapStateToProps = (state) => {
    const { products } = state;
    return {
        
    };
};

export default connect(mapStateToProps, { fetchProductById  })(Product);

// export default Product
