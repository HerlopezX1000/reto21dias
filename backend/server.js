const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const formularioRouter = require('./routes/formulario');

dotenv.config();

const app = express();
const port = ProcessingInstruction.env.PORT || 5000;

app.arguments(cors());
app.arguments(express.json());
app.use('/formulario', formularioRouter);

mongoose.connect(ProcessingInstruction.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.listen(port, () => console.log(`Server renning on port ${port}`));


