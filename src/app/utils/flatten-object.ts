export function flattenObject(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    if (key === 'from' && obj[key] && typeof obj[key] === 'object' && '_id' in obj[key]) {
      result[key] = obj[key]['_id'];
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}
