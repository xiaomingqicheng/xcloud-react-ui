import React, { Component,useState }from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import AppComponent from "../appmanage";
import {Button, Form, Input, message, Modal, Select, Space} from "antd";
import { postConfigmap } from "../../../../api/configmap";
import {getCluster} from "../../../../api/cluster";

class ConfigComponent extends Component {
    formConfigmapRef = React.createRef();
    state = {
        configmapvisible: false,
        clusterlist: [],
    };
    showModal = () => {
        this.setState({configmapvisible: true})
        getCluster().then((response) => {
            this.setState({ loading: false });
            this.setState({ clusterlist: response.data });
        })
    };
    handleSubmitConfigmap = () => {
        console.log(this.formConfigmapRef.current.getFieldsValue())
        postConfigmap(this.formConfigmapRef.current.getFieldsValue()).then( res => {
            message.success('创建成功');
            this.setState({
                configmapvisible: false,
            });
        })
    };
    handleCancel = () => {
        this.setState({configmapvisible: false})
    };
    fetchNamespace = (cluster) => {
        console.log(cluster,'ooooooooo')
    };
    render() {
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };
        return (
            <div className={"app-container"}>
                <Button type={"primary"} onClick={this.showModal}>创建Configmap</Button>
                <Modal
                    title="创建configmap"
                    onOk={this.handleSubmitConfigmap}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.configmapvisible}
                    width={800}
                    okText={"下一步"}
                >
                <Form {...formItemLayout}  ref={this.formConfigmapRef}>
                    <Form.Item label="选择集群" name="cluster">
                        <Select onChange={this.fetchImages} >
                            {this.state.clusterlist.map(item => (
                                <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="选择名称空间" name="cluster">
                        <Select onChange={this.fetchImages} >
                            {this.state.clusterlist.map(item => (
                                <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="名称" name="configmapname">
                        <Input  placeholder="请输入名称"  style={{ width:150,}} />
                    </Form.Item>
                    <Form.Item label="键值对">
                        <Form.List  name="keyvalue"  >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <Space key={key}  align="baseline">
                                            <Form.Item
                                                style={{ marginBottom: "0px" }}
                                                {...restField}
                                                name={[name, 'key']}
                                                fieldKey={[fieldKey, 'first']}
                                                rules={[{ required: true, message: 'Missing first name' }]}
                                            >
                                                <Input size="small" placeholder="键"  style={{ width:150,}} />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ marginBottom: "0px" }}
                                                {...restField}
                                                name={[name, 'value']}
                                                fieldKey={[fieldKey, 'last']}
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >
                                                <Input size="small" placeholder="值" style={{ width:300 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button style={{ width:300 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            添加配置项
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        )
    }
}

export default (ConfigComponent);