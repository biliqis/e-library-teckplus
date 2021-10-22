const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//USER REGISTER LOGIC
const userRegister = async (req, res) => {
  try {
		//TODO: Read about the naming convention
		//TODO: Read about how to a name a variable, function/method and a class
		//TODO: rename your variable properly e.g first_name should be in this format firstName, dont use - or any symbol in between
		const {
			first_name,
			last_name,
			email,
			password,
			phonenumber,
			address,
			roles,
			gender,
			occupation,
		} = req.body;
		if (!(first_name || last_name || email || password))
			res.status(400).send("All input is required");
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}

		//ENCRYPTION OF PASSWORD
		//TODO: read about Methods and Statics in mongoose
		const salt = await bcrypt.genSalt(10);

    //TODO: this can be handled inside the model
		const encryptedPassword = await bcrypt.hash(password, salt);
		const jwtSecretKey = process.env.JWT_SECRET;

		const user = await User.create({
      ...req.body,
      //TODO: I think what you are trying to do here is set the user to have and admin role or just a normal user. 
			ADMIN: "USER", //kindly replace with this role: "USER"
			password: encryptedPassword,
		});
		const token = jwt.sign({ user_id: user._id, email }, jwtSecretKey, {
			expiresIn: "24h",
		});
		const result = { user, token };
		return res.status(201).json(result);
	} catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }

}

// ADMIN REGISTER LOGIC
const adminRegister = async (req, res) => {
  try {
    //TODO: Kindly rename this variables
    const { first_name, last_name, email, password , phonenumber, address, roles, gender, occupation} = req.body
    if (!(first_name || last_name || email || password))
      res.status(400).send("All input is required");
    const checkAdmin = await User.findOne({ email });
    if (checkAdmin) {
      return res.status(409).send("admin Already Exist. Please Login");

    }

    //ENCRYPTION OF PASSWORD
    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);
    const jwtSecretKey = process.env.JWT_SECRET;


    const admin = await User.create({ ...req.body,roles:"ADMIN", password: encryptedPassword });
    const token = jwt.sign(
      { user_id: admin._id, email,roles },
      jwtSecretKey,
      {
        expiresIn: "24h",
      }
    );
    const result = {admin, token };
    return res.status(201).json(result);
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}


//USERLOGIN LOGIC
const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.find({
			email,
		});

		if (!user) return res.status(404).json({ message: "account not found" });
		const comparePassword = bcrypt.compare(password, user.password);
		if (!comparePassword)
			return res.status(400).json({ message: "Invalid email or password" }); //REFACTOR add closing tags
		const loginUser = jwt.sign(
			{
				user: {
					id: user._id,
					first_name: user.first_name,
					last_name: user.last_name,
				},
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXP,
			}
		);
		return res.status(200).json({
			user: {
				token: loginUser,
				first_name: user.first_name,
				last_name: user.last_name,
			},
			message: "login successful!",
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message });
	}
};

//ADMINLOGIN LOGIC
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.find({
      email
    });

    if (!admin) return res.status(404).json({ message: "account not found" });
    const comparePassword = bcrypt.compare(password, admin.password);
    if (!comparePassword) return res.status(400).json({ message: "Invalid email or password" });
    const loginUser = jwt.sign({
      user: {
        id: admin._id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        roles:admin.roles
      }
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP
    });
    return res.status(200).json({
      Admin: {
        token: loginUser,
        first_name: admin.first_name,
        last_name: admin.last_name
      }, message: "login successful!"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}




//UPDATED USER LOGIC
const updatedUser = async (req, res) => {
  const id = req.params.id
  try {
    console.log(id)
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json({
      data: updatedUser,
    });

  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message);

  }
}


const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const deleteUser = await User.findByIdAndDelete(id, req.body)
    return res.status(200).json({
      data: deleteUser 
    });
  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message);
  }
}
//TODO: write a service to get all user.

module.exports = {
  adminLogin,
  userLogin,
  userRegister,
  updatedUser,
  adminRegister,
  deleteUser
};
