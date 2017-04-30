import React from 'react';
import { connect } from 'dva';
import styles from './Extra.css';
import ExtraComponent from '../components/Extra/Extra';
import MainLayout from '../components/MainLayout/MainLayout';

function Extra({ location }) {  //location由框架代入，无显式定义
  return (
    <MainLayout title="Hello world">
      <div className={styles.normal}>
        <ExtraComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Extra);
