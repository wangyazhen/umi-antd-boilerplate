import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Modal, Popconfirm, Button, Icon, Dropdown, Menu } from 'antd';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';
import UpdatePasswordModal from './UpdatePasswordModal';

function Users({ dispatch, usersList, rolesList, loading, modalIsOpen, currentUser, updatePasswordModalIsOpen }) {
  // console.log('users page --> %o : loading --> %o', loading);

  function deleteHandler(id) {
    console.log(`remove:${id}`);
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }


  function showCreate() {
    dispatch({
      type: 'users/openModal',
      payload: {}
    })
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/update',
      payload: { id, values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: { values },
    });
  }
  function pageChangeHandler(page) {
    console.log('pageChangeHandler page -->:', page);
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }));
  }

  const menuOptions = [
    { key: 'update',    name: '修改用户'},
    { key: 'del',       name: '删除用户'},
    { key: 'updatePwd', name: '修改密码'},
    { key: 'resetPwd',  name: '重置密码'}
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '角色',
      dataIndex: 'role.name',
      key: 'row'
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      key: 'userType'
    },
    {
      title: '利润归属',
      dataIndex: 'profitAttribution',
      key: 'profitAttribution',
    },
    {
      title: '分利比例',
      dataIndex: 'divideInterestRatio',
      key: 'divideInterestRatio',
    },
    {
      title: 'Min额',
      dataIndex: '',
      key: ''
    },
    {
      title: '是否允许添加客户',
      dataIndex: 'allowAddCustomer',
      key: 'allowAddCustomer',
      render: v => v ? '是' : '否'
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Dropdown
            overlay={
              <Menu onClick={(e) => { onMenuClick(record, e) }}>
                {menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
              </Menu>
            }
          >
            <Button style={{ border: 'none' }}>
              <Icon style={{ marginRight: 2 }} type="bars" />
              <Icon type="down" />
            </Button>
          </Dropdown>
        </span>
      )
    },
  ];

  function onMenuClick(record, item) {
    if (item.key === 'del') {
      Modal.confirm({
        title: '你确定要删除',
        onOk() {
          deleteHandler(record.id)
        }
      });
    } else if (item.key === 'update') {
      dispatch({
        type: 'users/openModal',
        payload: record
      })
    } else if (item.key === 'updatePwd') {
      dispatch({
        type: 'users/openUpdatePasswordModal',
        payload: record
      })
    } else if (item.key === 'resetPwd') {
      Modal.confirm({
        title: '你确定要重置该账号密码',
        onOk() {
          console.log('重置----', record.id);
          dispatch({
            type: 'users/initializePassword',
            payload: record.id
          })
        }
      });
    }
  }

  const userModalProps = {
    modalIsOpen,
    rolesList,
    dispatch,
    record: currentUser,
    onOk: data => {
      if (currentUser.id) {
        editHandler(currentUser.id, data)
      } else {
        createHandler(data)
      }
    }
  };

  const updatePasswordModalProps = {
    modalIsOpen: updatePasswordModalIsOpen,
    dispatch,
    record: currentUser,
    onOk: data => {
      dispatch({
        type: 'users/doUpdatePassword',
        payload: data
      })
    }
  };

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <Button type='primary' onClick={showCreate}>创建用户</Button>
        </div>
        <Table
          columns={columns}
          size="small"
          loading={loading}
          dataSource={usersList}
          rowKey={record => record.id}
          pagination={false}
        />

        <UserModal
          {...userModalProps}
        />
        <UpdatePasswordModal
          {...updatePasswordModalProps}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { usersList, total, page, rolesList, modalIsOpen, currentUser, updatePasswordModalIsOpen } = state.users;
  return {
    rolesList,
    usersList,
    currentUser,
    modalIsOpen,
    updatePasswordModalIsOpen,
    total, page,
    loading: state.loading.models.users
  };
}

export default connect(mapStateToProps)(Users);
