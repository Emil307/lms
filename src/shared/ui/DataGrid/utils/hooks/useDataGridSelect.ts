import { useEffect, useState } from "react";
import { MRT_RowSelectionState } from "mantine-react-table";

interface UseDataGridSelectProps {
    selectItems?: string[];
    onChangeSelect?: (items: string[]) => void;
}

export const useDataGridSelect = ({ onChangeSelect = () => undefined }: UseDataGridSelectProps) => {
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        onChangeSelect(Object.keys(rowSelection));
    }, [rowSelection]);

    return { rowSelection, setRowSelection };
};
