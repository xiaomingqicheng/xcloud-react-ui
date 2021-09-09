import React, { Component } from "react";
import {Form} from "antd";
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
            message.success('创建成功');
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
                <Button onClick={ this.showAddRegistry } type={"primary"}>添加镜像仓库</Button>
                <Modal
                    title="添加环境"
                    onOk={this.handleAddSubmit}
                    onCancel={this.handleAddCancel.bind(this)}
                    visible={this.state.addvisible}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="镜像仓库名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="所属环境">
                            {getFieldDecorator('envvalue', {
                                rules: [{ required: true, message: '请选着环境!' }],
                            })(
                                <Select >
                                    {this.state.envlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="所属集群">
                            {getFieldDecorator('clustervalue', {
                                rules: [{ required: true, message: '请选着集群名称!' }],
                            })(
                                <Select >
                                    {this.state.clusterlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="仓库域名">
                            {getFieldDecorator('domain', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="数据路径">
                            {getFieldDecorator('path', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                                <Input
                                />
                            )}
                            <Tag color="blue">需要在每个node节点上事先创建此目录并通过共享存储挂载</Tag>
                        </Form.Item>
                        <Form.Item label="是否SSL">
                            {getFieldDecorator('ssl', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
                            })(
                            <Radio.Group onChange={onChange} defaultValue={true} >
                                <Radio value={true}>启用</Radio>
                                <Radio value={false}>禁用</Radio>
                            </Radio.Group>
                            )}
                        </Form.Item>
                        {this.state.ifshow? (
                        <Form.Item  label="仓库证书">
                            {getFieldDecorator('cert_id', {
                                rules: [{ required: true, message: '请输入集群名称!' }],
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