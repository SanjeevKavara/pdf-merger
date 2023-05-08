const express = require('express')
const path = require('path')

const multer = require('multer')
const {mergePdfs} = require('./testpdf')
const upload = multer({ dest: 'uploads/' }) // multer will put the uploaded files in the uploads directory. 
const app = express()
app.use('/static', express.static('public')) // serve the merged pdf file from the public directory 
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"template/index.html")) // __dirname : It will resolve to your project folder. 
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> { // upload.array('pdfs', 2) is the middleware that handles the upload. It will put the files in req.files array and the rest of the data in req.body object. 
    console.log(req.files)
   let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path)) // req.files[0].path is the path to the file in the temp directory 
    // res.send({data: req.files})
    res.redirect(`http://localhost:3000/static/${d}.pdf` ) // redirect to the merged pdf file 
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})