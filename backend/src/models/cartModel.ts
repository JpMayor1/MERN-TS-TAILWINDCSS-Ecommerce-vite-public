import { ModelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Cart {
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    image!: string;

    @prop({ required: true })
    price!: number;

    @prop({ required: false })
    quantity!: number;

    @prop({ required: false })
    subTotal!: number;
}

export const CartModel = getModelForClass(Cart);
