import { RestaurantModel, IRestaurant } from '../models/restaurant';
import { DishModel, IDish } from '../models/dish';
import  { getCurrentServicePeriods, isRestaurantOpenNow } from '.../utils/servicePeriod'

const now = new Date();
const activePeriods = getCurrentServicePeriods(now);

// 1. Find restaurants that are open right now
const openRestaurants = await RestaurantModel.find({}).then(restaurants =>
    restaurants.filter(r => isRestaurantOpenNow(r.profile.timetable, now))
);
const openIds = openRestaurants.map(r => r._id);

// 2. Find dishes that match the customer taste AND are served right now
const dishes = await DishModel.find({
    restaurant_id: { $in: openIds },
    active: true,
    availableAt: { $in: activePeriods },
    dietaryFlags: { $in: ['vegan'] },           // example customer preference
    flavorProfile: { $in: ['spicy', 'umami'] }, // example customer preference
}).populate('restaurant_id', 'profile.name profile.location profile.rating');