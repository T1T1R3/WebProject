import express from "express";
import mysql from "mysql";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'node123',
    database: 'ProjetoWeb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});

app.get('/show-users', (req, res) =>{
    connection.query("SELECT * FROM usuarios", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
})

app.post('/add-categ', (req, res) =>{
    const { nomeCateg, statusCateg } = req.body;
    const query = "INSERT INTO categoria (categoria, status) VALUES (?, ?)";
    connection.query(query, [nomeCateg, statusCateg], (err, results) => {
        if(err) throw err;
        res.json(results);
    })
})

app.post('/login', (req, res) =>{
    const { email, passw} = req.body;
    if(!email || !passw){
        return res.status(403).send('error no email or pass');

    }
    const query = 'SELECT * FROM usuarios WHERE email = ?';

    connection.query(query, [email], async (err, results) =>{
        if(err){
            return res.status(500).send('Cannot check user');
        }
        if(results.lenght === 0){
            return res.status(430).send('Invalid email or password');

        }
        const user = results[0];

        const passwordMatch = passw === user.senha;
        if(!passwordMatch){
            return res.status(433).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login Successful', token });
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
