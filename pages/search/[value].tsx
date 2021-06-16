import {xRead} from '../../module'
import ProductModel from '../../src/Product'
import BikeComponentList from '../../components/BikeComponentList'
import Layout from '../../components/Layout'
import React from "react"

interface Props {
    items: ProductModel[]
}

interface States{
    items : ProductModel[]
}

class SearchPage extends React.Component<Props, States>{
    constructor(props){
        super(props)
        this.state = {
            items : this.props.items
        }
    }

    static async getInitialProps(ctx) {
        console.log('Context : ' + ctx.query.value)
        const res = await xRead(`/product/search/${ctx.query.value}`)
        console.log(res.data)
        return { items: res.data}
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

export default SearchPage