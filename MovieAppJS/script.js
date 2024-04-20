//initial refrences
// Api key
alert("hello");
console.log("test");
let movieNameRef=document.getElementById("movie-name");
let searchBtn =document.getElementById("search-btn");
let result=document.getElementById("result");

//function to do fetch data from api
let getMovie =()=>{
    let movieName =movieNameRef.value;
    console.log(movieName);
let url="http://www.omdbapi.com/?i=tt3896198&apikey=892fc0a5"
    // let url =`https://www.omdbapi.com/?i=${movieName}&apikey=${key}`;
   
    
    // if input field empty
    if(movieName.length<=0){
        result.innerHTML=`<h3 class="msg">Please Enter a Movie Name</h3>`;
    }
    // if input field is not empty
    else{
        fetch(url).then(resp=>resp.json()).then((data)=>{
            console.log(data);
        })
    }
}
searchBtn.addEventListener("click",getMovie);