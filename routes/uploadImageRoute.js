const fs = require('fs');
const path = require('path');

const uploadImageRoute = async (req, res) => {
    const images = req.files;
    console.log(images);
    return res.json({'msg':'image uploaded'});
}

module.exports = { uploadImageRoute };