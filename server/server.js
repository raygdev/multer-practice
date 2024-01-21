import express from "express";
import cors from 'cors'
import multer from 'multer'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err,  raw) => {
            const fileExt = file.originalname.split(".")[1]
            cb(err, err ? undefined : (raw.toString('hex') + "." + fileExt))

        })
    }
})

const upload = multer({ storage })

const app = express()

app.use(express.static("uploads"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/upload", upload.single("photo"), (req, res) => {
    const photo = req.file
    const description = req.body.description
    res.json({
        success: true,
        message: `Photo uploaded with description ${description}`,
        data: {
            originalName: photo.originalname,
            size: photo.size,
            filename: photo.filename
        }
    })
})

app.listen(3000, () => {
    console.log(`App is listening on port: ${3000}`)
})