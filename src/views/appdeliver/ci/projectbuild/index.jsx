import React, { Component,useState }from "react";
import {Button, Divider, Form, Input, message, Modal, Select, Space, Table} from "antd";
import Logconsole from "./logconsole";
import {getbuildresult} from "../../../../api/build"
class ProjectbuildComponent extends Component {
    state={
        logconsolevisiable:false
    }
    showcontainerwebshell = (e, row) => {
        this.setState({logconsolevisiable: true})
    };
    fetchbuildresult = (e, row) => {
        getbuildresult({'taskuuid':'task_fca6d1e4-c533-4df5-9ecc-6a91a668c63e'})
    };
    render() {
        return(
            <div>
                <Button type={"primary"} onClick={e => this.showcontainerwebshell(e, )}>构建</Button>
                <Button type={"primary"} onClick={e => this.fetchbuildresult(e,)}>构建结果</Button>
                <Logconsole logconsolevisiable={this.state.logconsolevisiable}/>
            </div>
        )
    }
}

export default (ProjectbuildComponent);
