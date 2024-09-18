import { useTabContext } from "@/Context/TabContext";
import { UserItem } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Input, Modal, Table, TableColumnsType, Tag, message } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import React from "react";

interface ProductTableProps {
    data: UserItem[];
    term?: string | string[];
    handleTerm(term: string, type: string): void;
    handleOnChangeTable(pagination: any, filters: any, sorter: any): void;
}

const TableComponent: React.FC<ProductTableProps> = ({
    data,
    term,
    handleTerm,
    handleOnChangeTable,
}) => {
    const { delete: destroy } = useForm({ id: "" });
    const [filter, setFilter] = React.useState<any>({});
    const tabContext = useTabContext();

    const rowSelection: TableRowSelection<UserItem> = {
        type: "checkbox",
        onChange: (selectedRowKeys: React.Key[], selectedRows: UserItem[]) => {
            console.log("selectedRowKeys: ", selectedRowKeys);
            console.log("Selected Rows: ", selectedRows);
        },
        onSelectAll: () => {}, // Override select all
        hideSelectAll: true, // Hide select all
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Are you sure you want to delete this item?",
            content: "Once deleted, the item cannot be recovered.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => {
                destroy(route("users.destroy", id), {
                    onSuccess: () => {
                        setTimeout(() => {
                            message.success("Item deleted successfully.");
                        }, 1000);
                    },
                });
            },
        });
    };

    // const debouncedSearchTerm = useDebounce(, 500);

    const columns: TableColumnsType<UserItem> = [
        // {
        //     title: "#",
        //     dataIndex: "id",
        //     key: "id",
        //     width: 50,
        // },
        {
            title: (
                <div className="text-center">
                    <p>User name</p>
                    <Input
                        placeholder="Search name"
                        value={filter.name}
                        onChange={(e) => {
                            setFilter({ ...filter, name: e.target.value });
                            handleTerm(e.target.value, "users.name");
                        }}
                    />
                </div>
            ),
            dataIndex: "name",
            key: "name",
            width: 300,
        },
        {
            title: (
                <div className="text-center">
                    <p>Email </p>
                    <Input
                        placeholder="Email"
                        value={filter.email}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                email: e.target.value,
                            });
                            handleTerm(e.target.value, "users.email");
                        }}
                    />
                </div>
            ),
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        // {
        //     title: (
        //         <div className="text-center">
        //             <p>Description</p>
        //             <Input
        //                 placeholder="Search description"
        //                 value={term}
        //                 onChange={(e) => {
        //                     setFilter({
        //                         ...filter,
        //                         description: e.target.value,
        //                     });
        //                     handleTerm(e.target.value, "products.description");
        //                 }}
        //             />
        //         </div>
        //     ),
        //     dataIndex: "description",
        //     key: "description",
        // },
        // {
        //     title: "Price",
        //     dataIndex: "price",
        //     key: "price",
        //     sorter: true,
        //     width: 100,
        // },
        // {
        //     title: "Status",
        //     dataIndex: "status",
        //     key: "status",
        //     width: 100,
        //     render: (status: number) => {
        //         const color = status === 1 ? "green" : "volcano";
        //         return (
        //             <Tag color={color} key={status}>
        //                 {status === 1 ? "Active" : "Inactive"}
        //             </Tag>
        //         );
        //     },
        //     sorter: true,
        // },
        {
            title: <div className="text-center">Action</div>,
            key: "action",
            fixed: "right",
            width: 200,
            className: "text-center",
            render: (_: any, record: UserItem) => (
                <div>
                    <Link
                        className="mr-1"
                        href={`/admin/users/${record.id}`}
                        onClick={() => {
                            tabContext?.handleAddTab({
                                label: "Người Dùng - " + record.name,
                                key: "view-create-" + record.id,
                                path: `/admin/users/${record.id}`,
                            });
                        }}
                    >
                        <Tag color="green">View</Tag>
                    </Link>
                    <a onClick={() => handleDelete(record.id)}>
                        <Tag color="volcano">Delete</Tag>
                    </a>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                bordered={true}
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                pagination={false}
                size="small"
                onChange={handleOnChangeTable}
                className="px-3 min-h-[300px]"
            />
        </>
    );
};

export default TableComponent;
