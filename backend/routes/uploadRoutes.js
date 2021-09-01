import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const checkFileType = (file, cb) => {
  const fileTypes = /png|jpg|jpeg/
  const extensionName = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = fileTypes.test(file.mimetype)

  if (extensionName && mimetype) {
    return cb(null, true)
  } else {
    cb('Images Only! (.png or .jpg or .jpeg)')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
