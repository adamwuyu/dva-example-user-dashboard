import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();
  const list = data.data.list;
  const ret = {
    data: list,
    headers: {},
  };
  //因为返回的是对象，不是数组，所以用明文传递记录总数
  ret.headers['x-total-count'] = data.data.count;
  // if (response.headers.get('x-total-count')) {
  //   ret.headers['x-total-count'] = data.data.count;
  // }

  return ret;
}
