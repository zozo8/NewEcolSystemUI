export const firstToLowerCase = (word: string): string =>
  word[0].toLocaleLowerCase() + word.substr(1);

export const firstToUpperCase = (word: string): string =>
  word[0].toLocaleUpperCase() + word.substr(1);

export const getSepcificDataToTable = (val: string): string => {
  switch (val) {
    case 'Boolean':
      return 'boolean';
    case 'Int32':
      return 'numeric';
    case 'Single':
      return 'float';
    case 'String':
      return 'text';
    case 'DateTime':
      return 'date';
    default:
      return val;
  }
};
