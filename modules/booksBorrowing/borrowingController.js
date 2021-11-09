const { findBookByTitle } = require("./borrowingService")


module.exports.searchBooksTitle = async (req,res) => {
    return findBookByTitle(req,res)
}