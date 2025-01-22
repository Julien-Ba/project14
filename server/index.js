const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: [process.env.APP_PROD, process.env.APP_DEV, process.env.APP_PREVIEW] }));
app.use(express.json());
app.use('/api/employees', employeeRoutes);

connectDB();

app.listen(port, () => {
    console.log(
        `Server listening on ${
            process.env.NODE_ENV === 'development' ? 'http://localhost:' : 'port: '
        }${port}`
    );
});
