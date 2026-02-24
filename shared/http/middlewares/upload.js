import path from 'path'
import multer from 'multer'

const tempDir = path.resolve('temp')

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage: multerConfig
})
