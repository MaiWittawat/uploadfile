import express from 'express'
import multer from 'multer'
import cors from 'cors'

const port = 8000

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})


const app = express()
app.use(cors())
const upload = multer({storage})

app.get('/hello',(req, res)=>{
    // console.log('hello world')
    res.send('hello world')
})

app.post('/upload', upload.single('uploadKEY'), (req, res)=>{
    console.log('upload success!!')
    res.json({message: 'upload success!!'})
})


app.listen(port, ()=>{
    console.log(`server runing on port http://localhost:${port}`)
})