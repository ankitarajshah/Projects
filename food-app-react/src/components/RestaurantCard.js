 import { IMG_CDN_URL } from "../config"
 
 const RestaurantCard=({cloudinaryImageId,name,cuisines,avgRating})=>{
            // const{cloudinaryImageId,name,cuisines,avgRating} =restaurant.info;
            // console.log(restaurant);
            return(
              <div className='card'>
                <img src={IMG_CDN_URL+cloudinaryImageId}/>
                <h2>{name}</h2>
                <h3>{cuisines.join(",")}</h3>
                <h4>{avgRating} stars</h4>
              </div>
            )
          }

export default RestaurantCard