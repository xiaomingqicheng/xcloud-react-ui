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
                <Modal title="????????????" visible={this.state.healthvisible} onOk={setHealthCheckData} onCancel={onCancel}>
                    <Form {...formInsideItemLayout} onValuesChange={setHealthCheck}  ref={this.formHealthRef}>
                        <Form.Item label="??????" name="healthCheckType">
                            <Radio.Group buttonStyle="solid" onChange={clearHealthCheck}>
                                <Radio.Button value="Http">Http</Radio.Button>
                                <Divider type="vertical" />
                                <Radio.Button value="Tcp">Tcp</Radio.Button>
                                <Divider type="vertical" />
                                <Radio.Button value="Cmd">Cmd</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                            <Form.Item label="??????" hidden={PortVisiable}  name="healthCheckPort">
                                <Input />
                            </Form.Item>
                            < Form.Item label = "????????????" hidden={PathVisiable}  name="healthCheckPath">
                                < Input/>
                            </Form.Item>
                        < Form.Item label = "??????????????????" hidden={CmdVisiable}  name="healthCheckCmd" >
                            < Input  />
                        </Form.Item>
                            <Form.Item label="??????????????????"   name="healthCheckDelay">
                                <Input addonAfter="???"/>
                            </Form.Item>
                            < Form.Item label = "??????"   name="healthCheckInterval">
                                < Input addonAfter = "???" />
                                </Form.Item>
                            <Form.Item label="??????????????????"  name="healthCheckFailureTimes">
                                <Input addonAfter="???"/>
                            </Form.Item>
                            < Form.Item label = "??????"   name="healthCheckOverTime">
                                <Input addonAfter = "???" />
                            </Form.Item>
                    </Form>
                </Modal>
            );
        };


        return (
            <div className={"app-container"}>
              <Button type={"primary"} onClick={this.showModal}>????????????</Button>
              <AppTable/>
                <Modal
                    title="????????????"
                    onOk={this.handleSubmitOne}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.onevisible}
                    width={800}
                    okText={"?????????"}
                >
                    <Steps
                        size="small"
                        current={0}
                        onChange={this.onChange}
                        className="site-navigation-steps"
                    >
                        <Step status="process" title="????????????" />
                        <Step status="wait" title="????????????" />
                        <Step status="wait" title="????????????" />
                        <Step status="wait" title="????????????"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout }  ref={this.formOneRef}
                    >
                        <Form.Item label="????????????" name="cluster">
                                <Select onChange={this.fetchImages} >
                                    {this.state.clusterlist.map(item => (
                                        <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                        </Form.Item>
                        <Form.Item label="????????????" name="image">
                                <Select  >
                                    { this.state.imageslist.map(item =>
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="????????????"
                    onOk={this.handleSubmitTwo}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.twovisible}
                    width={800}
                    okText={"?????????"}
                >
                    <Steps
                        size="small"
                        current={1}
                        onChange={this.onChange}
                        className="site-navigation-steps"
                    >
                        <Step status="finish" title="????????????" />
                        <Step status="process" title="????????????" />
                        <Step status="wait" title="????????????" />
                        <Step status="wait" title="????????????"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout} ref={this.formTwoRef}>
                        <Form.Item label="????????????" name="appname">
                            <Input placeholder="?????????????????????" />
                        </Form.Item>
                        <Form.Item label="????????????" name="imagename">
                                <Input defaultValue={this.state.formAll.image}  disabled={true} placeholder="?????????????????????"  />
                        </Form.Item>
                        <Form.Item label="????????????"   name="imagetag">
                                <Select  >
                                    { this.state.tagsList.map(item =>
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                        <Form.Item label="????????????" name="type">
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
                        <Form.Item label="Pod??????" name="config">
                                <Radio.Group
                                    onChange={this.selectOnChange}
                                    buttonStyle="solid"
                                    style={{ marginLeft: 20 }}
                                >
                                    <Radio.Button value={'1'}>0.25??? 0.5G</Radio.Button>
                                    <Divider type="vertical" />
                                    <Radio.Button value={'2'}>0.5??? 1G</Radio.Button>
                                    <Divider type="vertical" />
                                    <Radio.Button value={'3'}>1??? 2G</Radio.Button>
                                    <Divider type="vertical" />
                                    <Radio.Button value={'4'}>2??? 4G</Radio.Button>
                                </Radio.Group>
                        </Form.Item>
                        <Form.Item label="??????">
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
                                                <Input size="small" placeholder="???"  style={{ width:150 }} />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ marginBottom: "0px" }}
                                                {...restField}
                                                name={[name, 'last']}
                                                fieldKey={[fieldKey, 'last']}
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >
                                                <Input size="small" placeholder="???" style={{ width:150 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                         </Space>
                                    ))}
                                    <Form.Item>
                                        <Button style={{ width:300 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            ????????????
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="????????????"
                    onOk={this.handleSubmitthree}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.threevisible}
                    width={800}
                    okText={"?????????"}
                >
                    <Steps
                        size="small"
                        current={1}
                        onChange={this.onChange}
                        className="site-navigation-steps"
                    >
                        <Step status="finish" title="????????????" />
                        <Step status="finish" title="????????????" />
                        <Step status="process" title="????????????" />
                        <Step status="wait" title="????????????"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout}  ref={this.formThreeRef}>
                        <Form.Item label="HostNetwork" valuePropName="checked" name="hostnetwork">
                            <Checkbox style={{marginLeft: 70}}>Checkbox</Checkbox>
                        </Form.Item>
                        <Form.Item label="????????????" style={{marginBottom: "0px",}}>
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
                                                <Input placeholder="???????????????" style={{ width: '40%'}} />
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
                        <Form.Item label="????????????" name="domain">
                            <Input placeholder="?????????????????????"  />
                        </Form.Item>
                        <Form.Item label="????????????">
                            <Button style={{marginLeft: 20}} onClick={this.addHealth}>??????</Button>
                            <Table dataSource={this.state.healthData} size="small" style={{ marginTop: 10 }} >
                                <Column title="??????" dataIndex="healthCheckType" align="center"/>
                                <Column title="??????" dataIndex="healthCheckPort" align="center"/>
                                <Column title="??????" dataIndex="healthCheckPath" align="center"/>
                                <Column title="??????" dataIndex="healthCheckCmd" align="center"/>
                                <Column title="????????????" dataIndex="healthCheckDelay" align="center"/>
                                <Column title="??????" dataIndex="healthCheckInterval" align="center"/>
                                <Column title="???????????????" dataIndex="healthCheckFailureTimes" align="center"/>
                                <Column title="??????" dataIndex="healthCheckOverTime" align="center"/>
                                <Column title="??????" dataIndex="" align="center" render={(text, record, index) => (<Button type="primary" danger size='small' onClick={()=>this.delHealthCheckData(text,record,index)}> ??????</Button>)}/>
                            </Table>
                        </Form.Item>
                        <ModalForm healthvisible={this.state.healthvisible}></ModalForm>
                    </Form>
                </Modal>
                <Modal
                    title="????????????"
                    onOk={this.handleSubmitFour}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.fourvisible}
                    width={800}
                    okText={"?????????"}
                >
                    <Steps
                        size="small"
                        current={1}
                        onChange={this.onChange}
                        className="site-navigation-steps"
                    >
                        <Step status="finish" title="????????????" />
                        <Step status="finish" title="????????????" />
                        <Step status="finish" title="????????????" />
                        <Step status="process" title="????????????"  />
                    </Steps>
                    <Divider />
                    <Form {...formItemLayout}  ref={this.formFourRef}>
                        <Form.Item label="????????????" name="apptype">
                            <Radio.Group
                                onChange={this.selectOnChange}
                                buttonStyle="solid"
                                style={{ marginLeft: 20 }}
                            >
                                <Radio value={'1'}>?????????</Radio>
                                <Radio value={'2'}>?????????</Radio>
                            </Radio.Group>
                        </Form.Item>
                    <Form.Item label="????????????"  name="adjustmodel">
                        <Radio.Group
                            onChange={this.selectOnChange}
                            buttonStyle="solid"
                            style={{ marginLeft: 20 }}
                        >
                            <Radio.Button  value={'1'}>??????</Radio.Button >
                            <Divider type="vertical" />
                            <Radio.Button  value={'2'}>??????</Radio.Button >
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item label="??????????????????" name="instances">
                            <Input  />
                        </Form.Item>
                        <Form.Item label="???????????????" name="instancesmin">
                            <Input />
                        </Form.Item>
                        <Form.Item label="???????????????" name="instancesmax">
                            <Input  />
                        </Form.Item>

                        <Form.Item label="????????????" name="env">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="????????????" name="logpath">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="????????????">
                            <Button style={{marginLeft: 20}} onClick={this.addHealth}>??????</Button>
                            <Table dataSource={this.state.healthData} size="small" style={{ marginTop: 10 }} >
                                <Column title="??????" dataIndex="HealthCheckType" align="center"/>
                                <Column title="????????????" dataIndex="healthCheckPath" align="center"/>
                                {/*<Column title="??????" dataIndex="" align="center"/>*/}
                                {/*<Column title="???????????????" dataIndex="" align="center"/>*/}
                                {/*<Column title="????????????" dataIndex="" align="center"/>*/}
                                {/*<Column title="??????" dataIndex="" align="center"/>*/}
                                {/*<Column title="???????????????" dataIndex="" align="center"/>*/}
                                {/*<Column title="??????" dataIndex="" align="center"/>*/}
                                {/*<Column title="??????" dataIndex="" align="center"/>*/}
                            </Table>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default (AppComponent);