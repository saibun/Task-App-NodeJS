/*
Promise.race() is another method in JavaScript for handling multiple promises. However, unlike Promise.all() which waits for all promises to settle (either resolve or reject), Promise.race() returns a single promise that settles as soon as one of the input promises settles, either by resolving or rejecting.
Once it get quick one it ignore all ther Promises.
*/
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("First promise...");
    },1000);
})
const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("2nd promise...");
    },2000);
})
const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("3rd promise...")
        reject("reject 3rd promise...");
    },3000);
})
const promise4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("4th promise...");
    },4000);
})
const promise5 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("5th promise...");
    },0);
})

Promise.race([promise1,promise2,promise3,promise4,promise5]).then( data => console.log(data)).catch( err => console.log(err));