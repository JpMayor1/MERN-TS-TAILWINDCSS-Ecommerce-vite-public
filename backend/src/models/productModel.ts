import { ModelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Product {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    price!: number;

    @prop({ required: true })
    countInStock!: number;

    @prop({ required: true })
    image!: string;

    @prop({ required: true })
    publicId!: string;
}

export const ProductModel = getModelForClass(Product);