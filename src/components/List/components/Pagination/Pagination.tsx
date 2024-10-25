import { Flex, Pagination as MPagination } from "@mantine/core";
import { TPagination } from "@shared/types";
import { getPluralString } from "@shared/utils";
import { Paragraph } from "@shared/ui";
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
        <Flex className={classes.root}>
            <MPagination
                total={data.totalPages}
                hidden={data.totalPages < 2}
                classNames={classes}
                onChange={handleChangePagination}
                page={pageIndex}
            />

            {declensionWordCountItems && (
                <Paragraph variant="text-small-m" color="neutralMain50" className={classes.perPageInfo}>
                    Всего: <span>{`${lastElemIndex} ${getPluralString(lastElemIndex, ...declensionWordCountItems)}`}</span> из
                    <span>{` ${data.total}`}</span>
                </Paragraph>
            )}
        </Flex>
    );
};

export default Pagination;
