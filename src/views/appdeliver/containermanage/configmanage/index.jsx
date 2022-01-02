import React, { Component,useState }from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import AppComponent from "../appmanage";
import {Button, Divider, Form, Input, message, Modal, Select, Space, Table} from "antd";
import { postConfigmap,getNamespace,getConfigmap } from "../../../../api/configmap";
import {getCluster} from "../../../../api/cluster";

class ConfigComponent extends Component {
    formConfigmapRef = React.createRef();
    state = {
        configmapData: [],
        configmapvisible: false,
        clusterlist: [],
        namespaceList: {'items': []}
    };

    fetchConfimapData = () => {
        getConfigmap().then(res => {
            this.setState({
                configmapData: res.data
            })
        })
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
    fetchNamespace = (cluster_id) => {
        const data = {'cluster_id': cluster_id}
        getNamespace(data).then(res => {
            this.setState({
                namespaceList: res.data,
            });
            console.log(this.state.namespaceList)
        })
    };
    componentDidMount() {
        this.fetchConfimapData();
    }
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
                {/*<Table dataSource={this.state.configmapData}>*/}
                    {/*<Column title="Id" dataIndex="Id" key="Id"  align="center"/>*/}
                    {/*<Column title="环境名称"  align="center"/>*/}
                    {/*<Column title="集群名称"   align="center"/>*/}
                    {/*<Column title="ConfigMap数量"  align="center"/>*/}
                    {/*<Column title="操作" key="action" align="center" render={row => (*/}
                    {/*    <span>*/}
                    {/*        <Button type="primary"  onClick={e => this.handleshowEdit(e, row)}>详情</Button>*/}
                    {/*    </span>*/}
                    {/*)}/>*/}
                {/*</Table>*/}
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
                        <Select onChange={this.fetchNamespace} >
                            {this.state.clusterlist.map(item => (
                                <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="选择名称空间" name="namespace">
                        <Select onChange={this.fetchImages} >
                            {this.state.namespaceList.items.map(item => (
                                <Select.Option value={item.metadata.name} key={item.metadata.name}>{item.metadata.name}</Select.Option>
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