const  express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const  usersRoutes =  require('./routes/users.js');

const app = express();
const PORT = process.env.PORT || 8000;

//Connect to database
require('./config/db.js');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('SERVER IS UP!!');
    res.send("Hello to from the Homepage");
});

app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port:http://localhost:${ PORT }`);
});