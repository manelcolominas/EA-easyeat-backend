import mongoose from 'mongoose';
import { ReviewModel, IReview } from '../models/review';

const createReview = async (data: Partial<IReview>) => {
    const review = new ReviewModel({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });

    return await review.save();
};

const getReview = async (reviewId: string) => {
    return await ReviewModel.findById(reviewId);
};

const getAllReviews = async () => {
    return await ReviewModel.find();
};

const updateReview = async (reviewId: string, data: Partial<IReview>) => {
    const review = await ReviewModel.findById(reviewId);

    if (review) {
        review.set(data);
        return await review.save();
    }

    return null;
};

const deleteReview = async (reviewId: string) => {
    return await ReviewModel.findByIdAndDelete(reviewId);
};

export default {
    createReview,
    getReview,
    getAllReviews,
    updateReview,
    deleteReview
};