import React, { createContext, useContext } from "react";

// Define the context type
interface TabContextType {
    activeTab: any;
    setActiveTab: React.Dispatch<React.SetStateAction<any>>;
    listTabs?: any;
    setListTabs?: React.Dispatch<React.SetStateAction<any>>;
    handleAddTab: (tab: any) => void;
}

// Create the context
const TabContext = createContext<TabContextType | undefined>(undefined);

// Create a custom hook to access the context
const useTabContext = (): TabContextType => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error(
            "useTabContext must be used within a TabContextProvider"
        );
    }
    return context;
};

// Create a provider component to wrap your app
const TabContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [activeTab, setActiveTab] = React.useState<any>(null);
    const [listTabs, setListTabs] = React.useState<any>([]);

    const handleAddTab = (tab: any) => {
        if (!listTabs.find((t: any) => t.key === tab.key)) {
            setListTabs([...listTabs, tab]);
        }
        setActiveTab(tab);
    };

    return (
        <TabContext.Provider
            value={{
                activeTab,
                setActiveTab,
                listTabs,
                setListTabs,
                handleAddTab,
            }}
        >
            {children}
        </TabContext.Provider>
    );
};

export { TabContextProvider, useTabContext };
