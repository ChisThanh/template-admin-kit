import { PageProps, UserItem } from "@/types";
import { encodeBase64 } from "@/Utils/helper";
import { Head, router } from "@inertiajs/react";
import { Button, Pagination } from "antd";
import {
    Fragment,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import { usePrevious } from "react-use";

import { useTabContext } from "@/Context/TabContext";
import MainLayout from "@/Layouts/MainLayout";
import _ from "lodash";
import FilterComponent from "./Components/FilterComponent";
import TableComponent from "./Components/TableComponent";

type Data = {
    data: UserItem[];
    page: number;
    limit: number;
    order_by: string;
    sort: "asc" | "desc";
    total: number;
};

interface PageProduct extends PageProps {
    data: Data;
}

const Users = ({ auth, data }: PageProduct) => {
    const [_term, setTerm] = useState<any>([]);
    const [_filter, setFilter] = useState<any>([]);
    const tabContext = useTabContext();
    const [values, setValues] = useState({
        page: data.page,
        limit: data.limit,
        term: "",
        sort: "asc",
        order_by: "id",
        total: data.total,
    });
    const prevValues = usePrevious(values);

    useEffect(() => {
        if (
            prevValues &&
            JSON.stringify(values) !== JSON.stringify(prevValues)
        ) {
            router.get(route(route().current() as string), values, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values, prevValues]);

    const debouncedHandleTerm = _.debounce((term: string, type: string) => {
        const newTerm = _term.filter((t: any) => t[0].field !== type);
        if (term) {
            newTerm.push([
                {
                    field: type,
                    cond: "include",
                    value: term,
                },
            ]);
        }
        setTerm(newTerm);
        setValues((prevValues) => ({
            ...prevValues,
            page: 1,
            term: encodeBase64(
                JSON.stringify({ term: [..._filter, ...newTerm] })
            ),
        }));
    }, 500);

    const handleTerm = (term: string, type: string) => {
        const newTerm = _term.filter((t: any) => t[0].field !== type);
        if (term)
            newTerm.push([
                {
                    field: type,
                    cond: "include",
                    value: term,
                },
            ]);
        setTerm(newTerm);
        setValues((prevValues) => ({
            ...prevValues,
            page: 1,
            term: encodeBase64(
                JSON.stringify({ term: [..._filter, ...newTerm] })
            ),
        }));
    };

    const handleFilter = (values: any) => {
        const filter = Object.values(values)
            .filter((element) => element !== undefined)
            .map((element) => [element]);
        setFilter(filter);
        setValues((prevValues) => ({
            ...prevValues,
            page: 1,
            term: encodeBase64(JSON.stringify({ term: [...filter, ..._term] })),
        }));
    };

    const handlePageChange = (page: number) => {
        setValues((prev) => ({ ...prev, page }));
    };

    const handleOnChangeTable = (_: any, filters: any, sorter: any) => {
        if (["price", "status"].includes(sorter.field)) {
            setValues((prevValues) => ({
                ...prevValues,
                sort: sorter.order === "descend" ? "desc" : "asc",
                order_by: sorter.order === undefined ? "id" : sorter.field,
            }));
        }
    };

    const handleCreate = () => {
        tabContext?.handleAddTab({
            label: "Thêm người dùng",
            key: "users-create",
            path: `/admin/users/create`,
        });

        router.get(route("users.create"));
    };

    return (
        <>
            <Head>
                <title>Products</title>
                <meta name="description" content="Your page description" />
            </Head>

            <div className="flex justify-between items-center">
                {/* <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ">
                    Users - {data.total}
                </h2> */}
                <Button type="primary" onClick={handleCreate}>
                    Create
                </Button>
            </div>
            <div className="py-5 me-10 float-end ">
                <FilterComponent handleFilter={handleFilter} />
            </div>

            <div className="py-12">
                <div className="mx-auto ">
                    <TableComponent
                        data={data.data}
                        handleTerm={debouncedHandleTerm}
                        handleOnChangeTable={handleOnChangeTable}
                    />
                    <div className="flex justify-center my-3">
                        <Pagination
                            current={values.page}
                            pageSize={data.limit}
                            total={data.total}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

Users.layout = (
    page:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | null
        | undefined
) => (
    <MainLayout title="Welcome">
        <Fragment children={page} />
    </MainLayout>
);

export default Users;
