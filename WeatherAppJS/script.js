alert("add")
// const apiKey="607dda1d72cffc48c26a4651dc71b281";
// const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=607dda1d72cffc48c26a4651dc71b281";
// const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID={apiKey}`;
// const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore";

// const weather = async function checkWeather(){
//     // const response = await fetch(apiUrl+`&appid=${apiKey} `);
//     const response = await fetch("https://https://freetestapi.com/api/v1/weathers");
//     const data = response.json();
//     console.log(data);
//     return data;
// }
// checkWeather();
const response =  fetch("https://freetestapi.com/api/v1/weathers").then(response=>{
    const data = response.json();
    console.log(data);
})
console.log(response);    

    