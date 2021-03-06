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
            message.success('εε»Ίζε');
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
                <Button type={"primary"} onClick={this.showModal}>εε»ΊConfigmap</Button>
                {/*<Table dataSource={this.state.configmapData}>*/}
                    {/*<Column title="Id" dataIndex="Id" key="Id"  align="center"/>*/}
                    {/*<Column title="η―ε’εη§°"  align="center"/>*/}
                    {/*<Column title="ιηΎ€εη§°"   align="center"/>*/}
                    {/*<Column title="ConfigMapζ°ι"  align="center"/>*/}
                    {/*<Column title="ζδ½" key="action" align="center" render={row => (*/}
                    {/*    <span>*/}
                    {/*        <Button type="primary"  onClick={e => this.handleshowEdit(e, row)}>θ―¦ζ</Button>*/}
                    {/*    </span>*/}
                    {/*)}/>*/}
                {/*</Table>*/}
                <Modal
                    title="εε»Ίconfigmap"
                    onOk={this.handleSubmitConfigmap}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.configmapvisible}
                    width={800}
                    okText={"δΈδΈζ­₯"}
                >
                <Form {...formItemLayout}  ref={this.formConfigmapRef}>
                    <Form.Item label="ιζ©ιηΎ€" name="cluster">
                        <Select onChange={this.fetchNamespace} >
                            {this.state.clusterlist.map(item => (
                                <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="ιζ©εη§°η©Ίι΄" name="namespace">
                        <Select onChange={this.fetchImages} >
                            {this.state.namespaceList.items.map(item => (
                                <Select.Option value={item.metadata.name} key={item.metadata.name}>{item.metadata.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="εη§°" name="configmapname">
                        <Input  placeholder="θ―·θΎε₯εη§°"  style={{ width:150,}} />
                    </Form.Item>
                    <Form.Item label="ι?εΌε―Ή">
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
                                                <Input size="small" placeholder="ι?"  style={{ width:150,}} />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ marginBottom: "0px" }}
                                                {...restField}
                                                name={[name, 'value']}
                                                fieldKey={[fieldKey, 'last']}
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >
                                                <Input size="small" placeholder="εΌ" style={{ width:300 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button style={{ width:300 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            ζ·»ε ιη½?ι‘Ή
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