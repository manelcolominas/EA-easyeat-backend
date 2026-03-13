import { IRestaurant } from '../models/restaurant';
type ServicePeriod = 'breakfast' | 'lunch' | 'dinner' | 'all-day';

// Each restaurant defines their own period cutoffs
const SERVICE_PERIODS: { period: ServicePeriod; start: string; end: string }[] = [
    { period: 'breakfast',   start: '07:00', end: '11:30' },
    { period: 'lunch',       start: '13:00', end: '16:30' },
    { period: 'dinner',      start: '20:00', end: '00:00' },
];

function timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}

export function getCurrentServicePeriods(now: Date = new Date()): ServicePeriod[] {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const active = SERVICE_PERIODS.filter(({ start, end }) => {
        const s = timeToMinutes(start);
        const e = timeToMinutes(end);
        return currentMinutes >= s && currentMinutes < e;
    }).map(p => p.period);

    // 'all-day' dishes are always included
    active.push('all-day');
    return active;
}

// Day of week from timetable
type TimetableDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const DAYS: TimetableDay[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export function isRestaurantOpenNow(timetable: IRestaurant['profile']['timetable'], now: Date = new Date()): boolean {
    const day = DAYS[now.getDay()];
    const slots = timetable?.[day];
    if (!slots || slots.length === 0) return false;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return slots.some(({ open, close }) => {
        const s = timeToMinutes(open);
        const e = timeToMinutes(close);
        return currentMinutes >= s && currentMinutes < e;
    });
}