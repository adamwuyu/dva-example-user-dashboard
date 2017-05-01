import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Extra.css';
import { PAGE_SIZE } from '../../../constants';
import ExtraModal from './ExtraModal';

function Extra({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'data/extra/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/data/extra',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'data/extra/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'data/extra/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: '额外对象名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属类型',
      dataIndex: 'targetTypeName',
      key: 'targetTypeName',
    },
    {
      title: '所属对象',
      dataIndex: 'targetName',
      key: 'targetName',
    },
    {
      title: '编辑',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ExtraModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </ExtraModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <ExtraModal record={{}} onOk={createHandler}>
            <Button type="primary">添加额外对象</Button>
          </ExtraModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state['data/extra'];
  return {
    loading: state.loading.models['data/extra'],
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Extra);
