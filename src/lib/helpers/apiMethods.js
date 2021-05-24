import { Records } from '../../api/recordsApi';

export default function patchRecordsData(customerId, data) {
  if (customerId && Object.values(data).length) {
    return Records.patchData(customerId, data);
  }
  return null;
}
export function createCustomerId() {
  return Records.getCustomerId();
}
