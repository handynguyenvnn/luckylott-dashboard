export class ConstantEnum {
  public static readonly refreshTimeArray = [
    { key: '5', value: '5 phút'},
    { key: '10', value: '10 phút'},
    { key: '20', value: '20 phút'},
    { key: '30', value: '30 phút'},
    { key: '60', value: '60 phút'},
    { key: '90', value: '90 phút'},
    { key: '120', value: '120 phút'},
    { key: '180', value: '180 phút'}
  ];
  public static readonly thresholdItem = 3000;
}

export const getUniqueCombinations = <T>(items: Array<Array<T>>, prepend: Array<T> = []): Array<Array<T>> => {
  if (!items || items.length === 0) { return [prepend]; }

  let out = [];

  for (let i = 0; i < items[0].length; i++) {
    out = [...out, ...getUniqueCombinations(items.slice(1), [...prepend, items[0][i]])];
  }

  return out;
};
