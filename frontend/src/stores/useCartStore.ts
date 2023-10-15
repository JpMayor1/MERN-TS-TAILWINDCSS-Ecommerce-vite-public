import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CartState } from "../utils/types";

export const useCartStore = create(
    devtools(
        persist<CartState>(
            (set) => ({
                products: [],
                setProducts: (products) => set({ products }),
                removeProduct: (id) =>
                    set((state) => ({
                        products: state.products.filter(
                            (product) => product._id !== id
                        ),
                    })),
                increaseQuantity: (id) =>
                    set((state) => ({
                        products: state.products.map((product) =>
                            product._id === id
                                ? { ...product, quantity: product.quantity + 1 }
                                : product
                        ),
                    })),
                decreaseQuantity: (id) =>
                    set((state) => ({
                        products: state.products.map((product) =>
                            product._id === id && product.quantity > 1
                                ? { ...product, quantity: product.quantity - 1 }
                                : product
                        ),
                    })),
                updateQuantity: (id, quantity) =>
                    set((state) => ({
                        products: state.products.map((product) =>
                            product._id === id
                                ? {
                                      ...product,
                                      quantity,
                                      subTotal: product.price * quantity,
                                  }
                                : product
                        ),
                    })),
                clearCart: () => set({ products: [] }),
            }),

            {
                name: "cart-storage",
            }
        )
    )
);
