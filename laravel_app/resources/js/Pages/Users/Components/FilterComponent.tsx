import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Select } from "antd";
import React, { useEffect, useState } from "react";

type Props = {
    handleFilter: (value: string[]) => void;
};
const FilterComponent: React.FC<Props> = ({ handleFilter }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [dataFilter, setDataFilter] = useState<any>({});

    const items = [
        {
            key: "1",
            label: "Trạng thái hoạt động",
            value: "Trạng thái hoạt động",
            data: {
                field: "users.status",
                cond: "include",
                value: 1,
            },
        },
        {
            key: "2",
            label: "Trạng thái không hoạt động",
            value: "Trạng thái không hoạt động",
            data: {
                field: "users.status",
                cond: "include",
                value: 0,
            },
        },
    ];

    const handleMenuClick = (e: any) => {
        const selectedItem = items.find((item) => item.key === e.key);

        if (selectedItem && !selectedValues.includes(selectedItem.value)) {
            setSelectedValues([...selectedValues, selectedItem.value]);
            setDataFilter({
                ...dataFilter,
                [selectedItem.key]: {
                    key: selectedItem.key,
                    ...selectedItem.data,
                },
            });
        } else {
            setSelectedValues(
                selectedValues.filter((value) => value !== selectedItem?.value)
            );
            setDataFilter({
                ...dataFilter,
                [selectedItem?.key as string]: undefined,
            });
        }
    };

    const handleSelectChange = (value: string[]) => {
        const selectedItems = items.filter((item) =>
            value.includes(item.value)
        );
        const data: any = {};
        selectedItems.forEach((item) => {
            data[item.key] = { key: item.key, ...item.data };
        });
        setDataFilter(data);
        setSelectedValues(value);
        // handleFilter(dataFilter);
    };

    const menuItems: any = items.map((item) => {
        return {
            key: item.key,
            label: (
                <>
                    {selectedValues.includes(item.value as string) && (
                        <CheckOutlined style={{ marginRight: 8 }} />
                    )}
                    {item.label}
                </>
            ),
            onClick: handleMenuClick,
        };
    });

    useEffect(() => {
        handleFilter(dataFilter);
    }, [selectedValues]);

    return (
        <div className="flex flex-col">
            <Select
                className="min-w-[500px] mb-5"
                mode="tags"
                placeholder="Selected items"
                value={selectedValues}
                onChange={handleSelectChange}
                open={false}
                filterOption={false}
                notFoundContent={null}
                allowClear
            />

            <Dropdown
                trigger={["click"]}
                menu={{ items: menuItems, triggerSubMenuAction: "click" }}
                dropdownRender={(menu) => (
                    <div>
                        {React.cloneElement(menu as React.ReactElement)}
                        <Divider style={{ margin: 0 }} />
                        {/* <div>
              <FormFilter
                label="Custom filter"
                onSubmit={(values) => console.log("Submitted values:", values)}
              />
            </div> */}
                    </div>
                )}
            >
                <Button className="w-fit">
                    Bộ lọc
                    <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    );
};

export default FilterComponent;
