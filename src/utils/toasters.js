/* eslint-disable prettier/prettier */
const toasters = (status) => {
  switch (status) {
    case 200:
    case 201: {
      return {
        color: 'green',
      }
    }

    case 400:
    case 403:
    case 401:
    case 404:
    case 500: {
      return {
        color: 'red',
      }
    }
    default:
      return {};
  }
}

export default toasters;