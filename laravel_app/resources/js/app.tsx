import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { TabContextProvider } from "./Context/TabContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(
                el,
                // <PageLayout>
                //     <App {...props} />
                // </PageLayout>
                <TabContextProvider>
                    <App {...props} />
                </TabContextProvider>
            );
            return;
        }

        createRoot(el).render(
            // <PageLayout>
            //     <App {...props} />
            // </PageLayout>
            <TabContextProvider>
                <App {...props} />
            </TabContextProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
