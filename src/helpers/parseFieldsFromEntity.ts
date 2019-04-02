import { loadRowCategoryOptions, Option } from './loadSelectOptions';

export interface AdminListItemType {
  name: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  value: string | number | boolean;
  label: string;
  options?: Option[];
}

const upperCaseFirstLetter = (word: string) =>
  word[0].toUpperCase() + word.slice(1);

export default (item: {
  [key: string]: string | number | boolean;
}): AdminListItemType[] =>
  Object.keys(item)
    .filter(key => key !== 'id')
    .map(
      (key: string): AdminListItemType => {
        switch (key) {
          case 'quantity':
            return {
              type: 'number',
              name: key,
              label: upperCaseFirstLetter(key),
              value: +item[key]
            };
          case 'category':
            return {
              type: 'select',
              name: key,
              label: upperCaseFirstLetter(key),
              value: +item[key]
            };
          case 'lastInSection': {
            return {
              type: 'checkbox',
              name: key,
              label: 'Last in section',
              value: item[key] === 'Yes'
            };
          }
          default:
            return {
              type: 'text',
              name: key,
              label: upperCaseFirstLetter(key),
              value: item[key]
            };
        }
      }
    );
