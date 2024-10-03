const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/file.controller");
const {verifyToken} =require("../middlewares/authToken");


const storage = multer.diskStorage({
    destination:"src/public/profile/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({
    storage
})

const Singleupload = upload.single("uploadfile")

router.use(verifyToken);

router
.route("/file")
.post(Singleupload,controller.createfile)
.get(controller.getfile)

router.get("/getfile",controller.getfileId)

module.exports = router;

