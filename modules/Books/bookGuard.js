const { bookTitleExists, bookIdExists } = require("./book.service")
const AppError = require("../Error/appError");

module.exports.createBookGuard = async (req, res) => {
    const exists = await bookTitleExists(req.body.bookTitle);
    if (exists) return res.status(401).json({ message: `Book already exists, you may wish to add to the number of ${req.body.bookTitle} copies that exist`});
}

module.exports.updateBookGuard = async (req, res) => {
    const exists = await bookIdExists(req.params.id);
    if (!exists) return res.status(401).json({ message: `Book with ${req.params.id} does not exit`});
}

module.exports.deleteBookGuard = async (req, res) => {
    const exists = await bookIdExists(req.params.id);
    if (!exists) return res.status(401).json({ message: `Book with ${req.params.id} does not exit`});

}

module.exports.checkIfUserIsAdmin = (req, res) => {
	if(req.user.role === "user") return res.status(400).json({ message: "Sorry you are not allowed to perform this operation"})
}