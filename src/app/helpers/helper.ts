import * as moment from 'moment';

export function generateUrlEncodedData(data) {
  const body = new URLSearchParams();
  const objNames = Object.getOwnPropertyNames(data);

  objNames.forEach((name) => {
    body.set(name, data[name]);
  });

  return body.toString();
}

export function setStorageData(storage, params): void {
  storage.forEach((data: string) => {
    if (data === 'expires_in') {
      localStorage.setItem(data, moment(new Date()).add(params[data], 'seconds').format('YYYY-MM-DD HH:mm:ss'));
    } else {
      localStorage.setItem(data, params[data]);
    }
  });
}
