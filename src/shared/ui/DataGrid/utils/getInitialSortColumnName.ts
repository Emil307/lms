import { MRT_TableState } from "mantine-react-table";

const MRTDisplayColumnIds = ["mrt-row-actions", "mrt-row-drag", "mrt-row-expand", "mrt-row-numbers", "mrt-row-select"];

export const getInitialSortColumnName = <Data extends Record<string, any>>(initialState?: Partial<MRT_TableState<Data>>) => {
    if (initialState?.sorting) {
        return initialState.sorting[0].id;
    }

    if (initialState?.columnOrder && !MRTDisplayColumnIds.includes(initialState.columnOrder[0])) {
        return initialState.columnOrder[0];
    }
    return null;
};
