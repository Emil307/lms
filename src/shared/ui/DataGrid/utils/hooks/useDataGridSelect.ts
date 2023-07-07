import { useEffect, useState } from "react";
import { MRT_RowSelectionState } from "mantine-react-table";
import { useRouter } from "next/router";

interface UseDataGridSelectProps {
    disableQueryParams: boolean;
    selectItems?: string[];
    onChangeSelect?: (items: string[]) => void;
}

export const useDataGridSelect = ({ disableQueryParams, selectItems, onChangeSelect = () => undefined }: UseDataGridSelectProps) => {
    const router = useRouter();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        setRowSelection(getInitialSelectParams());
    }, [router.isReady]);

    useEffect(() => {
        onChangeSelect(Object.keys(rowSelection));
    }, [rowSelection]);

    useEffect(() => {
        if (!router.isReady || disableQueryParams) {
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: createNewSelectParams(),
            },
            undefined,
            { shallow: true },
        );
    }, [rowSelection, router.isReady]);

    const getInitialSelectParams = () => {
        if (disableQueryParams) {
            return selectItems?.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue]: true }), {}) || {};
        }
        const { select } = router.query;

        if (!select || Array.isArray(select)) {
            return {};
        }

        return select.split(",").reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue]: true }), {});
    };

    const createNewSelectParams = () => {
        const newQueryParams = { ...router.query };
        if (!Object.keys(rowSelection).length) {
            delete newQueryParams.select;
            return newQueryParams;
        }
        newQueryParams.select = Object.keys(rowSelection).join(",");
        return newQueryParams;
    };

    return { rowSelection, setRowSelection };
};
