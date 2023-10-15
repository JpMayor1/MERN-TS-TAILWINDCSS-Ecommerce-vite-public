// user
export type UserType = {
    _id?: string;
    username?: string;
    email?: string;
    isAdmin?: boolean;
    token?: string;
    cpNumber?: string;
    address?: string;
};

export interface UserState {
    _id?: string;
    userInfo: UserType;
    addUserInfo: (info: UserType) => void;
    userLogout: () => void;
}

type LinkType = {
    dashboard: boolean;
    products: boolean;
    orders: boolean;
    users: boolean;
};

export interface LinkState {
    links: LinkType;
    setActiveLink: (link: keyof LinkType) => void;
}

export type ProductType = {
    _id: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    publicId: string;
};

export interface ProductState {
    _id?: string;
    products: ProductType[];
    setProducts: (products: ProductType[]) => void;
    addProduct: (product: ProductType) => void;
    removeProduct: (id: string) => void;
}

export type OrderType = {
    _id: string;
    user: UserType;
    product: ProductType;
    quantity: number;
    total: number;
    status: string;
    paymentMethod: string;
    paid: string;
    address: string;
};

export type ProductCartType = {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    subTotal: number;
};

export interface CartState {
    products: ProductCartType[];
    setProducts: (products: ProductCartType[]) => void;
    removeProduct: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export type UserCheckoutType = {
    id?: string;
    username?: string;
    email?: string;
    cpNumber?: string;
    address?: string;
};
export interface CheckOutState {
    user: UserCheckoutType;
    note?: string;
    setUser: (user: UserCheckoutType) => void;
    editUser: (editedUser: UserCheckoutType) => void;
    addNote: (note: string) => void;
    editNote: (note: string) => void;
    deleteNote: () => void;
    resetUser: () => void;
}

// admin

export type OrderInfoType = {
    _id: string;
    userId?: string;
    username: string;
    email: string;
    cpNumber: string;
    address: string;
    products: ProductCartType[];
    status: string;
    paymentMethod: string;
    paid: string;
    total: number;
    note: string;
    createdAt? : string;
    toggleShowModal: () => void;
};
