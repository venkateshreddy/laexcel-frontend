import axios from 'axios';

export const API_GET = url =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const API_POST = (url, body) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const API_PUT = (url, body) =>
  new Promise((resolve, reject) => {
    axios
      .put(url, body)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
