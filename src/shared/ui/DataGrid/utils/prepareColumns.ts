import { MRT_ColumnDef } from "mantine-react-table";
import { RoleName } from "@shared/types";
import { TColumns } from "../types";

export const prepareColumns = <T extends Record<string, any>>(data: TColumns<T>, accessRole: RoleName): MRT_ColumnDef<T>["columns"] => {
    return data.reduce((prev = [], current): MRT_ColumnDef<T>["columns"] => {
        const { access, sizes, ...rest } = current;
        const column = rest as MRT_ColumnDef<T>;
        if (!access || access.includes(accessRole)) {
            prev.push({ ...column, size: sizes ? sizes[accessRole] : rest.size });
            return prev;
        }
        return prev;
    }, [] as MRT_ColumnDef<T>["columns"]);
};
