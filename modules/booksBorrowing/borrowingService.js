const bookModel = require("../Books/bookModel");
const User = require ("../user/userModel")
const bookBorrowing = require ("./borrowingModel");

//FIND BOOK IN STORE BY ID
module.exports.findBookById = async (req, res) => {
    try {
        const id = req.params.id
        const bookResult = await bookModel.findById(id)
        if (!bookResult) return res.status(404).send({message:"no books found"})
        return res.json({ bookResult })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:error.message})
    }
}

module.exports.userBorrowBook = async (req,res) => {
    try {
        console.log(req.user)
        const singleUser = await User.findOne({email:req.user.email})
        if (!singleUser) throw new Error("user not found!")
        const bookDto = {
            bookTitles:req.body.bookTitles,
            user:singleUser._id,
            numberOfDays:req.body.numberOfDays,
            numberOfBooksToBeBorrowed:Number(req.body.numberOfBooksToBeBorrowed),
            // numberOfBooksInStore:req.body.numberOfBooksInStore,
            borrowDate:new Date(),
            returnDate:new Date().setDate(new Date().getDate() + req.body.numberOfDays),
        }
        // console.log(bookDto)
        //check if the bok exists
        const findBook = await bookModel.findOne({bookTitle:req.body.bookTitles})
        if (!findBook) throw new Error("this book cannot be found!")
        // let checkFunc = await this.checkNumBooks(bookDto.numberOfBooksToBeBorrowed,findBook.numberOfBooksInStore)
         if (findBook.numberOfBooksInStore - bookDto.numberOfBooksToBeBorrowed <=0 ) {
            throw new Error("You cannot borrow more than the number of books in store") 
         }
        // if (Boolean(checkFunc) == false){
        //     throw new Error("You cannot borrow more than the number of books in store")
        // }
            // throw new Error("You cannot borrow more than the number of books in store")

            //update the number of books in the book document
        findBook.numberOfBooksInStore = findBook.numberOfBooksInStore - bookDto.numberOfBooksToBeBorrowed
        //mark modify the findbook
        await findBook.markModified("numberOfBooksInStore")
        await findBook.save()
        await this.startAndEndDates(bookDto.borrowDate,bookDto.numberOfDays)
        let newBorrow = new bookBorrowing(bookDto)
        await newBorrow.save()
        return res.status(201).send({success:true,message:"book borrowed sucessfully, proceed to payment"})

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

