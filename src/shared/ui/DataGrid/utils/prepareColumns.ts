import { MRT_ColumnDef } from "mantine-react-table";
import { composeColumns } from "./composeColumns";

export function prepareColumns<T extends Record<string, any>>(data: T[]): MRT_ColumnDef<T>[] {
    if (!data.length) return [];

    const entity = data.at(0);
    if (!entity) return [];

    return composeColumns(entity);
}
