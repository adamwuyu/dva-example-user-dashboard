import React from 'react'
import {Select} from 'antd'
import request from '../utils/request';
import {TARGET_OPTIONS_0} from '../constants';

const Option = Select.Option

export const getTargetOptions0 = () => TARGET_OPTIONS_0

export function loadIndustryOptions(id) {
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
  return request('/api/bk/getIndustryType', {
    method: 'POST',
    body: {in_p: id},
  });
}
