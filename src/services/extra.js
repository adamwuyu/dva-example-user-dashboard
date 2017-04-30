import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);

  return request(`/api/bk/extraList?page=${page}&limit=${PAGE_SIZE}`, {
    method: 'POST',
  });
}

export function remove(id) {
  return request(`/bk/delExtra?extra_id=${id}`, {
    method: 'POST',
  });
}

export function patch(id, values) {
  return request(`/bk/editExtra?extra_id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/bk/addExtra', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
