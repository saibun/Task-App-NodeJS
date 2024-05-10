//create function that take time as argument and return a promise which will resolve after that particular time.
function delay (ms){
    return new Promise( resolve => setTimeout(resolve("This is Promise 2"), ms));
}

//in promise race method pass delay func and another one which will execute after 2000ms 
Promise.race([
    new Promise(resolve => {
        setTimeout(()=>{
            resolve("This is promise 1")
        },0);
    }),
    delay(4000)
]).then( data => console.log(data)).catch( err => console.log(err));

// Output --> This is Promise 2

// Reason --> When you directly call resolve("This is Promise 2") inside setTimeout, it doesn't wait for the specified timeout period provided to the delay function. Instead, it immediately resolves the promise with the value "This is Promise 2", effectively ignoring the delay.The purpose of setTimeout is to execute the provided function after a certain delay specified in milliseconds. So, when you directly call resolve inside setTimeout, it executes immediately, regardless of the timeout period you've specified in the delay function