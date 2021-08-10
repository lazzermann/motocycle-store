import Link from 'next/link'
import Product from 'src/Product'
import React from "react";
import { render } from 'react-dom';
import Review from 'src/Review';
import {Map, List} from 'immutable'
import Router, { withRouter, NextRouter } from 'next/router'

interface MyProps {
  product: Map<string, any>
  reviews : any
  router : NextRouter
}

interface MyState {
  search: string
}

export default class BikeComponent extends React.Component<MyProps, MyState>{

  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  // RouterPushClick(){
  //   Router.push(`/products/${this.props.product.get('_id')}`, undefined, {shallow : true})    
  // }

  render() {
    // console.log('ROUTER',this.props.router)
    // console.log('Bike comp item', this.props.product, this.props.reviews)
    let averageGradeMarkers = []
    

    let averageGradeByReviews = 0
    
    if (this.props.reviews && this.props.reviews.length) {
      averageGradeByReviews =  this.props.reviews && this.props.reviews.reduce((acc, curr) => {
        console.log('acc', acc)
        return acc + curr.get('grade')
      }, 0) / this.props.reviews.length
    }
    

    console.log('averageGradeByReviews',averageGradeByReviews)

    for (let i = 1; i <= 5; i++) {
      if (i <= averageGradeByReviews) {
        averageGradeMarkers.push(<svg className="h-6 w-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>)
      }
      else {
        averageGradeMarkers.push(<svg className="h-6 w-6 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>)
      }
    }

    return (
      <div className="my-2 max-w-xs rounded-md bg-white flex-col sm:mx-10">
        <Link href={`/products/${this.props.product.get('_id')}`}>
          <img  className="rounded-t-md" width="400" height="150" src={this.props.product.get('image')} alt="" />
        </Link>
        <div className="">
          <Link href={`/products/${this.props.product.get('_id')}`}>
            <a className="pl-2 pb-1 font-semibold text-xl">{this.props.product.get('name')}</a>
          </Link>
          <h2 className="pl-2 font-medium text-xl">Price: {this.props.product.get('price')}$</h2>
          
          <div className="text-sm pl-2 pb-3 text-gray-600 mt-2 flex items-center">
            {averageGradeMarkers}
            <span className="ml-2">{this.props.reviews ? this.props.reviews.size : 0 + ' reviews'}</span>
          </div>
        
        </div>
      </div>
    )
  }

}
