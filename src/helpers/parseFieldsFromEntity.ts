import { loadRowCategoryOptions, Option } from './loadSelectOptions';

export interface AdminListItemType {
  name: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'image' | 'textfield';
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
          case 'overview': {
            return {
              type: 'textfield',
              name: key,
              label: 'Overview',
              value: item[key]
            };
          }
          case 'poster': {
            return {
              type: 'image',
              name: key,
              label: 'Poster',
              value: item[key]
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
