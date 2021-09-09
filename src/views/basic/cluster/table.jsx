import React, { Component } from "react";
import {Button, Divider, Table} from "antd";
import { Link } from "react-router-dom"
import moment from "moment";
import {getCluster} from '../../../api/cluster'
import "moment/locale/zh-cn";
moment.locale("zh-cn");
const { Column } = Table;
class ClusterTable extends Component {
    state = {
        clusterName: ''
    };
    fetchData = () => {
        this.setState({ loading: true });
        getCluster().then((response) => {
            this.setState({ loading: false });
            this.setState({ list: response.data });
        });
    };
    // handleDelete = (row) => {
    //     deleteItem({id:row.id}).then(res => {
    //         message.success("删除成功")
    //         this.fetchData();
    //     })
    // };

    handleshowEdit = (e, row) => {
        this.props.showedit(row)
    };

    handleDetail = (e, row) => {
        window.sessionStorage.setItem("clustername", row.Name);
    };

    componentDidMount() {
        this.fetchData();
    }
    render() {
        return (
            <div>
                <Table
                    bordered
                    rowKey={(record) => record.id}
                    dataSource={this.state.list}
                    loading={this.state.loading}
                    pagination={false}
                >
                    <Column title="序号" dataIndex="Id" key="Id"  align="center"
                            sorter={(a, b) => a.id - b.id}/>
                    <Column title="集群名称" dataIndex="Name" key="Name"  align="center"/>
                    <Column title="所属环境" dataIndex="Env[0].Name" key="Env[0].Name"  align="center"/>
                    <Column title="Api IP" dataIndex="Apiserver_ip" key="Apiserver_ip"  align="center"/>
                    <Column title="Api 端口" dataIndex="Apiserver_port" key="Apiserver_port"  align="center"/>
                    <Column title="操作" key="action" align="center" render={row => (
                        <span>
                            <Button type="primary"  onClick={e => this.handleshowEdit(e, row)}>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary"  onClick={e => this.handleDetail(e, row)}><Link to={'/basic/clusterinfo'}>详情</Link></Button>
                        </span>
                    )}/>
                </Table>
            </div>
        )
    }
}
export default (ClusterTable);