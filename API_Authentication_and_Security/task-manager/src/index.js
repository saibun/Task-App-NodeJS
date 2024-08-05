const express = require("express");
const app = express();
const port = 3000;
require("./db/mongoose");




const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

//parse JSON into javascript obj
app.use(express.json());

//register routers
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log("Listing at ", port);
})

//Password protection by Hashing Algo. (see diff btn Hashi Algo vs encrypted Algo)
/* encrypted algo reversible. 
    e.g -> passwrd => "saikat", encrypt => "jkjsijjir", revers =>"saikat"
Hashing Algo irrreversible.
*/
const bcryptjs = require("bcryptjs");

const passwordManager = async () => {

    let password = "saikat"
    let hashPassword = await bcryptjs.hash(password, 8);
    let isMatch = await bcryptjs.compare("saikat!", hashPassword);
    console.log(hashPassword);
    console.log("isMatch ", isMatch);
}

passwordManager();

//Jeson Web Token :- Use for authentication
const jwt = require("jsonwebtoken");

const auth = function (){
    const token = jwt.sign({_id:"saikat12"},'nodejs12');
    console.log("auth token --> ",token);

    const token_verify = jwt.verify(token,'nodejs12');
    console.log("token verify -->",token_verify);
}

auth();


