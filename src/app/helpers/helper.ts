import {HttpParams} from '@angular/common/http';

import * as moment from 'moment';

export function generateUrlEncodedData(data) {
  let body = '';
  const objNames = Object.getOwnPropertyNames(data);

  objNames.forEach((name) => {
    body += `${name}=${data[name]}&`;
  });

  return body;
}

export function setStorageData(storage, params): void {
  storage.forEach((data: string) => {
    if (data === 'expires_in') {
      localStorage.setItem(data, moment(new Date()).add(params[data], 'seconds').format('YYYY-MM-DD HH:mm:ss'));
    } else {
      localStorage.setItem(data, params[data]);
    }
  });
  location.reload();
}

export function randomColor(i) {
  const colors = [
    '#D32F2F',
    '#7B1FA2',
    '#512DA8',
    '#1976D2',
    '#0097A7',
    '#689F38',
    '#FFA000',
    '#5D4037',
    '#455A64',
  ];
  return colors[i];
}

