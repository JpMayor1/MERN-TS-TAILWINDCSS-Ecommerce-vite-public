import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LinkState } from "../utils/types";

export const useLinkStore = create<LinkState>()(
    devtools(
        persist(
            (set) => ({
                links: {
                    dashboard: false,
                    products: false,
                    orders: false,
                    users: false,
                },
                setActiveLink: (activeLink) => {
                    set({
                        links: {
                            dashboard: false,
                            products: false,
                            orders: false,
                            users: false,
                            [activeLink]: true,
                        },
                    });
                },
            }),
            {
                name: "link-storage",
            }
        )
    )
);
