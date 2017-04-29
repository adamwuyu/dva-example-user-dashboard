import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import styles from './MainLayout.css';

const {Content, Sider, Header} = Layout;

function MainLayout({children, title}) {
  return (
    <Layout className={styles.full_container}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/single-data-list" className={styles.nav_text}>
              <Icon type="user"/>
              <span>1-1单一数据列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/single-data-add" className={styles.nav_text}>
              <Icon type="user"/>
              <span>1-2单一数据添加</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="21">
            <Link to="/single-group-list" className={styles.nav_text}>
              <Icon type="user"/>
              <span>2-1单组数据列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="22">
            <Link to="/single-group-add" className={styles.nav_text}>
              <Icon type="user"/>
              <span>2-2单组数据添加</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/extra-list" className={styles.nav_text}>
              <Icon type="user"/>
              <span>0-1额外对象列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/extra-add" className={styles.nav_text}>
              <Icon type="user"/>
              <span>0-2额外对象添加</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="03">
            <Link to="/dimension-list" className={styles.nav_text}>
              <Icon type="user"/>
              <span>0-4数据名称列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/dimension-add" className={styles.nav_text}>
              <Icon type="user"/>
              <span>0-4数据名称添加</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.right_header_container}>
          <div className={styles.right_header}>
            {title}
          </div>
          {/*<Route path="/"*/}
          {/*render={(props) => (<RightHeader {...props} title={sysReducer.title}/>)}/>*/}
        </Header>
        <Content className={styles.content_container}>
          {children}
        </Content>
      </Layout>
      {/*<div className={styles.loader_spin} style={{display: sysReducer.showLoader ? '' */}
      {/*: 'none'}}>*/}
      {/*<Spin />*/}
      {/*</div>*/}
    </Layout>
  );
}

export default MainLayout;
