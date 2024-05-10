//GET Method by default
//fetch("https://jsonplaceholder.typicode.com/posts/1").then( response => response.json()).then( data => console.log(data)).catch( err => console.log(err));

//Post Method
//fetch("https://jsonplaceholder.typicode.com/posts",{
//     method:"POST",
//     body: JSON.stringify({
//         userId: 11,
//         id: 11,
//         title: 'Practice',
//         body: 'Parctice with fatch api'
//     }),
//     headers: {
//         'Content-type':'application/json'
//     }
// }).then( data => console.log(data)).catch( err => console.log(err))

//PATCH Method
// fetch("https://jsonplaceholder.typicode.com/posts/11",{
//     method:"PATCH",
//     body: JSON.stringify({
//         userId: 11,
//         id: 11,
//         title: 'Practice',
//         body: 'Parctice with fatch api'
//     }),
//     headers: {
//         'Content-type':'application/json'
//     }
// }).then( data => console.log(data)).catch( err => console.log(err))

//DELETE Method
fetch("https://jsonplaceholder.typicode.com/posts/11",{method:"DELETE"}).then( data => console.log(data)).catch( err => console.log(err));