import HeaderNoticeLayout from "@/Components/HeaderNoticeLayout";
import MainMenu from "@/Components/MainMenu";
import TabsLayout from "@/Components/TabsLayout";
import { useTabContext } from "@/Context/TabContext";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, theme } from "antd";
import React, { useState } from "react";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC<any> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const tabContext = useTabContext();

    const logged = true;

    const handleAction: any = ({ key }: { key: any }) => {
        if (key === "account") {
            // router.push("/admin/account");
        } else if (key === "logout") {
            window.location.href = "/logout";
        }
    };

    return (
        <Layout>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme="light"
                >
                    <div className="demo-logo-vertical" />
                    <MainMenu />
                </Sider>
                <Layout>
                    <Header
                        style={{ padding: 0, background: colorBgContainer }}
                    >
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Dropdown
                            className="float-right mr-[20px]"
                            trigger={["click"]}
                            menu={{
                                onClick: handleAction,
                                items: [
                                    {
                                        key: "account",
                                        label: "Tài khoản",
                                    },
                                    {
                                        key: "logout",
                                        label: "Đăng xuất",
                                    },
                                ],
                            }}
                        >
                            <div>
                                <UserOutlined className="text-[18px]" />
                            </div>
                        </Dropdown>
                        <div className="float-right mr-[20px]">
                            <HeaderNoticeLayout />
                        </div>
                    </Header>
                    <TabsLayout />

                    <Content
                        style={{
                            margin: "0px 16px",
                            padding: 24,
                            minHeight: "calc(100vh - 112px)",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* {tabContext?.activeTab?.component} */}
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
