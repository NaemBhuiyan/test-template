import config from 'config';

export const apiUrl = `${config.BACKEND_ROOT_URL}/api/v1/`;

export const recordsUrl = `${apiUrl}records/`;

export const nearestLocationUrl = `${apiUrl}recommendation/nearest-resources/`;

export const testApi = `https://jsonplaceholder.typicode.com/posts/1`;
