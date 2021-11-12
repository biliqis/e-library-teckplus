const bookModel = require("./bookModel")
const { countDocuments } = require('../user/userService')
const bookService = {};

bookService.bookTitleExists = (bookTitle) => {
	return bookModel.countDocuments({ bookTitle }).then((count) => count > 0)
}

bookService. bookIdExists = async (bookId) => {
	const book = await bookModel.findById(bookId)
	return book
}

bookService. countBooks = async (books) => {
	let totalBooks = await bookModel.countDocuments(books)
	return totalBooks
}

bookService. getAllBooksPaginated = async (page, limit) => {
	const books = await bookModel.find()
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec();
	return books
}

bookService. createBookService = async (book) => {
	try {

		const model = new bookModel({ ...book })
		return model.save()

	} catch (error) {
		console.error(error)
		return res.json({ message: err.message })
	}
	//console.log(model)
}
bookService. updateBookService = async (bookId, book) => {
	return bookModel.findByIdAndUpdate(
		{ _id: bookId },
		{ ...book },
		{ new: true }
	);
}

bookService. deleteBookService = async (bookId) => {
	
	return await bookModel.deleteOne({ _id: bookId });
}

bookService. searchBooks = async (req, res) => {
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

