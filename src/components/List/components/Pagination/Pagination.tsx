import { Flex, Pagination as MPagination, Text } from "@mantine/core";
import { TPagination } from "@shared/types";
import { getPluralString } from "@shared/utils";
import useStyles from "./Pagination.styles";
import { useListPagination } from "../../utils";

export interface PaginationProps {
    data?: TPagination;
    onPaginationChange?: (page: number) => void;
    declensionWordCountItems?: [string, string, string];
}

const Pagination = ({ data, declensionWordCountItems, onPaginationChange = () => undefined }: PaginationProps) => {
    const { classes } = useStyles();

    const { lastElemIndex, pageIndex, handleChangePage } = useListPagination({ data });

    const handleChangePagination = (pageNumber: number) => {
        handleChangePage(pageNumber);
        onPaginationChange(pageNumber);
    };

    if (!data) {
        return null;
    }

    return (
        <Flex justify="space-between" align="center" wrap="wrap" w="100%" mt={32}>
            <MPagination
                total={data.totalPages}
                hidden={data.totalPages < 2}
                classNames={classes}
                onChange={handleChangePagination}
                page={pageIndex}
            />

            {declensionWordCountItems && (
                <Text className={classes.perPageInfo}>
                    Всего: <span>{`${lastElemIndex} ${getPluralString(lastElemIndex, ...declensionWordCountItems)}`}</span> из
                    <span>{` ${data.total}`}</span>
                </Text>
            )}
        </Flex>
    );
};

export default Pagination;
