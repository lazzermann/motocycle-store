import BikeComponentList from '../../components/BikeComponentList'
import Layout from '../../components/Layout'
import React from "react"
import saga from "redux/decorators/saga"
import { connect } from 'react-redux'
import { withRouter, NextRouter } from 'next/router'
import ProductEntity from "redux/models/products"
import { isEmpty } from 'src/common'
import { route } from 'awilix-router-core'
import wrapper from '../../redux/store';

interface Props {
    fetchBySearch: (data : any) => void
    router: NextRouter
}

interface States{
}
@saga(ProductEntity)
class SearchPage extends React.Component<Props, States>{
    constructor(props){
        super(props)
    }

    // componentDidMount(){
    //     const { fetchBySearch } = this.props
    //     fetchProductById({productId : this.props.router.query.id})
    // }

    public static getInitialProps = wrapper.getInitialAppProps(store => ({ query }) => {
        console.log('Store', store)
        
        store.dispatch(ProductEntity.getTriggers().fetchBySearch({ searchName: query?.value }));
    });

    componentDidUpdate(){

    }

    render(){
        return(
        <Layout>
            <section>

            </section>
        </Layout>
        )
    }
}

const mapStateToProps = (state, props) =>{
    const {entities} = state
    const {router} = props
    console.log('Search page entities', entities)
    
    const product = !isEmpty(entities) && entities.getIn('product')
    if(product){
        const reviews = entities.get('reviews')

    }
}

const searchPage = connect(mapStateToProps, ProductEntity.getTriggers())(SearchPage)
export default withRouter(searchPage)