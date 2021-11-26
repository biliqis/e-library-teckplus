const borrowingModel = require("../booksBorrowing/borrowingModel")
const bookModel = require('../Books/bookModel')
const ObjectId = require("mongodb").ObjectId;
const mongoose = require ("mongoose")
const AdminService = {};


//GET A SINGLE REQUEST
AdminService.getSingleRequest = async (req, res) => {
    try {
        const requestId = req.params.borrowedId
        const bookData = await borrowingModel.findById(requestId);
        return res.status(200).json({ message: "fetched successfully", bookData })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err.message })

    };
};

//APPROVE TO BORROW A BOOK
AdminService.approveBookBorrowingRequest = async (req, res) => {
    try {
        const { borrowedId } = req.params
        let findPendingBookRequest = await borrowingModel.findById(borrowedId)
        console.log(findPendingBookRequest)
        //find the actual book
        const book = await bookModel.findById(mongoose.Types.ObjectId(findPendingBookRequest.bookId))
        //const book = await bookModel.findById(new ObjectId(findPendingBookRequest.bookId))
        // const book = await bookModel.findById( findPendingBookRequest.bookId)
         console.log(book)

        //reduce the copies
        book.noOfCopies = book.noOfCopies - 1
        await book.markModified("noOfCopies")
        await book.save()

        //update the status of the borrowing model
        findPendingBookRequest.status = "approved"
        await findPendingBookRequest.markModified("status")
        await findPendingBookRequest.save()
        return res.status(200).send({ message: "approved successfully!", book })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err.message })
    }
}


//INITIATE BOOK REDUCTION IN THE DATABASE
const bookReductionService = (noOfCopies) => {
    return noOfCopies - 1
}

module.exports = AdminService