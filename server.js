const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const connectDB = require('./database/database');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// IMPORTS
const { noteRouter, renderRouter } = require('./routes/notepadRoutes');

// SET VIEWS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 4000;
const url = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);

const DB = async () => {
    await connectDB(url);
};

DB().catch(err => console.log(err));

app.use('/', renderRouter)
app.use('/api/v1/notes', noteRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
