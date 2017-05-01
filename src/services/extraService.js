import React from 'react'
import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function loadIndustryOptions(id) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return request('/api/bk/getIndustryType', {
    method: 'POST',
    body: {in_p: id},
  });
}

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
  // values.name='adam';
  // values.target_type = 4;
  // values.target_id = 12;

  return request(`/api/bk/editExtra?extra_id=${id}`, {
    method: 'POST',
    body: values,
  });
}

export function create(values) {
  return request('/bk/addExtra', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
