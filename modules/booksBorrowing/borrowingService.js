const bookModel = require("../Books/bookModel");
const User = require ("../user/userModel")
const bookBorrowing = require ("./borrowingModel");
const {bookTitleExists} = require('../Books/bookService')
const ObjectID = require('mongodb').ObjectId
const {checkIfBooksExists} = require('./borrowingGuard')

//FIND BOOK IN STORE BY ID
booksBorrowingService ={};

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
        console.log(req.user)
        const singleUser = await User.findOne({_id:new ObjectID(req.user._id)})
        if (!singleUser) throw new Error("user not found!")
        let bookTitle = req.body.book
        if (!bookTitleExists(bookTitle)){
            throw new Error("book not found")
        }
        const bookDto = {
            bookId:new ObjectID(req.body.bookId),
            user:singleUser._id,
            // numberOfDays:req.body.numberOfDays,
            numberOfBooksToBeBorrowed:Number(req.body.numberOfBooksToBeBorrowed),
            borrowDate:new Date(),
            // returnDate:new Date().setDate(new Date().getDate() + req.body.numberOfDays),
        }
        // console.log(bookDto)
        //check if the bok exists
        await checkIfBooksExists(bookDto.bookId)
        // if (!findBook) throw new Error("this book cannot be found!")

        const findBook = await bookModel.findOne({_id:bookDto.bookId})
        // if (!findBook) throw new Error("this book cannot be found!")
        // let checkFunc = await this.checkNumBooks(bookDto.numberOfBooksToBeBorrowed,findBook.numberOfBooksInStore)
         if (findBook.noOfCopies - bookDto.numberOfBooksToBeBorrowed <1 ) {
            return res.status(400).json ({message :"You cannot borrow all or more than the number of books in store"}) 
         }

            //update the number of books in the book document
        findBook.noOfCopies = findBook.noOfCopies - bookDto.numberOfBooksToBeBorrowed
        //mark modify the findbook
        await findBook.markModified("noOfCopies")
        await findBook.save()
        // await this.startAndEndDates(bookDto.borrowDate,bookDto.numberOfDays)
        let newBorrow = new bookBorrowing(bookDto)
        await newBorrow.save()
        return res.status(201).send({success:true,message:"book borrowed sucessfully, proceed to payment"})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message:err.message})
        
    }
}


module.exports = booksBorrowingService 




