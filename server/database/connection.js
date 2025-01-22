const mongoose = require('mongoose');
const databaseUrl =
    process.env.NODE_ENV === 'development'
        ? process.env.DATABASE_URL_DEV
        : process.env.DATABASE_URL_PROD;

module.exports = async () => {
    try {
        await mongoose.connect(databaseUrl);
        console.log('Database successfully connected');
    } catch (error) {
        console.error(`Database Connectivity Error: ${error}`);
        throw new Error(error);
    }
};
