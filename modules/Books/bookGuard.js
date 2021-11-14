const { bookTitleExists, bookIdExists } = require("./bookService")

bookGuard = {};

bookGuard.createBookGuard = async (req, res) => {
    const exists = await bookTitleExists(req.body.bookTitle);
    if (exists) return res.status(400).send({message:"Book already exists"})
} 


bookGuard.updateBookGuard = async (req, res) => {
    const exists = await bookIdExists(req.params.id);
    if (!exists) return res.status(401).json({ message: `Book with ${req.params.id} does not exit` });
}


bookGuard.deleteBookGuard = async (req, res,next) => {
    const exists = await bookIdExists(req.params.id);
    if (!exists) return res.status(401).json({ message: `Book with ${req.params.id} does not exit` });
    next()
}

//Check if user is admin
bookGuard.checkIfUserIsAdmin = (req, res) => {
	console.log(req.user.roles)
	if (req.user.roles === "user") return res.status(400).json({ message: "Sorry you are not allowed to perform this operation" })

}

module.exports = bookGuard


