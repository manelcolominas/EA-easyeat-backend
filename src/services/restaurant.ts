import mongoose from 'mongoose';
import { RestaurantModel, IRestaurant } from '../models/restaurant';

const createRestaurant = async (data: Partial<IRestaurant>): Promise<IRestaurant> => {
    const restaurant = new RestaurantModel({
        ...data
    });
    return await restaurant.save();
};

const getRestaurant = async (restaurantId: string): Promise<IRestaurant | null> => {
    return await RestaurantModel.findById(restaurantId);
};

const getAllRestaurants = async (): Promise<IRestaurant[]> => {
    return await RestaurantModel.find();
};

const updateRestaurant = async (restaurantId: string, data: Partial<IRestaurant>): Promise<IRestaurant | null> => {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (restaurant) {
        restaurant.set(data);
        return await restaurant.save();
    }
    return null;
};

const deleteRestaurant = async (restaurantId: string): Promise<IRestaurant | null> => {
    return await RestaurantModel.findByIdAndDelete(restaurantId);
};

const getRestaurantWithCustumers = async (restaurantId: string): Promise<IRestaurant | null> => {
    return await RestaurantModel.findById(restaurantId).populate('customers', '-restaurant').lean();
};

export default { createRestaurant, getRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant, getRestaurantWithCustumers };
