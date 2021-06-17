import { Map } from "immutable"
import React from "react"

interface IProps {
    review: Map<string, any>
    user: Map<string, any>
}
interface IState {
    image: string,
    text: string,
    firstName: string,
    lastName: string,
    grade: number
}

export default class Review extends React.Component<IProps, IState>{

    render() {
        const { review, user } = this.props;
        
        console.log('Review', review, user);
        const reviewGrade = Array.from([1,2,3,4,5])
        .map(i => {
            const color = i <= review.get('grade') ? 'green' : 'gray';
            return <svg key={'review_svg_' + i} className={`h-6 w-6 fill-current text-${color}-500`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>;
        }); 

        return (
            <div className="mt-12 mx-24 flex flex-col bg-white  rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="py-4 pl-4 self-start">
                            <div className = "flex flex-col items-center">
                                <img className="h-20 w-20 object-cover justify-center" src={user ? user.get('image') : ''} alt="" />
                                <div className = "text-center text-opacity-90 text-gray-700 text-sm ml-0.5">{user && user.get('firstName')}</div>
                                <div className = "flex flex-row mt-2 text-opacity-60 text-gray-700 text-xs ml-0.5">{reviewGrade}</div>
                            </div>
                        </div>
                        <div className = "pt-4 px-8 mt-1.5 h-full items-start self-start">
                            <div className="justify-end">
                                {review && review.get('text')}
                            </div>
                        </div>
                    </div>
            </div> 

        )
    }
}