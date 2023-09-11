const express = require("express");
const router = express.Router();
const employee_controller = require("../controller/employee_controller");


router.post("/register", (req,res)=>{
    return employee_controller.addEmployee(req,res);
});

router.get("/getdata", (req,res)=> {
    return employee_controller.getAllEmployee(req,res);
}) 

router.get("/getdataid/:id",(req,res)=>{
    return employee_controller.getDataById(req,res);
})

router.patch("/update/:id",(req,res) => {
    return employee_controller.updatedata(req,res);
})

router.delete("/delete/:id",(req,res)=>{
    return employee_controller.deleteuser(req,res);
})

module.exports =  router;