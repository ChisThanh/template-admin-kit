import MainLayout from "@/Layouts/MainLayout";
import { PageProps, UserItem } from "@/types";
import { Head } from "@inertiajs/react";
import {
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
} from "react";
import FormComponent from "./Components/FormComponent";

interface Data extends PageProps {
    product: UserItem;
}

const Create = ({ auth }: PageProps<Data>) => {
    return (
        <>
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Thông tin người dùng
            </h2>
            <Head title="Products" />
            <div className="flex justify-center">
                <FormComponent is_create={true} />
            </div>
        </>
    );
};

Create.layout = (
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
        <div children={page} />
    </MainLayout>
);

export default Create;
