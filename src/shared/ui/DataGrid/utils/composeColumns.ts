import { MRT_ColumnDef } from "mantine-react-table";

export function composeColumns<T extends Record<string, any>>(entity: T): MRT_ColumnDef<T>[] {
    return Object.keys(entity).map((key: keyof T) => ({
        header: key,
        accessorKey: key,
    })) as MRT_ColumnDef<T>[];
}
