const { json } = require("body-parser");
const employee = require("../Model/employee_model");

const redis = require('redis');
const redisClient = redis.createClient(8081, '127.0.0.1');
redisClient.connect();

redisClient.on('connect', function (err) {
    console.log("connected  Redis");
})

const addEmployee = async (req, res) => {
  try {
    const { name, email, jobs, age, mobile, add, desc } = req.body;

    if (!name || !email || !jobs || !age || !mobile || !add || !desc) {
      res.status(404).send("please fill the data");
    } else {
      const preuser = await employee.findOne({ email: email });

      if (preuser) {
        res.status(404).send("this is user is already exits");
      } else {
        const adduser = new employee({
          name,
          email,
          jobs,
          age,
          mobile,
          add,
          desc,
        });
        await adduser.save();

        res.status(201).json(adduser);
        redisClient.unlink('employeeData');
        

        console.log(adduser);
      }
    }
  } catch (error) {}
};
const getAllEmployee = async (req, res) => {
  try {
    // const data = await redisClient.keys('*')
    // console.log(data);

    const keyname = 'employeeData';
    const data = await redisClient.get(keyname);
    if (!data) {
        var employeeData = await employee.find();
        redisClient.set('employeeData', JSON.stringify(employeeData))
    }
    else {
        var employeeData = await (redisClient.get('employeeData'))
    }
    // var employeeData = await employee.find(); //Without redis only one line need
    res.send(employeeData);
    res.status(201);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    var key = `employeeData_${id}`;
    var data = await redisClient.get(key);
    if (!data) {
        var getemployeeById = await employee.findById({ _id: id });
        redisClient.set(key, JSON.stringify(getemployeeById));
    } else {
        var getemployeeById = await redisClient.get(key);
    }
    // var getemployeeById = await employee.findById({ _id: id });//Without redis only one line need
    res.send(getemployeeById);
    res.status(201);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updatedata = async (req, res) => {
  const { name, email, jobs, age, mobail, add, desc } = req.body;
  const { id } = req.params;
  try {
    var updateemployee = await employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updateemployee);
    res.status(201);
    redisClient.unlink(`employeeData_${id}`);
    redisClient.unlink('employeeData');
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteemployee = await employee.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteemployee);
    redisClient.unlink('employeeData');
    redisClient.del(`employeeData_${id}`);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  addEmployee,
  getAllEmployee,
  getDataById,
  updatedata,
  deleteuser,
};
