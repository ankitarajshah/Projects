import './App.css';
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js"

import {IMG_CDN_URL} from "./config.js"


const Data =[{
  name:"Ankita",
  des:"Engineer",
}]

const burgerKing={
  name:"Burger King",
  image:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks/120515775A.png',
  cusines:["Burger", "American"],
  rating:"4.2"
}

function App() {
  return (
   <>
    <Header/> 
    <Body/>
    <Footer/>
   </>
  );
}

export default App;
