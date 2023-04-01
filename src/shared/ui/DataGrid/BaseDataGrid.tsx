import { MantineReactTable, MantineReactTableProps } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import React from "react";
import { prepareColumns } from "./helpers";

export interface BaseDataGridProps<T extends Record<string, any>> extends Omit<MantineReactTableProps<T>, "columns"> {
    columns?: MantineReactTableProps<T>["columns"];
}

export default function BaseDataGrid<T extends Record<string, any>>(props: BaseDataGridProps<T>) {
    const columns = props.columns || prepareColumns(props.data);

    return (
        <MantineReactTable<T>
            {...props}
            columns={columns}
            enableDensityToggle={false}
            localization={MRT_Localization_RU}
            enableTopToolbar={false}
        />
    );
}
