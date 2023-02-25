import { MRT_ColumnDef } from "mantine-react-table";

export function prepareColumns<T extends Record<string, any>>(data: T[]): MRT_ColumnDef<T>[] {
    if (!data.length) return [];

    const entity = data.at(0);
    if (!entity) return [];

    return composeColumns(entity);
}

function composeColumns<T extends Record<string, any>>(entity: T): MRT_ColumnDef<T>[] {
    return Object.keys(entity).map((key: keyof T) => ({
        header: key,
        accessorKey: key,
    })) as MRT_ColumnDef<T>[];
}