const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/myname', (req, res) => {
    const name=req.query.name;

    res.send('Your name is : '+name)
  })

// app.post('/testpost', (req,res)=>{
//     const foo=req.body.bar;

//     res.status(200).send({data:foo});
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})