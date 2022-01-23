import React, {Component} from "react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import {Modal} from "antd";


class Logconsole extends Component {
    constructor(props) {
        super(props);
        this.termRef = React.createRef();
        this.term = new Terminal({
            rendererType: "canvas", //渲染类型
            rows: 20, //行数
            cols: 50, // 不指定行数，自动回车后光标从下一行开始
            convertEol: true, //启用时，光标将设置为下一行的开头
            scrollback: 50, //终端中的回滚量
            disableStdin: true, //是否应禁用输入。
            cursorBlink: true, //光标闪烁}
        });
        this.container = null;
    }
    ondata = (data) => {
        this.terminalSocket.send(JSON.stringify({'type':'input','input': data}))
    };
    componentDidUpdate() {
        if(this.props.logconsolevisiable === true) {
            // const terminalContainer = this.termRef.current;
            console.log('----------------')
            const fitPlugin = new FitAddon();
            this.term.loadAddon(fitPlugin);
            // 将term挂载到dom节点上
            const ws_addr = 'ws://192.168.0.108:8081/v1/buildlog/?start=yes'
            this.terminalSocket = new WebSocket(ws_addr);
            this.terminalSocket.onmessage = e => this.term.write(e.data);
            this.terminalSocket.onopen = () => {
                this.term.open(this.container);
                this.term.focus();
                fitPlugin.fit();
            };
            this.terminalSocket.onerror = this.errorRealTerminal
            this.term.onData(data => this.ondata(data));
            this.term.onResize(({cols, rows}) => {
                this.terminalSocket.send(JSON.stringify({'type':'resize','cols':cols, 'rows':rows}))
            });
            window.onresize = () => fitPlugin.fit()
        }
    }
    runRealTerminal =() => {
        this.term.focus();
        console.log('webSocket is finished')
    };
    errorRealTerminal =() => {
        console.log('error')
    };
    closeRealTerminal =() => {
        console.log('close')
    };
    render() {
        return(
            <div>
                <Modal
                    title="构建日志"
                    forceRender={true}
                    onOk={this.handleSubmit}
                    onCancel={this.handleAddCancel}
                    visible={this.props.logconsolevisiable}
                    getContainer={true}
                >
                    <div  ref={ref => this.container = ref}/>
                </Modal>
            </div>
        )
    }
}

export default (Logconsole);