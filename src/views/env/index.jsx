import React, { Component } from "react";
import {Button, Form, Modal, Input, Icon, message} from "antd";
import { postEnv } from '../../api/env'
import EnvTable from "./table";
class EnvComponent extends Component {
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleSubmit = e => {
        console.log(e);
        const formData = this.props.form.getFieldsValue();
        postEnv(formData).then(res => {
            message.success('创建成功');
            this.setState({
                visible: false,
            });
        })

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="app-container">
                <Button type="primary" onClick={this.showModal} >
                    添加环境
                </Button>
                <Modal
                    title="添加环境"
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                >
                <Form  className="login-form">
                    <Form.Item label="环境名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入环境名称!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="name"
                            />
                        )}
                    </Form.Item>
                </Form>
                </Modal>
                <EnvTable></EnvTable>
            </div>
        )
    }
}
export default Form.create()(EnvComponent);