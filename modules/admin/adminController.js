const adminService = require("./adminService");

const AdminController = {};

//GET SINGLE REQUEST
AdminController.getSingleRequest = async (req, res, next) => {
		const book = await adminService.getSingleRequest(req,res)
		return res.status(200).json({message: "All request retrieved", book})
}

AdminController.approveBookBorrowing = (req,res) => {
    return adminService.approveBookBorrowingRequest(req,res)
}


module.exports =  AdminController 


