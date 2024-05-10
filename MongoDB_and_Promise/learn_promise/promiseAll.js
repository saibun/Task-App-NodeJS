//Promise.all() is a method in JavaScript that takes an array of promises as input and returns a single promise. This returned promise will fulfill when all of the input promises have been fulfilled, or reject immediately if any of the input promises are rejected.

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
    },5000);
})

Promise.all([promise1,promise2,promise3,promise4,promise5]).then( data => console.log(data)).catch( err => console.log(err));

// promise1.then(data => console.log(data)).catch( err => console.log(err));
// promise2.then(data => console.log(data)).catch( err => console.log(err));
// promise3.then(data => console.log(data)).catch( err => console.log(err));
// promise4.then(data => console.log(data)).catch( err => console.log(err));
// promise5.then(data => console.log(data)).catch( err => console.log(err));