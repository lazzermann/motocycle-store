export default function BikeComponent(){
    return(
        <div className="my-2 max-w-xs rounded-md bg-white flex-col sm:mx-4">
            <img className="rounded-t-md" width="400" height="200" src="http://placeimg.com/640/360/any" alt="" />
            <div className="">
              <h4 className="pl-2 pb-1 font-semibold text-xl">Bike</h4>
              <h2 className="pl-2 font-medium text-xl">Price: 2000$</h2>
              <h2 className="pl-2 font-medium text-lg">Year: 2007</h2>
              <div className="text-sm pl-2 pb-3 text-gray-600 mt-2 flex items-center">
                  <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                  <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                  <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                  <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                  <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                  <span className="ml-2">34 reviews</span>
              </div>
            </div>
          </div>
    )
}