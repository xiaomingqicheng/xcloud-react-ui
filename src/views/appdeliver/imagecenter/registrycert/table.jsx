import React, { Component } from "react";
import {Button, Divider, Table} from "antd";
import {getCert} from "../../../../api/cert";
import {Link} from "react-router-dom";
const { Column } = Table;
class CertTable extends Component{
    state= {
        list: []
    };
    componentDidMount() {
        this.fetchData();
    };
    handleshowEdit = (e, row) => {
        this.props.showedit(row)
    };
    fetchData = () => {
        this.setState({ loading: true });
        getCert().then((response) => {
            this.setState({ loading: false });
            this.setState({ list: response.data });
        });
    };
    render() {
        return(
            <div>
              <Table dataSource={this.state.list}>
                  <Column title="Id" dataIndex="Id" key="Id"  align="center"/>
                  <Column title="证书域名" dataIndex="Remark" key="Remark"  align="center"/>
                  <Column title="操作" key="action" align="center" render={row => (
                      <span>
                            <Button type="primary"  onClick={e => this.handleshowEdit(e, row)}>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary"  onClick={e => this.handleDelete(e, row)}><Link to={'/basic/clusterinfo'}>删除</Link></Button>
                        </span>
                  )}/>
              </Table>
            </div>
        )
    }
}

export default (CertTable);