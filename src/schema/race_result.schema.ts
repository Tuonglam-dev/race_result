import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Schema as MongooseSchema } from 'mongoose'
import { BaseEntity } from "src/shared/base/base.entity";

export type RaceResultDocument = HydratedDocument<RaceResult>;

@Schema({
    timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
class RaceResult extends BaseEntity {
    @Prop()
    _id: MongooseSchema.Types.ObjectId

    @Prop()
    grand_prix: string

    @Prop()
    date: Date

    @Prop()
    winner: string

    @Prop()
    car: string

    @Prop()
    laps: number

    @Prop()
    time: Date
}

export const RaceResultSchema = SchemaFactory.createForClass(RaceResult);

