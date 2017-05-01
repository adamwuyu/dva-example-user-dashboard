import React, {Component} from 'react';
import {Modal, Form, Input, Select} from 'antd';

const Option = Select.Option
const FormItem = Form.Item;

class ExtraEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {name, targetTypeName, targetName} = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="编辑额外对象"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="额外对象名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{
                    required: true, message: '请输入对象名称',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="选择类型"
            >
              {
                getFieldDecorator('target0', {
                  initialValue: name,
                  rules: [{
                    required: true, message: '选择类型',
                  }],
                })(
                  <Select showSearch placeholder="请选择类型">
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>,
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属类型"
            >
              {
                getFieldDecorator('targetTypeName', {
                  initialValue: targetTypeName,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属对象"
            >
              {
                getFieldDecorator('targetName', {
                  initialValue: targetName,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ExtraEditModal);
