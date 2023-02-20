import { AxiosInstance } from "axios";

export type IHasFio = {
    firstname: string;
    lastname: string;
    patronymic: string;
};

export abstract class BaseApi {
    constructor(protected instance: AxiosInstance) {}
}

// export type ApiMethod<SchemaType extends z.Schema, ParamType = never>
//     = (schema: SchemaType, params: ParamType) => Promise<z.infer<SchemaType>>
