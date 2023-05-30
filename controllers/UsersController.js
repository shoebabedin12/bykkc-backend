const User = require("../models/usersModel");

const UsersController = async (req, res) =>{

    let users = await User.find({});

    res.json(users);

    
}



module.exports = UsersController;