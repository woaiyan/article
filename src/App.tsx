import React, {useEffect} from 'react';
import './App.less';
import Router from './router';
import {Button, Layout, Menu, Breadcrumb} from "antd";
import {useNavigate} from "react-router-dom";
const { Header, Content, Footer } = Layout;
function App() {
    const navigate = useNavigate();

    const items = [{
        key: 'svg',
        label: '图标',
        path: '/svg'
    },{
        key: 'article',
        label: '文章',
        path: '/article'
    },{
        key: 'note',
        label: '笔记',
        path: '/note'
    }]

    useEffect(() => {
        navigate('/svg');
    }, [])

    const handleMenuClick = (item: any) => {
        const menu = items.find((e: any) => e.key === item.key)
        if (menu){
            navigate(menu.path);
        }
    }
    return (
        <Layout style={{height: '100%'}}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu
                    defaultSelectedKeys={['svg']}
                    theme="dark"
                    mode="horizontal"
                    onClick={handleMenuClick}
                    items={items.map((e) => ({
                        key: e.key,
                        label: e.label,
                    }))}
                >
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background">
                    <div className="site-layout-background-content">
                        <Router></Router>
                    </div>
                </div>
            </Content>
            {/*<Footer></Footer>*/}
        </Layout>
    );
}

export default App;
