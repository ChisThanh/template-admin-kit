import { useTabContext } from "@/Context/TabContext";
import { router, usePage } from "@inertiajs/react";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems: any = [];

const MAP_LABEL_ROUTE = {
    "users.index": "DS người dùng",
    "users.create": "Thêm người dùng",
    dashboard: "Trang chủ",
};

type TabItemType = {
    label: string;
    key: string;
    path: string;
};

const TabsLayout = () => {
    const { props } = usePage();
    const tabItem = props.tabItem;

    const tabContext = useTabContext();

    const [activeKey, setActiveKey] = useState("-1");
    const [items, setItems] = useState(tabContext.listTabs);

    useEffect(() => {
        const item = tabItem;
        if (tabContext) {
            tabContext.setListTabs?.([item]);
        }
        setItems([item]);
        tabContext?.setActiveTab(item);
    }, []);

    const onChange = (newActiveKey: string) => {
        if (items && items.length > 0) {
            const currentTab = items.find(
                (item: any) => item && item.key === newActiveKey
            );
            tabContext?.setActiveTab(currentTab);
            setActiveKey(newActiveKey);

            router.visit(currentTab.path, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    useEffect(() => {
        if (tabContext && tabContext.activeTab) {
            setActiveKey(tabContext.activeTab.key);
        }
    }, [tabContext?.activeTab]);

    useEffect(() => {
        if (tabContext && tabContext.listTabs) {
            setItems(tabContext.listTabs);
        }
    }, [tabContext?.listTabs]);

    const add = () => {
        // const newActiveKey = `newTab${newTabIndex.current++}`;
        // const newPanes = [...items];
        // newPanes.push({
        //     label: "New Tab",
        //     children: "Content of new Tab",
        //     key: newActiveKey,
        // });
        // setItems(newPanes);
        // setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        if (items.length === 1) {
            return;
        }
        let newActiveKey = activeKey;
        let activeTab = null;
        let lastIndex = -1;
        items.forEach((item: any, i: any) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item: any) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
                activeTab = newPanes[lastIndex];
            } else {
                newActiveKey = newPanes[0].key;
                activeTab = newPanes[0];
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
        if (tabContext && tabContext?.setListTabs) {
            tabContext?.setListTabs(newPanes);
        }
        if (tabContext && tabContext?.setActiveTab && activeTab) {
            tabContext?.setActiveTab(activeTab);
            router.visit(activeTab.path, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove"
    ) => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Tabs
            type="editable-card"
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
        />
    );
};

export default TabsLayout;
