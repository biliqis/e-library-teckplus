const bookModel = require("./bookModel")
const { countDocuments } = require('../user/userService')
//const bookService = {};

const bookTitleExists = (bookTitle) => {
	return bookModel.countDocuments({ bookTitle }).then((count) => count > 0)
}

const bookIdExists = async (bookId) => {
	const book = await bookModel.findById(bookId)
	return book
}

const countBooks = async (books) => {
	let totalBooks = await bookModel.countDocuments(books)
	return totalBooks
}

const getAllBooksPaginated = async (page, limit) => {
	const books = await bookModel.find()
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec();
	return books
}


const createBookService = async (book) => {
	try {

		const model = new bookModel({ ...book })
		return model.save()

	} catch (error) {
		console.error(error)
		return res.json({ message: err.message })
	}
	//console.log(model)
}
const updateBookService = async (bookId, book) => {
	//TODO: change to findByIdAndUpdate since you are searching by Id and the Id is known.
	return bookModel.findByIdAndUpdate(
		{ _id: bookId },
		{ ...book },
		{ new: true }
	);
}




// const getAllBookService = async () => {
// 	try {
// 		//TODO: Implement Pagination of the results.
// 		const options = { limit: 4, page: 2 }
// 		//paginate the books using the options object
// 		const books = await bookModel.find({})
// 		//.sort({ createdAt: -1 })
// 			.limit(options.limit)
// 			.skip(options.limit * (options.page - 1))
// 		books.count = await countBooks(books)
// 		let booksData = await getAllBooksPagination(books, options)
// 		console.log(books)
// 		return booksData
// 	} catch (error) {
// 		console.error(error)
// 		return res.status(500).json({ message: err.message })

// 	}
// }

// //pagination service
// const getAllBooksPagination = async (
// 	data,
// 	options
// ) => {
// 	const total_books = data.count;
// 	const limit = options.limit;
// 	const pages = total_books / limit;
// 	const from_page = Number(options.page) === 1 ? 1 : (options.page - 1) * limit + 1;
// 	const to_page = from_page + data.length - 1;
// 	const totalPages = pages > Math.floor(pages) ? Math.floor(pages + 1) : pages;
// 	return {
// 		rows: data,
// 		current_page: Number(options.page),
// 		books_per_page: limit,
// 		//total_pages: pages
// 		total_pages: totalPages,
// 		total_books,
// 		from_page,
// 		to_page,
// 	};
// }



const deleteBookService = async (bookId) => {
	//TODO: change to findByIdAndDelete since you are searching by Id and the Id is known.
	//TODO: You are passing in the userId on book collection, this cant work, it should be the bookId.
	return await bookModel.deleteOne({ _id: bookId }); //TODO: check the parameter you are passing in.
}


//TODO: Implement the Search api, that accepts a search term and a queries.
const searchBooks = async (req, res) => {
	try {
		let book = req.query.book
		const bookResult = await bookModel.find({ $text: { $search: book } })
		if (bookResult.length === 0) return res.status(404).send({ message: `no search results for ${book} found` })
		return res.status(200).send({ results: bookResult })
	} catch (error) {
		console.error(error)
		return res.status(500).send({ message: error.message })

	}
}


module.exports = { countBooks, updateBookService, deleteBookService, searchBooks, bookIdExists, getAllBooksPaginated, bookTitleExists, createBookService }