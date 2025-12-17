import dotenv from 'dotenv';
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

import connectDB from './config/db.js';
import app from './app.js';


connectDB();

app.listen(process.env.PORT,()=>{
    console.log("Sevrer started successfully at PORT:",process.env.PORT);
}
);