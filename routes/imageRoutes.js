const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const authenticate = require('../config/passport');
//const cors = require('../config/cors');

const routes = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
       callback(null, './public/uploads/image/');
   },
   filename: (req, file, callback) => {
       callback(null, `${uuid()}_${file.originalname}`);
   }
});

const imageFileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback('فرمت مورد پذیرش JPEG یا PNG می باشد', false);
    }
};

const upload = multer({
    limits: {fileSize: 4000000},
    storage: storage,
    fileFilter: imageFileFilter,
    dest: 'uploads/image/',
}).single('image');



    routes.route('/')
     .options( (req, res) => {
            res.sendStatus(200);
        })
    .get( (req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    })
    .post( authenticate.verifyUser, upload, (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    })





module.exports = routes;
