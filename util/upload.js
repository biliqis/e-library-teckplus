const multer = require('multer')

//setting up multer for file uploading
let storage = multer.memoryStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now()+'.png')
	}
});

let upload = multer({ storage: storage });

module.exports = upload