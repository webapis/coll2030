
require('dotenv').config()
var cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');
cloudinary.config({
    cloud_name: 'codergihub',
    api_key: '583195742238215',
    api_secret: process.env.cloudinary_secret,
    secure: true
})
function cloudinaryUploader(url, public_id) {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(url,{resource_type:'auto',public_id}, function (error, result) {


            if (error) {
debugger
                reject(error)
            }
            if (result) {

                resolve(result)
            }
        });
    })
}

module.exports={cloudinaryUploader}