import React from 'react'
import {Select} from 'antd'

export const PAGE_SIZE = 10;

//额外对象类型
const Option = Select.Option
export const TARGET0 = [
  {key: '4', value: '产品', subs: [1, 2, 3]},
  {key: '5', value: '科技', subs: [1, 2, 3]},
  {key: '6', value: '项目', subs: [1, 2, 3]},
  {key: '7', value: '事件', subs: [1, 2, 3]},
  {key: '11', value: '关键词', subs: [1, 2, 3]},
  {key: '12', value: '行业类型', subs: [1, 2]},
  {key: '13', value: '额外对象', subs: [3]},
  {key: '14', value: '通用类', subs: [3]},
]

export const TARGET_OPTIONS_0 = TARGET0.map(item => (
  <Option key={item.key} value={item.key}>{item.value}</Option>
))
