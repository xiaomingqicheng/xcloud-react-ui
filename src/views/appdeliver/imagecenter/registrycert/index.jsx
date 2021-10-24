import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Button, Modal, Input, message, Select} from "antd";
import {postCert} from "../../../../api/cert";
import  CertTable  from './table'
import {putCluster} from "../../../../api/cluster";



const { TextArea } = Input;
class RegistrycertComponent extends Component {
    state =  {
        addvisible: false,
        editvisible: false,
    };

    showAddCert = () => {
        this.setState({addvisible: true});
        this.props.form.setFieldsValue({
            id:'',
            remark:'',
        })
    };
    showEdit(row){
        this.setState({
            editvisible: true,})
        this.props.form.setFieldsValue({
            id:row.Id,
            remark:row.Remark,
        })
    };
    handleAddSubmit = e => {
        const formData = this.props.form.getFieldsValue();
        console.log(formData, 'iiiiiiiiiiii');
        postCert(formData).then(res => {
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
    handleAddCancel = () => {
        this.setState({addvisible: false})
    };
    handleEditCancel = () => {
        this.setState({editvisible: false})
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
            <div className={"app-container"}>
                <Button onClick={ this.showAddCert } type={"primary"}>添加Registry证书</Button>
                <Modal
                    title="添加证书"
                    onOk={this.handleAddSubmit}
                    onCancel={this.handleAddCancel.bind(this)}
                    visible={this.state.addvisible}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="备注">
                            {getFieldDecorator('remark', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="证书">
                            {getFieldDecorator('crt', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <TextArea
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="私钥">
                            {getFieldDecorator('key', {
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
                        <Form.Item label="证书域名">
                            {getFieldDecorator('remark', {
                                rules: [{ required: true }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                    </Form>
                    </Modal>
                <CertTable showedit={this.showEdit.bind(this)}/>
            </div>
        )}
}


export default Form.create()(RegistrycertComponent);