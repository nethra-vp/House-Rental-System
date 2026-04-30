import { differenceInDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

/**
 * Calculates total price for a booking
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {number} pricePerDay 
 * @returns {number}
 */
export const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
  const days = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
  return Math.max(1, days) * pricePerDay;
};

/**
 * Checks if a house is available for a given date range
 * @param {Array} existingBookings - List of existing confirmed bookings for the house
 * @param {Date} newStart 
 * @param {Date} newEnd 
 * @returns {boolean}
 */
export const isHouseAvailable = (existingBookings, newStart, newEnd) => {
  const start = new Date(newStart);
  const end = new Date(newEnd);

  return !existingBookings.some(booking => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);

    // Collision logic: (newStart <= existingEnd) AND (newEnd >= existingStart)
    return (start <= bookingEnd) && (end >= bookingStart);
  });
};

/**
 * Checks if a vehicle is available for a given date range (legacy)
 * @param {Array} existingBookings - List of existing confirmed bookings for the vehicle
 * @param {Date} newStart 
 * @param {Date} newEnd 
 * @returns {boolean}
 */
export const isVehicleAvailable = (existingBookings, newStart, newEnd) => {
  return isHouseAvailable(existingBookings, newStart, newEnd);
};
