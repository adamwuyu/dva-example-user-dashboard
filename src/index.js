import React from 'react'
import dva from 'dva';
import {browserHistory} from 'dva/router';
import createLoading from 'dva-loading';
import {message, Select} from 'antd';
import {TARGET0} from './constants'
import * as shareService from './services/shareService';
import './index.html';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒
const Option = Select.Option

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());


// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 6. 创建全局model来处理（获取、保存）全局状态
app.model({
  namespace: 'share',
  state: {
    target0: TARGET0,
    targetOptions0: shareService.getTargetOptions0(),
  },
  reducers: {
    saveTargetOptions(state, {payload}) {
      console.log(payload)
      const result = payload.data.map(item => (
        <Option key={item.in_id} value={`${item.in_id}`}>{item.in_cn}</Option>
      ))

      const newState = state
      newState[`targetOptions${payload.level}`] = result
      return {...newState};
    },
  },
  effects: {
    *getIndustry({payload}, {call, put}) {
      const {data, headers} = yield call(
        shareService.loadIndustryOptions,
        payload.id,
      );
      yield put({
        type: 'saveTargetOptions',
        payload: {
          level: payload.level,
          data,
        },
      });
    },
  },
});


//一级产业分类（页面初始化时发送一次Action）
app._store.dispatch({type: 'share/getIndustry', payload: {level: 1, id: 0}})
