const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(0);
    },2000);
})

promise.then((data)=>{
    console.log(data);
    return data + 1;
}).then((data)=>{
    console.log(data);
    return data + 2;
}).then((data)=>{
    console.log(data);
    return data + 3;
}).then((data)=>{
    console.log(data);
    return data + 4;
}).then(data => console.log(data)).catch(err => console.log(err));