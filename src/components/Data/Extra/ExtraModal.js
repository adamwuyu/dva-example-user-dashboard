import React, {Component} from 'react';
import {Modal, Form, Input, Select} from 'antd';

const Option = Select.Option
const FormItem = Form.Item;

class ExtraEditModal extends Component {

  constructor(props) {
    super(props);
    // this.props.getIndustry(0)

    this.state = {
      visible: false,
    };
  }

  onTarget0Change = (value) => {
    // this.props.load
  }

  onTarget1Change = (value) => {
    // this.props.load
  }

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  render() {
    const {children, targetOptions0, targetOptions1} = this.props;
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
            <FormItem {...formItemLayout} label="选择类型">
              {
                getFieldDecorator('target0', {
                  initialValue: name,
                  rules: [{
                    required: true, message: '选择类型',
                  }],
                })(
                  <Select
                    showSearch
                    placeholder="请选择类型"
                    onChange={this.onTarget0Change.bind(this)}
                  >
                    {targetOptions0}
                  </Select>,
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="一级分类">
              {
                getFieldDecorator('target1', {
                  initialValue: name,
                  rules: [{
                    required: true, message: '请选择一级分类',
                  }],
                })(
                  <Select
                    showSearch
                    placeholder="请选择一级分类"
                    onChange={this.onTarget1Change.bind(this)}
                  >
                    {targetOptions1}
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
