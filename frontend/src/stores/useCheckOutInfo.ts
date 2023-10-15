import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CheckOutState } from "../utils/types";

export const useCheckOutInfoStore = create(
    devtools(
        persist<CheckOutState>(
            (set) => ({
                user: {
                    id: "",
                    username: "",
                    email: "",
                    cpNumber: "",
                    address: "",
                },
                note: "",
                setUser: (user) => set({ user: { ...user } }),
                editUser: (editedUser) => set({ user: { ...editedUser } }),
                addNote: (note) => set({ note }),
                editNote: (note) => set({ note }),
                deleteNote: () => set({ note: "" }),
                resetUser: () =>
                    set(() => ({
                        user: {
                            id: "",
                            username: "",
                            email: "",
                            cpNumber: "",
                            address: "",
                        },
                    })),
            }),
            {
                name: "checkout-storage",
            }
        )
    )
);
