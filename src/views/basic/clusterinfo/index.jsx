import React, {Component, useState} from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import {Card, Row, Col, Space, Divider, Tabs, Table, Tag, PageHeader, Button, Modal} from 'antd'
import { getClusterDetail, getClusterResDetail } from '../../../api/cluster'
import {FitAddon} from "xterm-addon-fit";
import {Terminal} from "xterm";
import ContainerWebshell from './containerwebshell'
const { Meta } = Card;
const { TabPane } = Tabs;
const { Column } = Table
moment.locale("zh-cn");
class ClusterInfo extends Component {
    // term = new Terminal({cols:50,rows:20,});
    // container = null;

    state = {
        list: {},
        loading: false,
        tabledata: [],
        clustername: '',
        constainerwebshellvisible: false,
        row: {}
    };
    fetchData = (clustername) => {
        this.setState({ loading: true });
        getClusterDetail(clustername).then((response) => {
            this.setState({ list: response.data });
        });
    };

    showcontainerwebshell = (e,row) => {
      this.setState({
          constainerwebshellvisible: true,
          row: row
      })
    };

    componentDidMount() {
        const clustername = window.sessionStorage.getItem("clustername");
        this.setState({ clustername: clustername });
        this.fetchData(clustername);
        const params = { 'clustername': clustername, 'label': 'PODS' };
        getClusterResDetail(params).then((response) => {
            this.setState({ tabledata: response.data });
        });
        // var ddd = document.getElementById('www')
        // this.term.open(ddd);
        // this.term = new Terminal();
        // const fitPlugin = new FitAddon();
        // this.term.loadAddon(fitPlugin);
        // // console.log(terminalContainer, '----------------')
        //
        // this.term.open(this.termRef);
        // const ws_addr = 'ws://192.168.0.104:8080/containerwebshell/'
        // this.terminalSocket = new WebSocket(ws_addr)
        // this.terminalSocket.onopen = this.runRealTerminal
        // this.terminalSocket.onclose = this.closeRealTerminal
        // this.terminalSocket.onerror = this.errorRealTerminal
        // this.term.onData(data => this.terminalSocket.send(JSON.stringify({data})));
        // this.term.onResize(({cols, rows}) => {
        //     this.socket.send(JSON.stringify({resize: [cols, rows]}))
        // });
        // window.onresize = () => fitPlugin.fit()Warning: Each child in a list should have a unique "key" prop.
        // // this.term.attach(this.terminalSocket)
        // this.term._initialized = true;
    };
    render() {
        this.termRef = React.createRef();

        function callback(key) {
            const clustername = window.sessionStorage.getItem("clustername");
            const params = { 'clustername': clustername, 'label': key };
            getClusterResDetail(params).then((response) => {
                this.setState({ tabledata: response.data });
            });
        };
        function goBack(){
            window.history.back()
        }
        return (
                <div >

                    <PageHeader
                        className="site-page-header"
                        onBack={() => goBack()}
                        title={ this.state.clustername }
                        subTitle=""
                    />
                <Card >
                 <Row>
                 <Col span={3}>
                <Card
                    hoverable
                    style={{ width: 150 }}
                >
                    <span className="iconfont icon-node">  POD:  { this.state.list.pods }</span>
                </Card>
                </Col>

                    <Col span={4}>
                <Card
                    hoverable
                    style={{ width: 180 }}
                >
                    <span className="iconfont icon-xuanzhong">  SERVICE:  { this.state.list.services }</span>
                </Card>
                        </Col>

                        <Col span={5}>
                            <Card
                                hoverable
                                style={{ width: 220 }}
                            >
                                <span className="iconfont icon-xuanzhong"> CONFIGMAP:  { this.state.list.configmaps }</span>
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card
                                hoverable
                                style={{ width: 210 }}
                            >
                                <span className="iconfont icon-xuanzhong">  DEPLOYMENTS:  { this.state.list.deployments }</span>
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card
                                hoverable
                                style={{ width: 150 }}
                            >
                                <span className="iconfont icon-xuanzhong">  NODES:  { this.state.list.nodes }</span>
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card
                                hoverable
                                style={{ width: 150 }}
                            >
                                <span className="iconfont icon-xuanzhong">  PVCS:  { this.state.list.pvcs }</span>
                            </Card>
                        </Col>
                    </Row>
                    <Divider />
                    <Tabs onChange={callback.bind(this)} type="card">
                        <TabPane tab="PODS" key="PODS">
                            <Table dataSource={this.state.tabledata}>
                                <Column title="pod名称" dataIndex="name" key="name"/>
                                <Column title="名称空间" dataIndex="Namespace" key="Namespace"/>
                                <Column title="POD IP" dataIndex="PodIP" key="PodIP"/>

                                <Column title="是否Ready" dataIndex="Conditions[0].status" key="Conditions[0].status" render={ val => (val === 'True'? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>)} />
                                <Column title="启动时间" dataIndex="StartTime" key="StartTime"  render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                                <Column title="创建时间" dataIndex="createtime" key="createtime"  render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                                <Column title="操作" dataIndex="PodIP" key="PodIP" render={ (text,row) => (
                                <Space size="middle">
                                    <Button type="primary" onClick={e => this.showcontainerwebshell(e, row)}>连接</Button>
                                </Space>
                                )}>
                                </Column>
                            </Table>
                        </TabPane>
                        <TabPane tab="NODES" key="NODES">
                            <Table dataSource={this.state.tabledata}>
                                <Column title="节点名称" dataIndex="name" key="name"/>address
                                <Column title="IP" dataIndex="ip" key="ip"/>
                                <Column title="是否Ready" dataIndex="status" key="status" render={ val => (val === 'True'? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>)}/>
                                <Column title="可分配cpu" dataIndex="AllocatableCpu" key="AllocatableCpu"/>
                                <Column title="可分配内存" dataIndex="AllocatableMemory" key="AllocatableMemory"/>
                                <Column title="创建时间" dataIndex="createtime" key="createtime"  render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                                <Column title="启动时间" dataIndex="StartTime" key="StartTime"  render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                            </Table>
                        </TabPane>

                        <TabPane tab="SVC" key="SVC">
                            <Table dataSource={this.state.tabledata}>
                                <Column title="节点名称" dataIndex="name" key="name"/>
                                <Column title="名称空间" dataIndex="Namespace" key="Namespace"/>
                                <Column title="ClusterIP" dataIndex="ClusterIP" key="ClusterIP"/>
                                <Column title="创建时间" dataIndex="createtime" key="createtime"  render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                            </Table>
                        </TabPane>
                        <TabPane tab="DEPLOYMENTS" key="DEPLOYMENTS">
                            <Table dataSource={this.state.tabledata}>
                                <Column title="DEPLOYMENT名称" dataIndex="name" key="name"/>
                                <Column title="关联POD总数" dataIndex="replicasets" key="replicasets"  render={ val =>(<Tag color="blue">{ val }</Tag>)} />
                                <Column title="可用POD数量" dataIndex="availablereplicasets" key="availablereplicasets"  render={ val =>(<Tag color="green">{ val }</Tag>)} />
                                <Column title="名称空间" dataIndex="Namespace" key="Namespace"/>
                                <Column title="创建时间" dataIndex="createtime" key="createtime" render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                            </Table>
                        </TabPane>
                        <TabPane tab="REPLICASETS" key="REPLICASETS">
                            <Table dataSource={this.state.tabledata}>
                                <Column title="DEPLOYMENT名称" dataIndex="name" key="name"/>
                                <Column title="名称空间" dataIndex="Namespace" key="Namespace"/>
                                <Column title="创建时间" dataIndex="createtime" key="createtime" render={ val => moment(val).format('YYYY-MM-DD HH:mm:ss') }/>
                            </Table>
                        </TabPane>
                    </Tabs>
                </Card>
                    {/*<div  id="www" />*/}
                    {/*<div  ref={ref => this.container = ref} />*/}
                <ContainerWebshell constainerwebshellvisible={this.state.constainerwebshellvisible}  row={this.state.row} />
             </div>
        )
    }
}
export default (ClusterInfo);