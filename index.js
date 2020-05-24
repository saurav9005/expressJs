const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');

const members = require('./Members');

const app = express();

//init middleware
//app.use(logger); 

//Handlebars Middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Homepage Router
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}))

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//Member API Routes
app.use('/api/members', require('./routes/api/members'))

//change the environment port if not 5000 port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));