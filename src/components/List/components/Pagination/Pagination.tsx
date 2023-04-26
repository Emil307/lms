import { Box, Flex, Pagination as MPagination, PaginationProps as MPaginationProps, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TPagination } from "@shared/types";
import { getPluralString } from "@shared/utils";
import useStyles from "./Pagination.styles";

export interface PaginationProps extends MPaginationProps, TPagination {
    onPaginationChange?: Dispatch<SetStateAction<TPagination>>;
}

const Pagination = ({ onPaginationChange = () => undefined, ...props }: PaginationProps) => {
    const { classes } = useStyles();
    const hiddenPagination = props.totalPages < 2;

    const countViewedItems = useMemo(
        () => props.perPage * (props.currentPage - 1) + props.count,
        [props.perPage, props.count, props.currentPage]
    );

    const handleChangePage = (pageNumber: number) => {
        onPaginationChange((prev) => ({ ...prev, current_page: pageNumber }));
    };

    return (
        <Flex justify="space-between" align="center" w="100%">
            <MPagination {...props} total={props.totalPages} hidden={hiddenPagination} classNames={classes} onChange={handleChangePage} />
            <Box>
                <Text className={classes.perPageInfo}>
                    Всего: <span>{`${countViewedItems} ${getPluralString(countViewedItems, "курс", "курса", "курсов")}`}</span> из
                    <span>{` ${props.total}`}</span>
                </Text>
            </Box>
        </Flex>
    );
};

export default Pagination;
