import { PageProps, UserItem } from "@/types";

import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import {
    Fragment,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
} from "react";
import FormComponent from "./Components/FormComponent";

interface Data extends PageProps {
    data: UserItem;
}

const Show = ({ auth, data, ...props }: PageProps<Data>) => {
    return (
        <>
            <Head title="User" />

            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Thông tin người dùng
            </h2>
            <div className="flex justify-center">
                <FormComponent user={data} />
            </div>
        </>
    );
};

Show.layout = (
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
export default Show;
