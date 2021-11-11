const { bookTitleExists, bookIdExists } = require("./bookService")
module.exports.createBookGuard = async (req, res, next) => {
    const exists = await bookTitleExists(req.body.bookTitle);
    if (exists) throw new Error("Book already exists");
    next()
    //return res.status(401).json({ message: `Book already exists, you may wish to add to the number of ${req.body.bookTitle} copies that exist`});
//  next()
} //
//if (exists) return res.status(401).json({ message: `Book already exists, you may wish to add to the number of ${req.body.bookTitle} copies that exist`});
//  next()

module.exports.updateBookGuard = async (req, res) => {
    const exists = await bookIdExists(req.params.id);
    if (!exists) return res.status(401).json({ message: `Book with ${req.params.id} does not exit` });
}

module.exports.deleteBookGuard = async (req, res) => {
    const exists = await bookIdExists(req.params.id);
    if (!exists) return res.status(401).json({ message: `Book with ${req.params.id} does not exit` });

}

