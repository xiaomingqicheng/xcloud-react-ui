import React, { Component } from "react";
import {Button, Divider, message, Table, Modal} from "antd";
import {getRegistry, deleteRegistry} from "../../../../api/registry";
import {Link} from "react-router-dom";
const { Column } = Table;
class RegistryTable extends Component{
    state= {
        list: [],
        isModalVisible: false,
        selectedRegistryRow: {} ,
    };
    componentDidMount() {
        this.fetchData();
    };
    handleshowEdit = (e, row) => {
        this.props.showedit(row)
    };
    handleDelete = (e, row) => {
        this.setState({isModalVisible:true,selectedRegistryRow:row})

    };
    handleDeleteOk = () => {
        deleteRegistry(this.state.selectedRegistryRow.Id).then((response) => {
            message.success('删除成功');
        })
    };
    handleDeleteCancel = () => {
        this.setState({isModalVisible:false})
    };
    fetchData = () => {
        this.setState({ loading: true });
        getRegistry().then((response) => {
            this.setState({ loading: false });
            this.setState({ list: response.data });
        });
    };
    render() {
        return(
            <div>
                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleDeleteOk} onCancel={this.handleDeleteCancel}>
                    是否删除镜像仓库 { this.state.selectedRegistryRow.Name } ？
                </Modal>
                <Table dataSource={this.state.list}>
                    <Column title="Id" dataIndex="Id" key="Id"  align="center"/>
                    <Column title="Registry名称" dataIndex="Name" key="Name"  align="center"/>
                    <Column title="Registry域名" dataIndex="Domain" key="Domain"  align="center"/>
                    <Column title="所属环境" dataIndex="Env.Name" key="Env.Name"  align="center"/>
                    <Column title="所属集群" dataIndex="Cluster.Name" key="Cluster.Name"  align="center"/>
                    <Column title="操作" key="action" align="center" render={row => (
                        <span>
                            <Button type="primary"  onClick={e => this.handleshowEdit(e, row)}>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary"  onClick={e => this.handleDelete(e, row)}>删除</Button>
                        </span>
                    )}/>
                </Table>
            </div>
        )
    }
}

export default (RegistryTable);