import React, { Component } from "react";
import { Table } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import { getEnv } from '../../api/env'
moment.locale("zh-cn");
const { Column } = Table;
class EnvTable extends Component {
    state = {
        list: []
    };
    fetchData = () => {
        this.setState({ loading: true });
        getEnv().then((response) => {
            this.setState({ loading: false });
            this.setState({ list: response.data });
        });
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
                    <Column title="序号" dataIndex="Id" key="Id" width={200} align="center"
                            sorter={(a, b) => a.id - b.id}/>
                    <Column title="名称" dataIndex="Name" key="Name" width={200} align="center"/>
                </Table>
            </div>
        )
    }
}
export default (EnvTable);