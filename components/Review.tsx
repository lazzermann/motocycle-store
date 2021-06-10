import React from "react"

interface IProps {
    review: any
}
interface IState {
    image: string,
    text: string,
    firstName: string,
    lastName: string,
    grade: number
}

export default class Review extends React.Component<IProps, IState>{
    constructor(props) {
        super(props)

        this.state = {
            image: this.props.review.image,
            text: this.props.review.text,
            firstName: this.props.review.firstName,
            lastName: this.props.review.lastName,
            grade: this.props.review.grade
        }
    }

    render() {
        let reviewGrade = []
        for (let i = 1; i <= 5; i++) {
            if (i <= this.props.review.grade) {
                reviewGrade.push("text-green-500")
            }
            else {
                reviewGrade.push("text-gray-500")
            }
        }
        reviewGrade = reviewGrade.map((rateMarkColor) => {
            let classValue = `h-4 w-4 fill-current ${rateMarkColor}`
            console.log(classValue)
            return <svg className={classValue} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
        })

        console.log(this.state.text)
        

        return (
            // <div className="mt-6 bg-white rounded-lg py-4 px-4 shadow-lg">
            //     <div className="flex flex-row">
            //         <div className="flex flex-col  items-center">
            //                 <img className="mx-auto min-w-11 sm:mx-0 w-11 h-11 object-cover resize-none self-center" src={this.state.image} />
            //                 <div>
            //                     <h4 className="text-center sm:text-left text-lg font-semibold ">
            //                         {this.state.firstName}
            //                     </h4>
            //                 </div>

            //                 <div className="ml-1 flex flex-row justify-center">
            //                     {reviewGrade}
            //                 </div>
            //         </div>
            //         {/* w-3/4 h-full */}
            //         <div className="ml-4"> 
            //             <div className="flex">
            //                 <div className="relative">
            //                     {this.state.text}
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="flex">

            //     </div>
            // </div>


            <div className="mt-12 mx-24 flex flex-col bg-white  rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="py-4 pl-4">
                            <div className = "flex flex-col items-center">
                                <img className="h-20 w-20 object-cover justify-center" src={this.state.image} alt="" />
                                <div className = "text-center text-opacity-90 text-gray-700 text-sm ml-0.5">{this.state.firstName}</div>
                                <div className = "flex flex-row mt-2 text-opacity-60 text-gray-700 text-xs ml-0.5">{reviewGrade}</div>
                            </div>
                        </div>
                        <div className = "pt-4 px-8 mb-4 h-full items-start">
                            <div className="justify-end">
                                {this.state.text}
                            </div>
                        </div>
                    </div>
            </div> 

        )
    }
}

 