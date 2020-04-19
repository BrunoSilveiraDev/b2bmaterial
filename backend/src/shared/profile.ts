import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export interface Material extends Document {
    name: string;
}

export class Profile extends Document {
    @ApiProperty({
        description: "Uma lista completa com o {_id:valor} da lista de interesse",
    })
    _id: string;
    name: string;
    uf: string;
    estado: string;
    cidade: string;
    pais: string;
    materials: Material[];
    isProvider: Boolean;
    isProducer: Boolean;
    email: String;
    phone: String;
}
