const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileid = require('./controllers/profileid');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Vishal@123',
    database : 'postgres'
  }
});


const app = express();


const database={
	users: [
		{
			id: '123',
			name: 'john',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0
		},
		{
			id: '2',
			name: '1',
			email: '1',
			password: '1',
			entries: 0
		}
	]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{ res.json(database.users) })

app.post('/signin',(req,res) =>{ signin.handleSignIn( req, res, db, bcrypt )})

app.post('/register',(req,res) =>{ register.handleRegister( req, res, db, bcrypt )})

app.get('/profile/:id',(req,res) => {profileid.handleProfileId( req, res, db )})

app.put('/image',( req,res ) => {image.handleImage( req, res, db )})

app.post('/imageurl',( req,res ) => {image.handleApiCall( req, res )})


app.listen(3000); 