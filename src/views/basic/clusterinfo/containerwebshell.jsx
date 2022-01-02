import React, {Component} from "react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import {Modal,Layout} from "antd";

const { Header, Footer, Sider, Content } = Layout;

class ContainerWebshell extends Component {
    constructor(props) {
        super(props);
        this.termRef = React.createRef();
        this.term = new Terminal({
            rendererType: "canvas", //渲染类型
            rows: 20, //行数
            cols: 50, // 不指定行数，自动回车后光标从下一行开始
            convertEol: true, //启用时，光标将设置为下一行的开头
            scrollback: 50, //终端中的回滚量
            disableStdin: false, //是否应禁用输入。
            cursorBlink: true, //光标闪烁
            // theme: {
            //     foreground: "#7e9192", //字体
            //     background: "#002833", //背景色
            //     cursor: "help", //设置光标
            //     lineHeight: 16
            // }
        });
        this.container = null;
    }
    ondata = (data) => {
        this.terminalSocket.send(JSON.stringify({'type':'input','input': data}))
        // this.term.write(data)
    };
    componentDidUpdate() {
        if(this.props.constainerwebshellvisible === true) {
            console.log('pppppp',this.props.row)
            // const terminalContainer = this.termRef.current;
            // console.log(terminalContainer,'----------------')
            const fitPlugin = new FitAddon();
            this.term.loadAddon(fitPlugin);
             // 将term挂载到dom节点上
            const ws_addr = 'ws://192.168.0.108:8080/v1/containerwebshell/?namespace=' + this.props.row.Namespace + '&pod=' + this.props.row.name + '&container=' + ''
            this.terminalSocket = new WebSocket(ws_addr)
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
    initXtem = () => {

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
    // componentWillUnmount (){
    //     this.terminalSocket.close()
    //     this.term.destroy()
    // }
    render() {
        return(
            <div>
            <Modal
                title="终端"
                forceRender={true}
                onOk={this.handleSubmit}
                onCancel={this.handleAddCancel}
                visible={this.props.constainerwebshellvisible}
                getContainer={true}
            >
                {/*<Layout>*/}
                {/*    <Sider>Sider</Sider>*/}
                {/*    <Content>*/}
                        {/*<div*/}
                        {/*    style={{*/}
                        {/*        flex: 1,*/}
                        {/*        display: 'flex',*/}
                        {/*        backgroundColor: '#000',*/}
                        {/*        paddingLeft: '5px',*/}
                        {/*        width: 100,*/}
                        {/*        height: 50*/}
                        {/*    }}*/}
                        {/*>*/}
                            <div  ref={ref => this.container = ref}/>
                        {/*</div>*/}
                {/*    </Content>*/}

                {/*</Layout>*/}
            </Modal>
            </div>
        )
    }
}

export default (ContainerWebshell);