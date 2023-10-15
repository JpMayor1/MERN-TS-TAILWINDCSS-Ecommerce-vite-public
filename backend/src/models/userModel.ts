import { ModelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
    public _id?: string;

    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    email!: string;

    @prop({ required: true })
    password!: string;

    @prop({ required: true })
    isAdmin!: boolean;

    @prop({ required: true })
    cpNumber!: string;

    @prop({ required: true })
    address!: string;
}

export const UserModel = getModelForClass(User);
