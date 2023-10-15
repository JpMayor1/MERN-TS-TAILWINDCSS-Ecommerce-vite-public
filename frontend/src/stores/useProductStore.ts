import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductState } from "../utils/types";

export const useProductStore = create(
    devtools(
        persist<ProductState>(
            (set) => ({
                products: [],
                setProducts: (products) => set({ products }),
                addProduct: (product) =>
                    set((state) => ({
                        products: [...state.products, product],
                    })),
                removeProduct: (id) =>
                    set((state) => ({
                        products: state.products.filter(
                            (product) => product._id !== id
                        ),
                    })),
            }),
            {
                name: "product-storage",
            }
        )
    )
);
