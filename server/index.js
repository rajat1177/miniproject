import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoutes from './Routes/post.js'

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

const PORT = process.env.PORT || 3000;

// Corrected MongoDB URI
const uri = 'mongodb://localhost:27017/REVIEWS';
app.use('/posts',postRoutes); 

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.log("MongoDB connection error:", err.message);
    });

// // Define a sample schema and model if needed
// const reviewSchema = new mongoose.Schema({
//     bookTitle: { type: String, required: true },
//     reviewContent: { type: String, required: true },
//     rating: { type: Number, required: true },
// });

// const Review = mongoose.model('BookReview', reviewSchema);

// // Example route to save a review
// app.post('/reviews', async (req, res) => {
//     try {
//         const newReview = new Review(req.body);
//         await newReview.save();
//         res.status(201).json(newReview);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
