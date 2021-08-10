import React from "react"
import Router, { withRouter, NextRouter } from 'next/router'
import Layout from '../../components/Layout'
import { xRead } from '../../module'
import ProductModel from '../../src/Product'
import Review from '../../components/Review'
import { connect } from 'react-redux'
import { fetchProductById } from '../../redux/models/products'
import { isEmpty } from '../../src/common'
import { List, Map } from 'immutable'
import BikeComponent from "../../components/BikeComponent"
interface WithRouterProps {
    router: NextRouter,
    product: Map<string, any>,
    reviews: Map<string, any>,
    categories: Map<string, any>,
    users: Map<string, any>,
    similarProducts: List<any>,
    reduxReviews: Map<string, any>,
    fetchProductById: (id: string | string[]) => void;
}

interface IStates {
    productId: string | string[]
}

class Product extends React.Component<WithRouterProps, IStates>{
    constructor(props) {
        super(props)
        this.state = {
            productId: this.props.router.query.id
        }
    }

    // static async getInitialProps(ctx) {
    //     console.log('getInitialProps')

    //     return await fetchProductById(ctx.query.id)
    // }


    componentDidMount() {
        // console.log('[ID] DID MOUNT')

        const { fetchProductById } = this.props
        fetchProductById(this.props.router.query.id)
        console.log('fetchProductById')
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('STATE DID UPDATE', this.state.productId)

        if (prevState.productId !== this.props.router.query.id) {
            this.setState({productId : this.props.router.query.id})
            const { fetchProductById } = this.props
            fetchProductById(this.props.router.query.id)
        }
    }

    render() {
        const { product, reviews, categories, users, similarProducts, reduxReviews } = this.props;
        console.log('reviews', reviews)
        const reviewItems = reviews ? reviews.valueSeq().map(
            (item) => {
                return <Review key={item.get('_id')} review={item} user={users && users.get(item.get('user'))} />
            }
        ) : []
        const averageGradeByReviews = reviews ? reviews.reduce((acc, curr) => acc + curr.get('grade'), 0) / reviews.size : 0;

        const averageGradeMarkers = Array.from([1, 2, 3, 4, 5])
            .map(i => {
                const color = i <= averageGradeByReviews ? 'green' : 'gray';
                return <svg key={'grade_svg_' + i} className={`h-6 w-6 fill-current text-${color}-500`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>;
            });

        return (
            <Layout>
                <h1 className="mt-10 text-3xl text-center">
                    {product && product.get('name')}
                </h1>
                <section className="mt-4 mx-5 p-4 rounded-md bg-white flex flex-col items-center sm:flex-row sm:shadow-lg">
                    <div className="mx-auto sm:self-start sm:mx-0">

                        <img className="rounded-md w-96 h-52" src={product ? product.get('image') : ''} alt="" />
                        <div className="mt-2 text-sm text-gray-600 flex items-start sm:justify-center sm:items-center">
                            {averageGradeMarkers}
                            <span className="mt-1 ml-2 text-lg">
                                {reviews && reviews.size + ' reviews'}
                            </span>
                        </div>
                    </div>


                    <div className="block mt-3 sm:-mt-3 sm:ml-6 sm:w-5/6">
                        <span className="font-bold text-lg">Characteristics :</span>
                        <div className="pt-2">
                            <div className="flex hover:bg-gray-100 w-auto">
                                <h1 className="font-semibold text-lg">Price :</h1>
                                <span className="pl-6 -mt-0.5 text-2xl">
                                    {product && product.get('price') + ' $'}
                                </span>
                            </div>
                            <div className="flex hover:bg-gray-100 w-auto">
                                <h1 className="font-semibold text-lg">Type :</h1>
                                <span className="pl-6 -mt-0.5 text-2xl">
                                    {
                                        categories && categories.map((category) => category.get('name')).join(' - ')
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="border-t-2 mt-2 border-gray-500">
                            <div className="my-4">
                                {product && product.get('description')}
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
                        {
                            similarProducts && similarProducts.valueSeq().map(simProd => {
                                console.log('SimProdInMap:',  simProd)
                                console.log('RewIdList:',simProd.get('reviews').toArray())
                                
                                let similarRevs = simProd.get('reviews').toArray().length !== 0 ?
                                    simProd.get('reviews').toArray().map((x) => reduxReviews.get(x)) : null

                                    console.log('similarRevs', similarRevs)
                                    
                                return <BikeComponent product={simProd} reviews={similarRevs} />
                            })
                        }
                    </div>
                </section>
            </Layout>
        )
    }
}

const mapStateToProps = (state, props) => {
    let users = null;
    const { entities } = state;
    const { router } = props

    let reviews = null
    let categories = null
    let similarProducts = null
    let reduxReviews = null

    const product = !isEmpty(entities) && entities.getIn(['product', router.query.id]);
    if (product) {
        const ar = entities.get('reviews');
        reviews = product
            .get('reviews')
            .reduce((accum, data) => (ar.get(data) ? accum.push(ar.get(data)) : accum), List())

        const ct = entities.get('category');
        categories = product
            .get('category')
            .reduce((accum, data) => (ct.get(data) && !accum.includes(ct.get(data)) ? accum.push(ct.get(data)) : accum), List())

        const u = entities.get('user');
        users = reviews
            .map(r => r.get('user'))
            .reduce((accum, key) => (u.get(key) ? accum.set(key, u.get(key)) : accum), Map())

        const pd = entities.get('product')
        similarProducts = pd
            .filter(prod => {
                return (prod.get('price') - 200) > 0 && (prod.get('_id') !== product.get('_id')) ? (prod.get('price') > product.get('price') - 200 && prod.get('price') < product.get('price') + 250) : false
            })
        

        let random = similarProducts.keySeq().toArray()
        random.sort()
        random = random.reduce((acc, id) => acc.push(similarProducts.get(id)), List())
        // random.sort((a, b) => b.get('price') - a.get('price'))
        similarProducts = random.reduce((accum, item) => {
            return accum.size < 4 ? accum.push(item) : accum
        }, List())
        
        // similarProductsReviewsMap = similarProducts && similarProducts.valueSeq().reduce((acc,prod) =>{
        //     console.log('acc', prod)

        //     return acc.push( ar.reduce((accum, simProdRev) => {
        //         return prod.get('reviews').includes(simProdRev.get('_id')) ? accum.set(simProdRev.get('_id'),simProdRev) : accum
        //     }, Map()), List())

        // })
        reduxReviews = entities.get('reviews')
    }
    return {
        product,
        reviews,
        categories,
        users,
        similarProducts,
        reduxReviews
    };
};

const idPage = connect(mapStateToProps, { fetchProductById })(Product);
export default withRouter(idPage)
