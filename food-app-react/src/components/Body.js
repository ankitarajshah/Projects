import { restaurantList } from '../config.js';
import RestaurantCard from"./RestaurantCard.js"
const Body=()=>{
    return (
    <>
    
     {/* <h2>Body</h2> */}
    {/* {Data.map(data=><p key="name">{data.name}</p>)} */}
    <div className='search-container'>
        <input type='text' className='search-input' placeholder='search' value=""/>
        <button>Search</button>
    </div>
    <div className='restaurant-list'>
      {restaurantList.map((restaurant)=>{
        return <RestaurantCard  {...restaurant.info} key={restaurant.info.id}/>
      })}
    </div>
     </>
    )
  };

  export default Body;