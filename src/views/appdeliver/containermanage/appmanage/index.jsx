import React, { Component } from "react";
import {Form} from "antd";
import {Button, Modal, Input, message, Select, Icon, Radio, Steps, Divider} from "antd";
import AppTable from "./table";
import {getCluster} from "../../../../api/cluster";
import {getClusterImages} from "../../../../api/app";
const { Step } = Steps;
let id = 0;

class AppComponent extends Component {
    state = {
        onevisible: false,
        twovisible: false,
        clusterlist: [],
        imageslist: [],
        selectOption: [{ label: 'Deployment', value: 1 }, { label: 'DaemonSet', value: 2 }, { label: 'StatefulSet', value: 3}],
        selectedValue: ''
    };
    selectOnChange = () => {
      console.log('111')
    }
    ;
    showModal = () => {
        this.setState({onevisible: true})
        getCluster().then((response) => {
            this.setState({ loading: false });
            this.setState({ clusterlist: response.data });
        });
    };
    fetchImages = (value) => {
        const params = {'clusterId': value}
        getClusterImages(params).then((response) => {
            this.setState({ imageslist: response.data.repositories})
        })
    };
    handleCancel = () => {
        this.setState({onevisible: false})
    };
    handleSubmitOne = () => {
        this.setState({onevisible: false, twovisible: true})
    };
    handleSubmitTwo = () => {
        this.setState({onevisible: false})
    };



    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })(<Input placeholder="passenger name" style={{ width: '50%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return(
            <div className={"app-container"}>
              <Button type={"primary"} onClick={this.showModal}>创建应用</Button>
              <AppTable/>
                <Modal
                    title="选择镜像"
                    onOk={this.handleSubmitOne}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.onevisible}
                    width={800}
                    okText={"下一步"}
                >
                    <Steps
                        size="small"
                        current={0}
                        onChange={this.onChange}
                        className="site-navigation-steps"
                    >
                        <Step status="process" title="选择镜像" />
                        <Step status="wait" title="基本设置" />
                        <Step status="wait" title="网络设置" />
                        <Step status="wait" title="高级设置"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout} >
                        <Form.Item label="集群名称">
                            {getFieldDecorator('cluster', {
                                rules: [{ required: true, message: '请输入集群名称' }],
                            })(
                                <Select onChange={this.fetchImages} >
                                    {this.state.clusterlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="选择镜像">
                            {getFieldDecorator('images', {
                                rules: [{ required: true, message: '请选择镜像' }],
                            })(
                                <Select  >
                                    { this.state.imageslist.map(item =>
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    )}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="选择镜像"
                    onOk={this.handleSubmitTwo}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.twovisible}
                    width={800}
                    okText={"下一步"}
                >
                    <Steps
                        size="small"
                        current={1}
                        onChange={this.onChange}
                        className="site-navigation-steps"
                    >
                        <Step status="finish" title="选择镜像" />
                        <Step status="process" title="基本设置" />
                        <Step status="wait" title="网络设置" />
                        <Step status="wait" title="高级设置"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout} >
                        <Form.Item label="应用名称">
                        {getFieldDecorator('appname', {
                            rules: [{ required: true, message: '请输入应用名称' }],
                        })(
                            <Input placeholder="请输入应用名称" />
                        )}
                        </Form.Item>
                        <Form.Item label="镜像名称">
                            {getFieldDecorator('appname', {
                                rules: [{ required: true, message: '请输入镜像名称' }],
                            })(
                                <Input placeholder="请输入镜像名称" />
                            )}
                        </Form.Item>
                        <Form.Item label="选择版本">
                            {getFieldDecorator('tag', {
                                rules: [{ required: true, message: '请选择版本' }],
                            })(
                                <Select  >
                                    { this.state.imageslist.map(item =>
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    )}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="部署类型">
                            {getFieldDecorator('type', {
                            })(
                                <Radio.Group
                                    onChange={this.selectOnChange}
                                    buttonStyle="solid"
                                    style={{ marginLeft: 20 }}
                                >
                                    <Radio value={'1'}>Deployment</Radio>
                                    <Radio value={'2'}>DaemonSet</Radio>
                                    <Radio value={'3'}>StatefulSet</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="Pod配置">
                            {getFieldDecorator('config', {
                            })(
                                <Radio.Group
                                    onChange={this.selectOnChange}
                                    buttonStyle="solid"
                                    style={{ marginLeft: 20 }}
                                >
                                    <Radio.Button value={'1'}>0.25核 0.5G</Radio.Button>
                                    <Divider type="vertical" />
                                    <Radio.Button value={'2'}>0.5核 1G</Radio.Button>
                                    <Divider type="vertical" />
                                    <Radio.Button value={'3'}>1核 2G</Radio.Button>
                                    <Divider type="vertical" />
                                    <Radio.Button value={'4'}>2核 4G</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        {formItems}
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> Add field
                            </Button>
                        </Form.Item>
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AppComponent);