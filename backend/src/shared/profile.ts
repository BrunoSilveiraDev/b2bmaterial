import { Document } from "mongoose";

export interface Material extends Document {
    name: string;
}

export interface Profile extends Document {
    _id: string;
    name: string;
    uf: string;
    estado: string;
    cidade: string;
    pais: string;
    materials: Material[];
}
