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
export default async function request(url, _options) {
  const options = _options
  if (options.body) {
    options.body = Object.keys(options.body).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(options.body[key])}`;
    }).join('&');
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();
  let ret
  if (data.ret === 1) {
    let list
    if (data.data.list) {
      list = data.data.list
    } else {
      list = data.data
    }

    ret = {
      data: list,
      headers: {},
    };
  } else {
    const error = new Error(data.msg);
    throw error;
  }

  //因为返回的是对象，不是数组，所以用明文传递记录总数
  ret.headers['x-total-count'] = data.data.count;
  // if (response.headers.get('x-total-count')) {
  //   ret.headers['x-total-count'] = data.data.count;
  // }

  return ret;
}
