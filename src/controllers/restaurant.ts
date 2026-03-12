import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import RestaurantService from '../services/restaurant.js';

const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedRestaurant = await RestaurantService.createRestaurant(req.body);
        return res.status(201).json(savedRestaurant);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await RestaurantService.getRestaurant(req.params.restaurantId);
        return restaurant ? res.status(200).json(restaurant) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await RestaurantService.getAllRestaurants();
        return res.status(200).json(restaurant);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const restaurant = await RestaurantService.updateRestaurant(restaurantId, req.body);
        return restaurant ? res.status(200).json(restaurant) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    try {
        const restaurant = await RestaurantService.deleteRestaurant(restaurantId);
        return restaurant ? res.status(200).json(restaurant) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getRestaurantWithCustumers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await RestaurantService.getRestaurantWithCustumers(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        return res.status(200).json(restaurant);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createRestaurant, readRestaurant, readAll, updateRestaurant, deleteRestaurant, getRestaurantWithCustumers };
