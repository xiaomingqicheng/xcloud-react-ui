import React, { Component,useState }from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Input, message, Select, Radio, Steps, Divider,Space, Form,Checkbox, Table, Tabs } from "antd";
import AppTable from "./table";
import {getCluster} from "../../../../api/cluster";
import {getClusterImages} from "../../../../api/image";
import {getImageTagList} from "../../../../api/image";
const { Column } = Table;
const { Step } = Steps;
const { TextArea } = Input;
let id = 0;

class AppComponent extends Component {
    formOneRef = React.createRef();
    formTwoRef = React.createRef();
    formThreeRef = React.createRef();
    formFourRef = React.createRef();
    formHealthRef = React.createRef();
    state = {
        onevisible: false,
        twovisible: false,
        threevisible: false,
        fourvisible: false,
        clusterlist: [],
        imageslist: [],
        selectOption: [{ label: 'Deployment', value: 1 }, { label: 'DaemonSet', value: 2 }, { label: 'StatefulSet', value: 3}],
        selectedValue: '',
        healthvisible: false,
        healthchecktype: '',
        formAll: {},
        tagsList: [],
        healthData:[],
    };
    selectOnChange = () => {
      console.log('111')
    };

    addHealth = () => {
        this.setState({healthvisible: true})
    };

    showModal = () => {
        this.setState({onevisible: true});
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
    handleSubmitOne = (value) => {
        let formOne = this.formOneRef.current.getFieldsValue();
        let formAll = this.state.formAll;
        formAll.cluster = formOne.cluster;
        formAll.image = formOne.image;
        this.setState({formAll});
        console.log(this.state.formAll);
        this.fetchImageTagList({clusterId: formAll.cluster, image: formAll.image});
        this.setState({onevisible: false, twovisible: true})
    };
    handleSubmitTwo = () => {
        let formTwo = this.formTwoRef.current.getFieldsValue();
        let formAll = this.state.formAll;
        formAll.appname = formTwo.appname;
        formAll.imagetag = formTwo.imagetag;
        formAll.type = formTwo.type;
        formAll.config = formTwo.config;
        formAll.label = formTwo.label;
        this.setState({formAll});
        console.log(this.state.formAll);
        this.setState({twovisible: false, threevisible: true})
    };
    handleSubmitthree = () => {
        let formThree = this.formThreeRef.current.getFieldsValue();
        let formAll = this.state.formAll;
        formAll.hostnetwork = formThree.hostnetwork;
        formAll.ports = formThree.ports;
        formAll.domain = formThree.domain;
        formAll.healtchcheck = this.state.healthData
        this.setState({formAll});
        console.log(this.state.formAll);
        this.setState({ threevisible: false, fourvisible: true })
    };

    handleSubmitFour = () => {
        let formFour = this.formFourRef.current.getFieldsValue();
        let formAll = this.state.formAll;
        formAll.adjustmodel = formFour.adjustmodel;
        formAll.env = formFour.env;
        formAll.apptype = formFour.apptype;
        formAll.instances = formFour.instances;
        formAll.instancesmin = formFour.instancesmin;
        formAll.instancesmax = formFour.instancesmax;
        formAll.logpath = formFour.logpath;
        // formAll.healtchcheck = this.state.healthData
        this.setState({formAll});
        console.log(this.state.formAll);
        this.setState({ threevisible: false, fourvisible: true })
    };


    fetchImageTagList = (params) => {
        getImageTagList(params).then((response) => {
            this.setState({ tagsList: response.data.tags})
        })
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

    delHealthCheckData = (text,record,index) => {
        const hd=this.state.healthData;
        let healthData = [...hd]
        healthData.splice(index, 1);
        this.setState({healthData:healthData})
        console.log(this.state.healthData)
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
        const formInsideItemLayout = {
            labelCol: {
                sm: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 0 },
            },
        };



        const ModalForm = ({  onCancel }) => {
            const setHealthCheckData = () => {
                this.formHealth = this.formHealthRef.current.getFieldsValue();
                const hd=this.state.healthData;
                let healthData = [...hd]
                healthData.push(this.formHealth);
                this.setState({healthData:healthData})
                console.log(this.state.healthData);
                this.setState({healthvisible: false})

            };


            const [PortVisiable,setPortVisiable ] = useState(false);
            const [PathVisiable,setPathVisiable ] = useState(false);
            const [CmdVisiable , setCmdVisiable ] = useState(false);

            const clearHealthCheck = () => {
                this.formHealthRef.current.setFieldsValue({
                    "healthCheckPort": "",
                    "healthCheckPath":"",
                    "healthCheckCmd":"",
                    "healthCheckDelay":"",
                    "healthCheckInterval":"",
                    "healthCheckFailureTimes":"",
                    "healthCheckOverTime":"",
                });
            };

            const  setHealthCheck = (type) => {
                if (type.healthCheckType === 'Http') {
                    setPortVisiable(false)
                    setPathVisiable(false)
                    setCmdVisiable(true)
                }
                if (type.healthCheckType === 'Tcp') {
                    setPortVisiable(false)
                    setPathVisiable(true)
                    setCmdVisiable(true)
                }
                if (type.healthCheckType === 'Cmd') {
                    setPortVisiable(true)
                    setPathVisiable(true)
                    setCmdVisiable(false)
                }
            };


            return (
                <Modal title="健康检查" visible={this.state.healthvisible} onOk={setHealthCheckData} onCancel={onCancel}>
                    <Form {...formInsideItemLayout} onValuesChange={setHealthCheck}  ref={this.formHealthRef}>
                        <Form.Item label="类型" name="healthCheckType">
                            <Radio.Group buttonStyle="solid" onChange={clearHealthCheck}>
                                <Radio.Button value="Http">Http</Radio.Button>
                                <Divider type="vertical" />
                                <Radio.Button value="Tcp">Tcp</Radio.Button>
                                <Divider type="vertical" />
                                <Radio.Button value="Cmd">Cmd</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                            <Form.Item label="端口" hidden={PortVisiable}  name="healthCheckPort">
                                <Input />
                            </Form.Item>
                            < Form.Item label = "页面路径" hidden={PathVisiable}  name="healthCheckPath">
                                < Input/>
                            </Form.Item>
                        < Form.Item label = "健康检查命令" hidden={CmdVisiable}  name="healthCheckCmd" >
                            < Input  />
                        </Form.Item>
                            <Form.Item label="首次检查延时"   name="healthCheckDelay">
                                <Input addonAfter="秒"/>
                            </Form.Item>
                            < Form.Item label = "间隔"   name="healthCheckInterval">
                                < Input addonAfter = "秒" />
                                </Form.Item>
                            <Form.Item label="失败次数阈值"  name="healthCheckFailureTimes">
                                <Input addonAfter="次"/>
                            </Form.Item>
                            < Form.Item label = "超时"   name="healthCheckOverTime">
                                <Input addonAfter = "秒" />
                            </Form.Item>
                    </Form>
                </Modal>
            );
        };


        return (
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
                    <Form {...formItemLayout }  ref={this.formOneRef}
                    >
                        <Form.Item label="集群名称" name="cluster">
                                <Select onChange={this.fetchImages} >
                                    {this.state.clusterlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                        </Form.Item>
                        <Form.Item label="选择镜像" name="image">
                                <Select  >
                                    { this.state.imageslist.map(item =>
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="基本设置"
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
                    <Form {...formItemLayout} ref={this.formTwoRef}>
                        <Form.Item label="应用名称" name="appname">
                            <Input placeholder="请输入应用名称" />
                        </Form.Item>
                        <Form.Item label="镜像名称" name="imagename">
                                <Input defaultValue={this.state.formAll.image}  disabled={true} placeholder="请输入镜像名称"  />
                        </Form.Item>
                        <Form.Item label="选择版本"   name="imagetag">
                                <Select  >
                                    { this.state.tagsList.map(item =>
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                        <Form.Item label="部署类型" name="type">
                                <Radio.Group
                                    onChange={this.selectOnChange}
                                    buttonStyle="solid"
                                    style={{ marginLeft: 20 }}
                                >
                                    <Radio value={'1'}>Deployment</Radio>
                                    <Radio value={'2'}>DaemonSet</Radio>
                                    <Radio value={'3'}>StatefulSet</Radio>
                                </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Pod配置" name="config">
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
                        </Form.Item>
                        <Form.Item label="标签">
                        <Form.List  name="label"  >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <Space key={key}  align="baseline">
                                            <Form.Item
                                                style={{ marginBottom: "0px" }}
                                                {...restField}
                                                name={[name, 'first']}
                                                fieldKey={[fieldKey, 'first']}
                                                rules={[{ required: true, message: 'Missing first name' }]}
                                            >
                                                <Input size="small" placeholder="键"  style={{ width:150 }} />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ marginBottom: "0px" }}
                                                {...restField}
                                                name={[name, 'last']}
                                                fieldKey={[fieldKey, 'last']}
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >
                                                <Input size="small" placeholder="值" style={{ width:150 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                         </Space>
                                    ))}
                                    <Form.Item>
                                        <Button style={{ width:300 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            添加标签
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="网络设置"
                    onOk={this.handleSubmitthree}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.threevisible}
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
                        <Step status="finish" title="基本设置" />
                        <Step status="process" title="网络设置" />
                        <Step status="wait" title="高级设置"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout}  ref={this.formThreeRef}>
                        <Form.Item label="HostNetwork" valuePropName="checked" name="hostnetwork">
                            <Checkbox style={{marginLeft: 70}}>Checkbox</Checkbox>
                        </Form.Item>
                        <Form.Item label="暴露端口" style={{marginBottom: "0px",}}>
                            <Form.List
                                name="ports"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(formItemLayoutWithOutLabel)}
                                            required={false}
                                            key={field.key}
                                            style={{marginBottom: "2px",}}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input passenger's name or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="请输入端口" style={{ width: '40%'}} />
                                            </Form.Item >
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    style={{ marginLeft: 5,}}
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                style={{ width: '35%' }}
                                                icon={<PlusOutlined />}
                                            >
                                                Add field
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>
                        <Form.Item label="域名后缀" name="domain">
                            <Input placeholder="请输入域名后缀"  />
                        </Form.Item>
                        <Form.Item label="健康检查">
                            <Button style={{marginLeft: 20}} onClick={this.addHealth}>添加</Button>
                            <Table dataSource={this.state.healthData} size="small" style={{ marginTop: 10 }} >
                                <Column title="类型" dataIndex="healthCheckType" align="center"/>
                                <Column title="端口" dataIndex="healthCheckPort" align="center"/>
                                <Column title="路径" dataIndex="healthCheckPath" align="center"/>
                                <Column title="命令" dataIndex="healthCheckCmd" align="center"/>
                                <Column title="启动预估" dataIndex="healthCheckDelay" align="center"/>
                                <Column title="间隔" dataIndex="healthCheckInterval" align="center"/>
                                <Column title="不健康阈值" dataIndex="healthCheckFailureTimes" align="center"/>
                                <Column title="超时" dataIndex="healthCheckOverTime" align="center"/>
                                <Column title="操作" dataIndex="" align="center" render={(text, record, index) => (<Button type="primary" danger size='small' onClick={()=>this.delHealthCheckData(text,record,index)}> 删除</Button>)}/>
                            </Table>
                        </Form.Item>
                        <ModalForm healthvisible={this.state.healthvisible}></ModalForm>
                    </Form>
                </Modal>
                <Modal
                    title="网络设置"
                    onOk={this.handleSubmitFour}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.fourvisible}
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
                        <Step status="finish" title="基本设置" />
                        <Step status="finish" title="网络设置" />
                        <Step status="process" title="高级设置"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout}  ref={this.formFourRef}>
                        <Form.Item label="服务类型" name="apptype">
                            <Radio.Group
                                onChange={this.selectOnChange}
                                buttonStyle="solid"
                                style={{ marginLeft: 20 }}
                            >
                                <Radio value={'1'}>无状态</Radio>
                                <Radio value={'2'}>有状态</Radio>
                            </Radio.Group>
                        </Form.Item>
                    <Form.Item label="调节模式"  name="adjustmodel">
                        <Radio.Group
                            onChange={this.selectOnChange}
                            buttonStyle="solid"
                            style={{ marginLeft: 20 }}
                        >
                            <Radio.Button  value={'1'}>手动</Radio.Button >
                            <Divider type="vertical" />
                            <Radio.Button  value={'2'}>自动</Radio.Button >
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item label="容器实例数量" name="instances">
                            <Input  />
                        </Form.Item>
                        <Form.Item label="实例最小值" name="instancesmin">
                            <Input />
                        </Form.Item>
                        <Form.Item label="实例最大值" name="instancesmax">
                            <Input  />
                        </Form.Item>

                        <Form.Item label="环境变量" name="env">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="日志路径" name="logpath">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="配置文件">
                            <Button style={{marginLeft: 20}} onClick={this.addHealth}>添加</Button>
                            <Table dataSource={this.state.healthData} size="small" style={{ marginTop: 10 }} >
                                <Column title="类型" dataIndex="HealthCheckType" align="center"/>
                                <Column title="挂载路径" dataIndex="healthCheckPath" align="center"/>
                                {/*<Column title="端口" dataIndex="" align="center"/>*/}
                                {/*<Column title="路径或命令" dataIndex="" align="center"/>*/}
                                {/*<Column title="启动预估" dataIndex="" align="center"/>*/}
                                {/*<Column title="间隔" dataIndex="" align="center"/>*/}
                                {/*<Column title="不健康阈值" dataIndex="" align="center"/>*/}
                                {/*<Column title="超时" dataIndex="" align="center"/>*/}
                                {/*<Column title="操作" dataIndex="" align="center"/>*/}
                            </Table>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default (AppComponent);