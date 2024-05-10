const doWork = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("This is result")
        //reject("This is error")
    },2000);
})

doWork.then(data => console.log(data)).catch(err => console.log(err));