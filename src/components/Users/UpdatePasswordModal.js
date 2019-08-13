import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

function UpdatePasswordModal({ dispatch, onOk, modalIsOpen, record, form }) {
  const { getFieldDecorator, validateFields } = form;

  function hideModelHandler() {
    dispatch({
      type: 'users/closeUpdatePasswordModal'
    })
  }

  function okHandler() {
    validateFields((err, values) => {
      if (!err) {
        onOk({ ...values, name: record.name });
        hideModelHandler();
      }
    });
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <span>
        {
          modalIsOpen &&
          <Modal
            title={ `修改用户: ${record.name} 密码` }
            visible={modalIsOpen}
            onOk={okHandler}
            onCancel={hideModelHandler}
            width={330}
          >
            <Form>
              <FormItem
                {...formItemLayout}
                label="旧密码"
              >
                {
                  getFieldDecorator('oldPassword', {
                    rules: [
                      { required: true, pattern: /^([a-zA-Z0-9]{6,})$/i,  message: '密码应该包含字母和数字并至少有6位' },
                    ]
                  })(<Input type='password' size='default' placeholder="密码" />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="新密码"
              >
                {
                  getFieldDecorator('newPassword', {
                    rules: [
                      { required: true, pattern: /^([a-zA-Z0-9]{6,})$/i,  message: '密码应该包含字母和数字并至少有6位' },
                    ]
                  })(<Input type='password' size='default' placeholder="密码" />)
                }
              </FormItem>
            </Form>
          </Modal>
        }
      </span>
  )
}


export default Form.create()(UpdatePasswordModal);
