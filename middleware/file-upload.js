const multer = require('multer');
const uuid = require('uuid/v1');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid() + '.' + ext);
    }
});
//To filter incoming file
const fileFilter =  (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' )
    {
        cb(null, true);
        //reject other file (zip ,gips..etc )
    } else {
        cb(null, false);
    }
};
const fileUpload = multer({
    storage: storage,
    limit: {
    //to filter file size
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
/*
const fileUpload = multer({
   /* limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
           cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimeType];
            cb(null, uuid() + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimeType];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});
*/


module.exports = fileUpload;
