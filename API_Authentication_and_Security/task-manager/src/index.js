const express = require("express");
const app = express();
const port = 3000;
require("./db/mongoose");




const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const userAuthRouter = require("./routers/userAuthRouter");
const taskAuthRouter = require("./routers/taskAuthRouter");

//parse JSON into javascript obj
app.use(express.json());
//self made middleware fn
// app.use((req,res,next)=>{
//     res.status(503).send("under maintanance");
// })

//register routers
app.use(userRouter);
//app.use(taskRouter);
app.use(userAuthRouter);
app.use(taskAuthRouter)


app.listen(port, () => {
    console.log("Listing at ", port);
})

//Password protection by Hashing Algo. (see diff btn Hashi Algo vs encrypted Algo)
/* encrypted algo reversible. 
    e.g -> passwrd => "saikat", encrypt => "jkjsijjir", revers =>"saikat"
Hashing Algo irrreversible.
*/
// const bcryptjs = require("bcryptjs");

// const passwordManager = async () => {

//     let password = "saikat"
//     let hashPassword = await bcryptjs.hash(password, 8);
//     let isMatch = await bcryptjs.compare("saikat!", hashPassword);
//     console.log(hashPassword);
//     console.log("isMatch ", isMatch);
// }

// passwordManager();

//Jeson Web Token :- Use for authentication
// const jwt = require("jsonwebtoken");

// const auth = function (){
//     const token = jwt.sign({_id:"saikat12"},'nodejs12');
//     console.log("auth token --> ",token);

//     const token_verify = jwt.verify(token,'nodejs12');
//     console.log("token verify -->",token_verify);
// }

// auth();

//--- A demo of mongooes poplulate
// const Task = require("./models/taskModel");
//const User = require("./models/userModel")

//async function main(){
   // const task = await Task.findById("66d1eac74888777d01b5a83e");
    //await task.populate('author');
    //const user = await User.findById("66d2f1673f2451b1d82bcd34");
    //await user.populate('task');
    //console.log(user.task);
    
//}
//main();


