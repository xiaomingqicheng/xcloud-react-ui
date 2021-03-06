import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Button, Modal, Input, message, Select, Tag, Radio} from "antd";
import {getCert, postCert} from "../../../../api/cert";
import {postRegistry} from "../../../../api/registry";
import {getCluster} from "../../../../api/cluster";
import {getEnv} from "../../../../api/env";
import RegistryTable from "./table";
import TagList from "../../../layout/TagsView/components/TagList";

class RegistryComponent extends Component {
    state =  {
        addvisible: false,
        clusterlist:[],
        certlist:[],
        envlist: [],
        ifshow: false
    };
    componentDidMount() {
        this.fetchCertData();
        this.fetchClusterData();
        this.fetchEnvData();
    };
    fetchCertData() {
        getCert().then( res => {
            this.setState({certlist: res.data})
        })
    };
    fetchClusterData() {
        getCluster().then( res => {
            this.setState({clusterlist: res.data})
        })
    };
    fetchEnvData() {
        getEnv().then( res => {
            this.setState({envlist: res.data})
        })
    };
    showAddRegistry = () => {
        this.setState({addvisible: true})
    };
    handleAddSubmit = () => {
        const formData = this.props.form.getFieldsValue();
        console.log(formData, 'iiiiiiiiiiii');
        postRegistry(formData).then(res => {
            message.success('εε»Ίζε');
            this.setState({
                visible: false,
            });
        })
        this.setState({addvisible: false})
    };
    handleAddCancel = () => {
        this.setState({addvisible: false})
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
        const onChange = e => {
            this.setState({ifshow: e.target.value});
        };
        return(
            <div className="app-container">
                <Button onClick={ this.showAddRegistry } type={"primary"}>ζ·»ε ιεδ»εΊ</Button>
                <Modal
                    title="ζ·»ε η―ε’"
                    onOk={this.handleAddSubmit}
                    onCancel={this.handleAddCancel.bind(this)}
                    visible={this.state.addvisible}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="ιεδ»εΊεη§°">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'θ―·θΎε₯ιηΎ€εη§°!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="ζε±η―ε’">
                            {getFieldDecorator('envvalue', {
                                rules: [{ required: true, message: 'θ―·ιηη―ε’!' }],
                            })(
                                <Select >
                                    {this.state.envlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="ζε±ιηΎ€">
                            {getFieldDecorator('clustervalue', {
                                rules: [{ required: true, message: 'θ―·ιηιηΎ€εη§°!' }],
                            })(
                                <Select >
                                    {this.state.clusterlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="δ»εΊεε">
                            {getFieldDecorator('domain', {
                                rules: [{ required: true, message: 'θ―·θΎε₯ιηΎ€εη§°!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="ζ°ζ?θ·―εΎ">
                            {getFieldDecorator('path', {
                                rules: [{ required: true, message: 'θ―·θΎε₯ιηΎ€εη§°!' }],
                            })(
                                <Input
                                />
                            )}
                            <Tag color="blue">ιθ¦ε¨ζ―δΈͺnodeθηΉδΈδΊεεε»Ίζ­€η?ε½εΉΆιθΏε±δΊ«ε­ε¨ζθ½½</Tag>
                        </Form.Item>
                        <Form.Item label="ζ―ε¦SSL">
                            {getFieldDecorator('ssl', {
                                rules: [{ required: true, message: 'θ―·θΎε₯ιηΎ€εη§°!' }],
                            })(
                            <Radio.Group onChange={onChange} defaultValue={true} >
                                <Radio value={true}>ε―η¨</Radio>
                                <Radio value={false}>η¦η¨</Radio>
                            </Radio.Group>
                            )}
                        </Form.Item>
                        {this.state.ifshow? (
                        <Form.Item  label="δ»εΊθ―δΉ¦">
                            {getFieldDecorator('cert_id', {
                                rules: [{ required: true, message: 'θ―·θΎε₯ιηΎ€εη§°!' }],
                            })(
                                <Select >
                                    {this.state.certlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Remark}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>):<div></div>}
                    </Form>
                </Modal>
                <RegistryTable></RegistryTable>
            </div>
        )
    }
}

export default Form.create()(RegistryComponent);