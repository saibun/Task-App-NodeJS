const doWork = (callback)=>{
    setTimeout(()=>{
        //callback('This is an error',undefined);
        callback(undefined,"This is result");
    },2000);
}

doWork((err,result)=>{
    if(err){
        return console.log(err);
    }
    console.log(result)
})
