import React, { Component } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import styles from './UserModal.css';

const FormItem = Form.Item;
const Option = Select.Option;

class UserModal extends Component {
  componentDidMount() {
    // role 列表
    this.props.dispatch({
      type: 'users/getRoles'
    })
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.dispatch({
      type: 'users/openModal',
      payload: {}
    })
  };

  hideModelHandler = () => {
    this.props.dispatch({
      type: 'users/closeModal'
    })
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.role = Number(values.role);
        values.divideInterestRatio = Number(values.divideInterestRatio);
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  render() {
    const { children, record, rolesList, modalIsOpen } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, password } = this.props.record;
    const isCreate = !record.id ;

    // console.log('roels length： %i  添加客户：%o', rolesList.length, record.allowAddCustomer);

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <span className={styles.normal}>
        <span onClick={this.showModelHandler}>
          { children }
        </span>

        {
          modalIsOpen &&
          <Modal
            title={ isCreate ? '添加用户' : '修改用户信息' }
            visible={modalIsOpen}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
            width={430}
          >
            <Form id="userModalForm">
              {
                isCreate ?
                  <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                  >
                    { getFieldDecorator('name', {
                      initialValue: name,
                      rules: [
                        {required: true, message: '请输入用户名'}
                      ]
                    })(<Input size='default'/>)}
                  </FormItem> :
                  <FormItem
                    {...formItemLayout}
                    label="用户名"
                  >
                    {
                      getFieldDecorator('name', {
                        initialValue: name,
                      })(<Input size='default' readOnly/>)
                    }
                  </FormItem>
              }
              {
                isCreate ?
                  (<div>
                    <FormItem
                      {...formItemLayout}
                      label="密码"
                      hasFeedback
                    >
                      {
                        getFieldDecorator('password', {
                          initialValue: password,
                          rules: [
                            {required: true, message: '请输入密码'},
                            {type: 'string', min: 6}
                          ]
                        })(<Input size='default' type='password'/>)
                      }
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="确认密码"
                      hasFeedback
                    >
                      {
                        getFieldDecorator('confirmPassword', {
                          rules: [
                            {required: true, message: '确认密码'},
                            {
                              validator: (rule, value, callback) => {
                                const form = this.props.form;
                                if (value && value !== form.getFieldValue('password')) {
                                  callback('Two passwords that you enter is inconsistent!');
                                } else {
                                  callback();
                                }
                              }
                            }
                          ]
                        })(<Input size='default' type='password'/>)
                      }
                    </FormItem>
                  </div>) : null
              }
              <fieldset style={{padding: 5}}>
                <lagend>详细信息</lagend>
                <FormItem
                  {...formItemLayout}
                  label="角色"
                  hasFeedback
                >
                  {
                    getFieldDecorator('role', {
                      initialValue: record.role && record.role.id.toString(),
                      rules: [
                        {required: true, message: '请选择角色'}
                      ]
                    })(
                      <Select size='default' getPopupContainer={() => document.getElementById('userModalForm')}>
                        {rolesList.map(v => <Option key={`role_${v.id}`} value={v.id.toString()}>{v.name}</Option>)}
                      </Select>
                    )
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="用户类型"
                  hasFeedback
                >
                  {
                    getFieldDecorator('userType', {
                      initialValue: record.userType,
                      rules: [
                        {required: true, message: '请选择用户类型'}
                      ]
                    })(
                      <Select size='default' getPopupContainer={() => document.getElementById('userModalForm')}>
                        <Option value='口岸'>口岸</Option>
                        <Option value='LOGI'>LOGI</Option>
                        <Option value='GLOBAL'>GLOBAL</Option>
                        <Option value='VIETNAM'>VIETNAM</Option>
                        <Option value='INDIA'>INDIA</Option>
                      </Select>
                    )
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="利润归属"
                >
                  {
                    getFieldDecorator('profitAttribution', {
                      initialValue: record.profitAttribution,
                    })(<Select size='default' getPopupContainer={() => document.getElementById('userModalForm')}>
                      <Option value='TONGXIN'>TONGXIN</Option>
                      <Option value='LOGI'>LOGI</Option>
                      <Option value='GLOBAL'>GLOBAL</Option>
                      <Option value='VIETNAM'>VIETNAM</Option>
                      <Option value='INDIA'>INDIA</Option>
                    </Select>)
                  }
                </FormItem>
                <FormItem
                  {...{
                    labelCol: {span: 8},
                    wrapperCol: {span: 16},
                  }}
                  label="是否允许添加客户"
                >
                  {
                    getFieldDecorator('allowAddCustomer', {
                      valuePropName: 'checked',
                      initialValue: record.allowAddCustomer,
                    })(<Switch checkedChildren='是' unCheckedChildren='否'/>)
                  }
                </FormItem>
                <FormItem
                  {...{
                    labelCol: {span: 8},
                    wrapperCol: {span: 16},
                  }}
                  label="是否手动"
                >
                  {
                    getFieldDecorator('isManual', {
                      valuePropName: 'checked',
                      initialValue: record.isManual,
                    })(<Switch checkedChildren='是' unCheckedChildren='否'/>)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="分利比例(%)"
                >
                  {
                    getFieldDecorator('divideInterestRatio', {
                      initialValue: record.divideInterestRatio,
                    })(<Input type='number' size='default' min="0"/>)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Min额"
                >
                  {
                    getFieldDecorator('regularQuota', {
                      initialValue: record.regularQuota,
                    })(<Input type='number' size='default' min="0"/>)
                  }
                </FormItem>
              </fieldset>
            </Form>
          </Modal>
        }
      </span>
    )
  }
}

export default Form.create()(UserModal);
