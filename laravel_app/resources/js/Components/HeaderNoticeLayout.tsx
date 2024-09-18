import type { FC } from "react";

import { LoadingOutlined, NotificationOutlined } from "@ant-design/icons";
import { Avatar, Badge, List, Popover, Spin, Tabs, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TabPane } = Tabs;

type Notice<T extends string = string> = {
    type: T;
    title: string;
    description: string;
    datetime: string;
    avatar: string;
    extra: string;
};

const HeaderNoticeLayout: FC = () => {
    const [visible, setVisible] = useState(false);
    const [noticeList, setNoticeList] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(false);

    const noticeListFilter = <T extends Notice["type"]>(type: T) => {
        return noticeList.filter(
            (notice) => notice.type === type
        ) as Notice<T>[];
    };

    // loads the notices belonging to logged in user
    // and sets loading flag in-process
    const getNotice = async () => {
        setLoading(true);
        // const { status, result } = await getNoticeList();

        setLoading(false);
        // status && setNoticeList(result);
    };

    useEffect(() => {
        getNotice();
    }, []);

    const tabs = (
        <div>
            <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Notification" key="1">
                        <List
                            dataSource={noticeListFilter("notification")}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={
                                            <a href={item.title}>
                                                {item.title}
                                            </a>
                                        }
                                        description={item.datetime}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>

                    <TabPane tab="News" key="2">
                        <List
                            dataSource={noticeListFilter("message")}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={
                                            <a href={item.title}>
                                                {item.title}
                                            </a>
                                        }
                                        description={
                                            <div className="notice-description">
                                                <div className="notice-description-content">
                                                    {item.description}
                                                </div>
                                                <div className="notice-description-datetime">
                                                    {item.datetime}
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="Event" key="3">
                        <List
                            dataSource={noticeListFilter("event")}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <div className="notice-title">
                                                <div className="notice-title-content">
                                                    {item.title}
                                                </div>
                                                <Tag color={""}>
                                                    {item.extra}
                                                </Tag>
                                            </div>
                                        }
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </Spin>
        </div>
    );

    return (
        <Popover
            content={tabs}
            overlayClassName="bg-2"
            placement="bottomRight"
            trigger={["click"]}
            open={visible}
            onOpenChange={(v) => setVisible(v)}
            overlayStyle={{
                width: 336,
            }}
        >
            <Tooltip title="Notifications">
                <Badge count={1} overflowCount={999}>
                    <span id="notice-center">
                        <NotificationOutlined className="text-[18px]" />
                    </span>
                </Badge>
            </Tooltip>
        </Popover>
    );
};

export default HeaderNoticeLayout;
