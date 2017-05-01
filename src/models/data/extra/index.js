import * as extraService from '../../../services/extraService';
import * as dataService from '../../../services/shareService';

export default {
  namespace: 'data/extra',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    saveTargetOptions(state, {payload}) {
      const newState = state
      newState[`targetOptions${payload.level}`] = payload.data
      return {...newState};
    },
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },
  },
  effects: {
    *getIndustry({payload}, {call, put}) {
      const {data, headers} = yield call(
        extraService.loadIndustryOptions,
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
    *fetch({payload: {page = 1}}, {call, put}) {
      const {data, headers} = yield call(extraService.fetch, {page});
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({payload: id}, {call, put}) {
      yield call(extraService.remove, id);
      yield put({type: 'reload'});
    },
    *patch({payload: {id, values}}, {call, put}) {
      yield call(extraService.patch, id, values);
      yield put({type: 'reload'});
    },
    *create({payload: values}, {call, put}) {
      yield call(extraService.create, values);
      yield put({type: 'reload'});
    },
    *reload(action, {put, select}) {
      const page = yield select(state => state['data/extra'].page);
      yield put({type: 'fetch', payload: {page}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/data/extra') {
          //额外对象列表数据
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  },
};

