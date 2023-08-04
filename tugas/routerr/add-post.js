const express = require('express');
const router = express.Router();

//TUGAS NOMOR 6

router.get('/',(req,res,next)=>{
    const formHtml = `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Add Post</h1>

      <form>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br><br>

        <label for="description">Description:</label><br>
        <textarea id="description" name="description"></textarea><br><br>

        <input type="submit" value="Submit">
      </form>

    </body>
    </html>
  `;
  console.log("berhasil masuk add-post");
    res.send(formHtml)
    next();
});

// router.post('/',(req,res,next)=>{
//     console.log('HORE YOUR POST WITH TITLE CREATED')
//     // next();
// });

// router.use('/products', (req, res, next) => {
//     console.log(req.body)
//     res.redirect('/shop')
// })

module.exports = router;