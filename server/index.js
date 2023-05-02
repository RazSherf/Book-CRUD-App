import express from "express";
import mysql from "mysql2";
import cors from "cors";
const PORT = 3001
const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'test',
    connectionLimit:200,
})

app.get('/',(req,res)=>{
    res.json('Hello There')
})

app.get('/books',(req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) {
            return err
        }
        else{
        return res.json(data)

        }
    })
})


app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


app.delete('/books/:id',(req,res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json('Book has been deleted')
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(3001,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})