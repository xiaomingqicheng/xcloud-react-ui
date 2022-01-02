import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Input, message, Select } from "antd";
import { postCluster,putCluster } from "../../../api/cluster";
import ClusterTable from "./table";
import {getEnv} from "../../../api/env";
import {Terminal} from "xterm";
const { TextArea } = Input

class ClusterComponent extends Component {
    state = {
        addvisible: false,
        editvisible: false,
        envlist: [],
        id: '',
        name: '',
        env: '',
        apiserver_ip: '',
        apiserver_port: '',
        cacrt: '' ,
        publickey: '',
        privitekey: ''
    };
    showAddModal = () => {
        this.setState({
            addvisible: true,
        });
        this.props.form.setFieldsValue({
            id: '',
            name: '',
            env: '',
            apiserver_ip: '',
            apiserver_port: '',
            cacrt: '' ,
            publickey: '',
            privitekey: ''});
    };

    handleSubmit = e => {
        const formData = this.props.form.getFieldsValue();
        console.log(formData, 'iiiiiiiiiiii');
        postCluster(formData).then(res => {
            message.success('创建成功');
            this.setState({
                visible: false,
            });
        })
    };

    handleEditSubmit = e => {
        const formData = this.props.form.getFieldsValue();
        const id = this.state.id;
        putCluster(id, formData).then(res => {
            message.success('修改成功');
            this.setState({
                editvisible: false,
            });
        })
    };

    showEdit(row){
        this.setState({
            editvisible: true,})
        this.props.form.setFieldsValue({
            id:row.Id,
            name:row.Name,
            env:row.Env[0].Id,
            apiserver_ip:row.Apiserver_ip,
            apiserver_port:row.Apiserver_port,
            cacrt:row.Cacrt ,
            publickey:row.Publickey,
            privitekey:row.Privitekey
        })
    };

    handleAddCancel() {
        this.setState({
            addvisible: false
        })
    };

    handleEditCancel() {
        this.setState({
            editvisible: false
        });
        this.props.form.resetFields();
    };

    componentDidMount() {
        getEnv().then( res => {
            this.setState({envlist: res.data})
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };



        return(
            <div className="app-container">
                <Button type="primary" onClick={this.showAddModal} >
                    添加集群
                </Button>

                <Modal
                    title="添加环境"
                    onOk={this.handleSubmit}
                    onCancel={this.handleAddCancel.bind(this)}
                    visible={this.state.addvisible}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="集群名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="所属环境">
                            {getFieldDecorator('env', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Select >
                                    {this.state.envlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Master IP">
                            {getFieldDecorator('apiserver_ip', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Api 端口">
                            {getFieldDecorator('apiserver_port', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="CA证书">
                            {getFieldDecorator('cacrt', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <TextArea
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="公钥内容">
                            {getFieldDecorator('publickey', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <TextArea type="textarea"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="私钥内容">
                            {getFieldDecorator('privitekey', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <TextArea
                                />
                            )}
                        </Form.Item>
                    </Form>

                </Modal>
                <Modal
                    title="修改集群"
                    onOk={this.handleEditSubmit}
                    onCancel={this.handleEditCancel.bind(this)}
                    visible={this.state.editvisible}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="集群名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.name,
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="所属环境">
                            {getFieldDecorator('env', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.env,
                            })(
                                <Select >
                                    {this.state.envlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Master IP">
                            {getFieldDecorator('apiserver_ip', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.apiserver_ip,
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Api 端口">
                            {getFieldDecorator('apiserver_port', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.apiserver_port,
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="CA证书">
                            {getFieldDecorator('cacrt', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.cacrt
                            })(
                                <TextArea
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="公钥内容">
                            {getFieldDecorator('publickey', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.publickey
                            })(
                                <TextArea type="textarea"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="私钥内容">
                            {getFieldDecorator('privitekey', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                                initialValue: this.state.privitekey
                            })(
                                <TextArea
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
                <ClusterTable showedit={this.showEdit.bind(this)}/>
            </div>
        )
    }
}

export default Form.create()(ClusterComponent);