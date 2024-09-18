import { useTabContext } from "@/Context/TabContext";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { router, usePage } from "@inertiajs/react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number] & { path?: string };

const items: any[] = [
    {
        key: "dashboard",
        label: "Trang chủ",
        icon: <HomeOutlined />,
        path: "/admin/dashboard",
    },
    {
        key: "users-parent",
        label: "Người dùng",
        icon: <UserOutlined />,
        children: [
            {
                key: "users",
                label: "DS người dùng",
                path: "/admin/users",
            },
            {
                key: "users-create",
                label: "Thêm người dùng",
                path: "/admin/users/create",
            },
        ],
    },
    {
        type: "divider",
    },
];

const findMenuItemByKey = (items: MenuItem[], key: string): any => {
    const queue: any = [...items];
    while (queue.length > 0) {
        const item = queue.shift();
        if (item?.key === key) {
            return item;
        }
        if (item?.children) {
            queue.push(...(item.children as MenuItem[]));
        }
    }
    return undefined;
};

const MainMenu: React.FC = () => {
    const tabContext = useTabContext();
    const { tabItem }: any = usePage().props;

    const onClick: MenuProps["onClick"] = (e) => {
        const clickedItem = findMenuItemByKey(items, e.key);
        const tabTmp: any = {
            label: clickedItem.label,
            key: clickedItem.key,
            component: <div>tab {clickedItem.label}</div>,
            path: clickedItem.path,
        };

        if (tabContext?.listTabs.find((tab: any) => tab.key === tabTmp.key)) {
            tabContext?.setActiveTab(tabTmp);
            router.visit(clickedItem.path, {
                // preserveScroll: false,
                // preserveState: false,
                preserveScroll: true,
                preserveState: true,
            });
            return;
        }

        let oldTabs = tabContext?.listTabs.slice();
        oldTabs.push(tabTmp);

        if (tabContext && tabContext?.setListTabs) {
            tabContext?.setListTabs(oldTabs);
        }

        if (tabContext && tabContext?.setActiveTab) {
            tabContext?.setActiveTab(tabTmp);
        }

        router.visit(clickedItem.path, {
            // preserveScroll: false,
            // preserveState: false,
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Menu
            theme="light"
            onClick={onClick}
            defaultSelectedKeys={[tabItem?.key]}
            defaultOpenKeys={[`${tabItem.key.split("-")[0]}-parent`]}
            mode="inline"
            items={items}
        />
    );
};

export default MainMenu;
