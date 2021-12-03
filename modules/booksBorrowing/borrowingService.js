const bookModel = require("../Books/bookModel");
const User = require ("../user/userModel")
const bookBorrowing = require ("./borrowingModel");
const {bookTitleExists,bookIdExists} = require('../Books/bookService')
const ObjectID = require('mongodb').ObjectId
const {checkIfBooksExists} = require('./borrowingGuard');
const { UserService } = require("../user/userService");

//FIND BOOK IN STORE BY ID
booksBorrowingService ={};

module.exports.startAndEndDates = (startDate,days) => {
    const endDate = new Date().setDate(startDate.getDate() + days);
    if (days>3) throw new Error("You can not borrow a book for more than three days")
    return endDate
}

booksBorrowingService.findBookById = async (req, res) => {
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


booksBorrowingService.userBorrowBook = async (req,res) => {
    try {
        const singleUser = await User.findOne({_id:new ObjectID(req.user._id)})
        if (!singleUser) throw new Error("user not found!")
        let bookTitle = req.body.bookTitle
        const bookData = await bookTitleExists(bookTitle)
        console.log(bookData)
        if (!bookData){
            throw new Error("book not found")
        }

        const bookDto = {
            bookId:bookData._id,
            user:singleUser._id,
            numberOfDays:Number(req.body.numberOfDays),
            // numberOfBooksToBeBorrowed:Number(req.body.numberOfBooksToBeBorrowed),
            borrowDate:new Date(),
            returnDate:new Date().setDate(new Date().getDate() + req.body.numberOfDays),
        }
        //check if the book exists
        await checkIfBooksExists(bookDto.bookId)

        const findBook = await bookModel.findOne({_id:bookDto.bookId})
        // // if (!findBook) throw new Error("this book cannot be found!")
        // let checkFunc = await this.checkNumBooks(bookDto.numberOfBooksToBeBorrowed,findBook.numberOfBooksInStore)
         if (findBook.noOfCopies <=1 ) {
            return res.status(400).json ({message :"You cannot borrow all or more than the number of books in store"}) 
         }
 //     //update the number of books in the book document
        // findBook.noOfCopies = findBook.noOfCopies - bookDto.numberOfBooksToBeBorrowed
        // //mark modify the findbook
        // await findBook.markModified("noOfCopies")
        // await findBook.save()
       
        this.startAndEndDates(bookDto.borrowDate,bookDto.numberOfDays)
        let newBorrow = new bookBorrowing(bookDto)
        await newBorrow.save()
        return res.status(201).send({success:true,message:"request submitted successfully, the moderators will review your request"})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message:err.message})
        
    }
}
 
booksBorrowingService.getBorrowBookByUser= async (req, res)=>{

    try {
        const borrowedBooks = await bookBorrowing.find({user:new ObjectID(req.user._id)})
        if (borrowedBooks.length === 0) return res.status(404).send({message:"sorry, you have not borrowed any books"})
        return res.status(200).send({message:"successful",data:borrowedBooks})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:error.message})
    }
}

//BORROW BOOKS BY ID

booksBorrowingService.userBorrowBookById = async (req,res) => {
    try {
        const singleUser = await User.findOne({_id:new ObjectID(req.user._id)})
        if (!singleUser) throw new Error("user not found!")
        let borrowedBooks = req.body.bookId
        let bookData = await bookIdExists(borrowedBooks)
        if (!bookData){
            throw new Error("book not found")
        }
        const bookDto = {
            bookId:bookData._id,
            user:singleUser._id,
            numberOfDays:Number(req.body.numberOfDays),
            borrowDate:new Date(),
            returnDate:new Date().setDate(new Date().getDate() + req.body.numberOfDays),
        }

         if (bookData.noOfCopies <=1 ) {
            return res.status(400).json ({message :"You cannot borrow all or more than the number of books in store"}) 
         }
 
       
        this.startAndEndDates(bookDto.borrowDate,bookDto.numberOfDays)
        let newBorrow = new bookBorrowing(bookDto)
        await newBorrow.save()
        return res.status(201).send({success:true,message:"request submitted successfully, the moderators will review your request"})
        
    }catch (error){
            console.error(error)
            return res.status(500).send({message:error.message})
        }
    }
        



module.exports = booksBorrowingService 


