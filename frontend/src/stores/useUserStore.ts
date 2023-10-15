import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserState } from "../utils/types";

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                userInfo: {
                    _id: "",
                    username: "",
                    email: "",
                    isAdmin: false,
                    token: "",
                    cpNumber: "",
                    address: "",
                },
                addUserInfo: (info) => set(() => ({ userInfo: { ...info } })),
                userLogout: () =>
                    set(() => ({
                        userInfo: {
                            _id: "",
                            username: "",
                            email: "",
                            isAdmin: false,
                            token: "",
                            cpNumber: "",
                            address: "",
                        },
                    })),
            }),
            {
                name: "user-storage",
            }
        )
    )
);
