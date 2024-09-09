import { Order } from '../types/tableTypes';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => {
        if (a[orderBy] === null && b[orderBy] === null) {
          return 0;
        }
        if (a[orderBy] === null || a[orderBy] === '') {
          return 1;
        }
        if (b[orderBy] === null || b[orderBy] === '') {
          return -1;
        }
        return descendingComparator(a, b, orderBy);
      }
    : (a, b) => {
        if (a[orderBy] === null && b[orderBy] === null) {
          return 0;
        }
        if (a[orderBy] === null || a[orderBy] === '') {
          return 1;
        }
        if (b[orderBy] === null || b[orderBy] === '') {
          return -1;
        }
        return -descendingComparator(a, b, orderBy);
      };
}
