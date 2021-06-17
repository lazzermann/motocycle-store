import React from "react"
import Router, { withRouter, NextRouter } from 'next/router'
import Layout from '../../components/Layout'
import {xRead} from '../../module'
import ProductModel from '../../src/Product'
import Review from '../../components/Review'
import { connect } from 'react-redux'
import {fetchProductById} from '../../redux/models/products'
import {isEmpty} from '../../src/common'
import { List, Map } from 'immutable'
interface WithRouterProps {
    router: NextRouter,
    product: Map<string, any>,
    reviews: Map<string, any>,
    categories: Map<string, any>,
    users: Map<string, any>,
    fetchProductById: (id: string | string[]) => void;
}

interface IStates{
}

class Product extends React.Component<WithRouterProps, IStates>{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){        
        const {fetchProductById} = this.props
        fetchProductById(this.props.router.query.id)
    }

    render(){
        const { product, reviews, categories, users } = this.props;
        console.log('Cat', categories);
        const reviewItems = reviews ? reviews.valueSeq().map(
            (item) => { 
                console.log('User ID = ', item.get('user'));
                console.log('User Item = ', users.get(item.get('user')));

                return <Review key={item.get('_id')} review={item} user={users && users.get(item.get('user'))} /> 
            }
        ) : []
        const averageGradeByReviews = reviews ? reviews.reduce((acc, curr) =>acc + curr.get('grade'), 0) / reviews.size : 0;

     
        const averageGradeMarkers = Array.from([1,2,3,4,5])
            .map(i => {
                const color = i <= averageGradeByReviews ? 'green' : 'gray';
                return <svg key={'grade_svg_' + i} className={`h-6 w-6 fill-current text-${color}-500`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>;
            }); 

        return(
            <Layout>
                <h1 className="mt-10 text-3xl text-center">
                    {product && product.get('name')}
                </h1>
                <section className="mt-4 mx-5 p-4 rounded-md bg-white flex flex-col items-center sm:flex-row sm:shadow-lg">
                    <div className="mx-auto sm:self-start sm:mx-0">
                        
                        <img className="rounded-md w-96 h-52" src={product ? product.get('image') : ''} alt="" />
                        <div className="mt-2 text-sm text-gray-600 flex items-start sm:justify-center sm:items-center">
                            {averageGradeMarkers}
                            <span className="ml-2 text-lg">
                                {reviews && reviews.size } 
                            reviews</span>
                        </div>
                    </div>
    
                    
                    <div className="block mt-3 sm:-mt-3 sm:ml-6 sm:w-5/6">
                        <span className="font-bold text-lg">Characteristics :</span>
                        <div className="pt-2">
                            <div className="flex hover:bg-gray-100 w-auto">
                                <h1 className="font-semibold text-lg">Price :</h1>
                                <span className="pl-6 -mt-0.5 text-2xl">
                                    {product && product.get('price') } 
                                    $</span>
                            </div>
                            <div className="flex hover:bg-gray-100 w-auto">
                                <h1 className="font-semibold text-lg">Type :</h1>
                                <span className="pl-6 -mt-0.5 text-2xl">
                                {
                                    categories && categories.reduce((a, v) => {console.log(v.get('name')); return(a ? '-' : '') + v.get('name')}, '')
                                }
                                </span>
                            </div>
                        </div>
    
                        <div className="border-t-2 mt-2 border-gray-500">
                            <div className="my-4">
                                { product && product.get('description') }
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
                    {reviewItems}
                </section>


                <section className="p-3">
                    <h2 className="text-center mt-6 text-3xl">Similar motorcycles</h2>
                    <div className="mt-6 flex flex-row justify-center flex-wrap">
                        
                    </div>
                </section>
        </Layout>            
        )}
}

const mapStateToProps = (state, props) => {
    let users = null;
    const { entities } = state;
    const {router} = props
   
    let reviews = null;
    let categories = null;
    const product = !isEmpty(entities) && entities.getIn(['product', router.query.id]);
    if (product) {
        const ar = entities.get('reviews');
        reviews = product
            .get('reviews')
            .reduce((accum, data) => (ar.get(data) ? accum.push(ar.get(data)) : accum), List())

        const ct = entities.get('category');
        categories = product
            .get('category')
            .reduce((accum, data) => (ct.get(data) ? accum.push(ct.get(data)) : accum), List())

        const u = entities.get('user');
        users = reviews
            .map(r => r.get('user'))
            .reduce((accum, key) => (u.get(key) ? accum.set(key, u.get(key)) : accum), Map())
        
    }
    return {
        product,
        reviews,
        categories,
        users,
    };
};

const idPage =  connect(mapStateToProps, { fetchProductById  })(Product);
export default withRouter(idPage)
// export default Product
