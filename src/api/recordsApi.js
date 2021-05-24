import { http } from 'services';
import { recordsUrl } from './endpoints';

export const Records = {
  getCustomerId: () => http.post(recordsUrl),
  patchData: (postId, data) => http.patch(`${recordsUrl}${postId}/`, data),
};
