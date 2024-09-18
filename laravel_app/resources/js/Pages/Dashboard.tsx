import MainLayout from "@/Layouts/MainLayout";
import {
    Fragment,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
} from "react";

const Dashboard = () => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        You're logged in!
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.layout = (
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

export default Dashboard;
