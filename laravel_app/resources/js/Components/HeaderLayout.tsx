import {
    LogoutOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import HeaderNoticeLayout from "./HeaderNoticeLayout";

const HeaderLayout: React.FC = () => {
    const logged = true;
    return (
        <>
            <Header className="layout-page-header bg-2">
                <div className="logo" style={{ width: 200 }}>
                    <img src="" alt="" style={{ marginRight: "20px" }} />
                    <img src="" alt="" />
                </div>
                <div className="layout-page-header-main">
                    <div onClick={() => {}}>
                        <span id="sidebar-trigger">
                            <MenuFoldOutlined />
                        </span>
                    </div>
                    <div className="actions">
                        <Tooltip title="kanklsdf">
                            <span>kaksdfjk</span>
                        </Tooltip>
                        <HeaderNoticeLayout />
                        <Dropdown
                            menu={{
                                // onClick: (info) => selectLocale(info),
                                items: [
                                    {
                                        key: "zh_CN",
                                        label: "简体中文",
                                    },
                                    {
                                        key: "en_US",
                                        label: "English",
                                    },
                                ],
                            }}
                        >
                            <span>Ngon ngu</span>
                        </Dropdown>

                        {logged ? (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "1",
                                            icon: <UserOutlined />,
                                            label: (
                                                <span
                                                    onClick={() =>
                                                        // navigate("/dashboard")
                                                        console.log("dashboard")
                                                    }
                                                >
                                                    {/* <LocaleFormatter id="header.avator.account" /> */}
                                                    Account
                                                </span>
                                            ),
                                        },
                                        {
                                            key: "2",
                                            icon: <LogoutOutlined />,
                                            label: (
                                                <span
                                                    onClick={() =>
                                                        // onActionClick("logout")
                                                        console.log("logout")
                                                    }
                                                >
                                                    logout
                                                </span>
                                            ),
                                        },
                                    ],
                                }}
                            >
                                <span className="user-action">
                                    <img
                                        src={""}
                                        className="user-avator"
                                        alt="avator"
                                    />
                                </span>
                            </Dropdown>
                        ) : (
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => console.log("login")}
                            >
                                login
                            </span>
                        )}
                    </div>
                </div>
            </Header>
        </>
    );
};

export default HeaderLayout;
