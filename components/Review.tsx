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

        return (
            // <div className="mt-6 bg-white rounded-lg py-4 px-4 flex flex-row  shadow-lg">
            // <div className="sm:flex">
            //     <div className="sm:mt-1">
            //         <img className="mx-auto min-w-11 sm:mx-0 w-11 h-11 object-cover" src={this.state.image} />
            //     </div>
            //     <div className="sm:ml-3">
            //         <h4 className="text-center sm:text-left text-lg font-semibold">
            //             {this.state.firstName}
            //         </h4>
            //         <div className="text-center">
            //         </div>

            //         {/* justify-center sm:justify-start */}
            //         <div className="mt-2 text-sm text-gray-600 flex items-center ">
            //             {reviewGrade}
            //         </div>
            //     </div>
            // </div>

            // <div className="ml-4 mt-0.5 text-center sm:text-left">
            //     {this.state.text}
            // </div>

            <div className="mt-6 bg-white rounded-lg py-4 px-4 shadow-lg">
                <div className="flex flex-row">
                    <div className="flex flex-col  items-center">
                            <img className="mx-auto min-w-11 sm:mx-0 w-11 h-11 object-cover resize-none self-center" src={this.state.image} />
                            <div>
                                <h4 className="text-center sm:text-left text-lg font-semibold ">
                                    {this.state.firstName}
                                </h4>
                            </div>

                            <div className="ml-1 flex flex-row justify-center">
                                {reviewGrade}
                            </div>
                    </div>
                    {/* w-3/4 h-full */}
                    <div className="ml-4"> 
                        <div className="flex">
                            <div className="relative">
                                {this.state.text}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">

                </div>
            </div>

        )
    }
}