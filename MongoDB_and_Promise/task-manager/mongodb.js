//either use destructure method to grab multiple .
const {MongoClient, ObjectId} = require('mongodb');

//or require one by one
//const mongodb = require('mongodb');
//const MongoClient = mongodb.MongoClient;
//const ObjectId = mongodb.ObjectId;

/*
 * MongoClient is a class provided by the MongoDB Node.js driver. Its purpose is to facilitate (make easy) connections to MongoDB servers from Node.js applications. 
 * In code, you use MongoClient to connect to a MongoDB server, access databases and collections within that server, and perform various database operations such as inserting, updating, deleting, or querying documents.
 * Overall, MongoClient serves as the primary interface between your Node.js application and the MongoDB database, enabling seamless communication and interaction with MongoDB data.
 */

const connectionUrl = 'mongodb://127.0.0.1:27017';


//create a instacne of MongoClient class is the first step in connecting your Node.js application to a MongoDB server and is essential for facilitating communication and interaction with the database.
const client = new MongoClient(connectionUrl);

/**
 * {useNewUrlParser:true, useUnifiedTopology:true} --depreciated
 * useNewUrlParser: true, you ensure that the driver uses the updated URL parser, which can handle modern connection strings effectively.
 * useUnifiedTopology: true enables this engine, ensuring that your application benefits from the latest improvements in connection management and monitoring.
 */


const database = 'demo-my-task-app';

async function main(){
    try{
        //check my application connected or not with mongodb server ?
        await client.connect();
        console.log('conncetion successfull');

        //after successfully connceted, now creating database 
        const db = client.db(database);

        //creating a collections by giving its name 
        const collection = db.collection('app_users')

        //create a random new ObjectId
        const id = new ObjectId();
        // console.log(id);
        // console.log(id.getTimestamp());
        // console.log("id is store as buffer in mongodb which length is", id.id.length);
        // console.log("we see this id as string for human understanding which length is",id.toHexString().length )



        // //inserting a doucment into that particular document
        // collection.insertOne({
        //     _id:id,
        //     name:"Sunny",
        //     age:50,
        //     single: true,
        //     timeStamp: id.getTimestamp(),
        // }).then((data)=>console.log("inserted ",data)).catch((err)=>console.log(err));
        //---------------------------------------------------
        //callback are no longer accept with insertOne but we can use then().catch();
        // collection.insertMany([
        //     {
        //         name:"Andrew Made",
        //         age:30,
        //         single:false
        //     },{
        //         name:"souvik",
        //         age:19,
        //         single:true,
        //     }
        // ]).then((data)=> console.log("successfully inserted",data)).catch((err)=>console.log(err));

        //-------------------------------------------------------------------------------
        //creating a new collection name "task" and insert 3 document into it which all have description and completed fields.

        const collection2 = db.collection('user-task');
        // collection2.insertMany([
        //     {
        //         desc:"Improve coding",
        //         completed: false,
        //     },
        //     {
        //         desc:"Banking pre.",
        //         completed:false,
        //     },
        //     {
        //         desc:"Portfolio creation",
        //         completed:true,
        //     }
        // ]).then((data)=>console.log("successfully inserted", data)).catch((err)=>console.log(err));

        //------------------------------------------------------------------------
        //Finding document from collection use findOne()/find()
        //collection.findOne({name:'Andrew Made'}).then((data)=>console.log(data)).catch((err)=>console.log(err));

        //collection.findOne({_id: new ObjectId("663a514a09419aad391ec9ce")}).then((data)=>console.log(data)).catch((err)=>console.log(err));//use new ObjectId() to find any result by id. Just putting id string will not give the result ( _id: "663a514a09419aad391ec9ce") because mongodb store id in binary form and for human read able it show in string format infront of us.

        //collection.find({single: true}).toArray().then((data)=>console.log(data)).catch((err)=>console.log(err));//find not support then directely so first convert into array then show result.

        //-------------------------------------------------------------------------------------------------------------
        //Finding document from collection2 use findOne()/find()
        // collection2.find({completed:false}).toArray().then((data)=>console.log(data)).catch((err)=>console.log(err));

        // collection2.findOne({_id: new ObjectId('663a5411e288c81699a0d7f5')}).then((data)=>console.log(data)).catch((err)=>console.log(err));

        //-----------------------------------------------------------------
        //updating single document or multiple documents
        // collection.updateOne({_id: new ObjectId('663a514a09419aad391ec9cd')},{
        //     $set:{
        //         name: "Andrew",

        //     }
        // }).then((data)=>console.log("updated data ",data)).catch(err => console.log(err));

        // collection.updateMany({single:true},{
        //     $inc:{
        //         age: 10,
        //     }
        // }).then(data => console.log(data)).catch(err => console.log(err));

        //Delete one item or many
        collection.deleteOne({_id: new ObjectId("663ad5134e91d7255affbd9b")}).then(data => console.log(data)).catch(err => console.log(err));

    }catch(err){
        console.log("connection failed", err);
    }
    
    

}



main();