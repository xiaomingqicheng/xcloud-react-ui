import React, { Component } from "react";
import {Button, Divider, message, Table, Modal} from "antd";
const { Column } = Table;

class AppTable extends Component{
    state= {
        list: []
    };
    render() {
        return(
            <div>
                <Table dataSource={this.state.list}>
                    <Column title="Id" dataIndex="Id" key="Id"  align="center"/>
                    <Column title="环境名称"  align="center"/>
                    <Column title="集群名称"   align="center"/>
                    <Column title="应用名称"  align="center"/>
                    <Column title="运行状态"  align="center"/>
                    <Column title="容器数量"  align="center"/>
                    <Column title="创建时间"  align="center"/>
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
export default (AppTable);