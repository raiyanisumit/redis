const mongoose = require('mongoose');
const DB = 'mongodb+srv://bittusoftedge:6rlsEQC9ciIs1KYh@cluster0.ofbdtg8.mongodb.net/Redis';
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose.connect(DB).then(function(){
    console.log("successfully connected to Database");
}).catch(function(err){
    console.log("can not connect database",err);
    process.exit();
})