import { Box, Flex, Pagination as MPagination, PaginationProps as MPaginationProps, Text } from "@mantine/core";
import { useMemo } from "react";
import { OnChangeFn } from "@tanstack/react-table";
import { getPluralString, Pagination as TPagination } from "@shared/utils";
import useStyles from "./Pagination.styles";

export interface PaginationProps extends MPaginationProps, TPagination {
    onPaginationChange?: OnChangeFn<TPagination>;
}

const Pagination = ({ onPaginationChange = () => undefined, ...props }: PaginationProps) => {
    const { classes } = useStyles();

    const countViewedItems = useMemo(
        () => props.per_page * (props.current_page - 1) + props.count,
        [props.per_page, props.count, props.current_page]
    );

    const handleChangePage = (pageNumber: number) => {
        onPaginationChange((prev) => ({ ...prev, current_page: pageNumber }));
    };

    return (
        <Flex justify="space-between" align="center" w="100%">
            <MPagination {...props} classNames={classes} onChange={handleChangePage} />
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
