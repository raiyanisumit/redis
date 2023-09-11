const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    jobs:{
        type : String,
        require : true
    },
    age:{
        type : String,
        require : true
    },
    mobile:{
        type : String,
        require : true
    },
    add:{
        type : String,
        require : true
    },
    desc:{
        type : String,
        require : true
    },
})

module.exports = mongoose.model("employee", employeeSchema);
