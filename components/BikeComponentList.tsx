import dynamic from "next/dynamic"
import React from "react"
import BikeComponent from './BikeComponent'

interface IProps{

}
interface IState{

}

export default class BikeComponentList extends React.Component<IProps, IState>{

    constructor(props){
        super(props)

        this.state = {
            items : []
        }
    }

    componentDidMount(){
        const opts = {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = fetch('/product/', opts)

        response.then((data) => {
            data.json()
            .then((data) => {
                console.log(data)
                this.setState({
                    items : data.data
                })
            })
            .catch((err) => console.log('Json' + ' ' + err)
            )
        })
        .catch((err) => console.log(err))

        
    }


    render(){
    const bikeComps = this.state.items.map((item) =>{
        console.log(item)
        return <BikeComponent key={item._id.toString()} 
        product={{
            name : item.name,
            image : item.image,
            price : item.price,
            reviewsCount : item.reviews.length
        }}/>
    })

    return(
    <div className="px-4 py-2  my-4 flex flex-row flex-wrap justify-center">
        {bikeComps}
    </div>
    )
    }
}