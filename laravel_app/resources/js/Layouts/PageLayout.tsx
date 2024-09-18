import { TabContextProvider } from "@/Context/TabContext";
import React, { useState } from "react";
import MainLayout from "./MainLayout";

const PageLayout: React.FC<any> = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    if (currentPath.startsWith("/admin")) {
        return (
            <TabContextProvider>
                <MainLayout>{children}</MainLayout>
            </TabContextProvider>
        );
    }

    return <>{children}</>;
};

export default PageLayout;
