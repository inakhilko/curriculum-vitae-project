export function filterArrayWithObjects(array, filteredField, filterParameter) {
  return array.filter((element) => element[filteredField] === filterParameter);
}
