import { http } from 'services';
import { nearestLocationUrl } from './endpoints';

export const LocationApi = {
  getNearestLocation: (latitude, longitude, radius, vaccineName) =>
    http.get(
      `${nearestLocationUrl}?latitude=${latitude}&longitude=${longitude}&radius=${radius}&vaccine=${vaccineName}`,
    ),
};
