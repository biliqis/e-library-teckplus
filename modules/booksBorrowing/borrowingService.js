const bookModel = require("../Books/bookModel");
const User = require ("../user/userModel")
const bookBorrowing = require ("./borrowingModel");


module.exports.findBookByTitle = async (req, res) => {
    try {
        const bookTitle = req.query.book
        const bookResult = await bookModel.find({ $text: { $search: bookTitle } })
        if (bookResult.length ===0) return res.status(404).send({message:"no books found"})
        return res.json({ bookResult })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:error.message})
    }
}
module.exports.userBorrowBook = async (req,res) => {
    try {
        const singleUser = await User.findById(req.user.user_id)
        const bookDto = {
            bookTitles:req.body.bookTitles,
            user:singleUser._id,
            numberOfDays:req.body.numberOfDays,
            borrowDate:new Date(),
            returnDate:new Date().setDate(new Date().getDate() + numberOfDays),


        }
        await startAndEndDates(bookDto.borrowDate,bookDto.numberOfDays)
        let newBorrow = new bookBorrowing(bookDto)
        await newBorrow.save()
        return res.status(201).send({success:true,message:"created successfully"})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message:err.message})
        
    }
}

// const FREE_PERIOD = 3;

module.exports.startAndEndDates = (startDate,days) => {
    const endDate = new Date().setDate(startDate.getDate() + days);
    if (days>3) throw new Error("You can not borrow a book for more than three days")
    return endDate
}

module.exports.checkReturnDateExceeded = (current, end) => {
    return current - end > 0 ? false : true
}



// console.log(checkReturnDateExceeded(12,13))
// console.log(startAndEndDates(new Date(),3))

