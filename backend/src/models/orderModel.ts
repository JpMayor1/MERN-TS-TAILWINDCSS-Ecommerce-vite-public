import {
    ModelOptions,
    prop,
    getModelForClass,
} from "@typegoose/typegoose";


export enum OrderStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export enum PaymentMethod {
    PAYPAL = "paypal",
    COD = "cod",
}

export enum PaymentStatus {
    PAID = "paid",
    UNPAID = "unpaid",
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Order {
    @prop({ required: false })
    public paypalOrderId!: string;

    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public cpNumber!: number;

    @prop({ required: true })
    public address!: string;

    @prop({ required: true })
    public products: Array<{
        name: string;
        price: number;
        image: string;
        quantity: number;
        subTotal: number;
    }> = [];

    @prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
    public status!: OrderStatus;

    @prop({ required: true, enum: PaymentMethod, default: PaymentMethod.COD })
    public paymentMethod!: PaymentMethod;

    @prop({ required: true, default: PaymentStatus.UNPAID })
    public paid!: PaymentStatus;

    @prop({ required: true })
    public total!: number;

    @prop({ required: false })
    public note!: string;
}

export const OrderModel = getModelForClass(Order);
