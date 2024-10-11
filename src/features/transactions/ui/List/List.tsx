import { Box, BoxProps, Flex } from "@mantine/core";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect, Button } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { TransactionFromList, TransactionsFiltersForm, transactionApi, useTransactionFilters } from "@entities/transaction";
import { useMedia } from "@shared/utils";
import { columns, filterInitialValues, columnOrder } from "./constants";
import { adaptGetTransactionsRequest } from "./utils";
import useStyles from "./List.styles";

export interface ListProps extends BoxProps {}

const List = (props: ListProps) => {
    const { classes } = useStyles({});
    const transactionFilters = useTransactionFilters();

    const isMobile = useMedia("sm");

    return (
        <Box className={classes.root} {...props}>
            <ManagedDataGrid<TransactionFromList, TransactionsFiltersForm>
                queryKey={[QueryKeys.GET_TRANSACTIONS, [EntityNames.TRANSACTION, EntityNames.COURSE, EntityNames.ARTICLE_PACKAGE]]}
                queryFunction={(params) => transactionApi.getTransactions(adaptGetTransactionsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "entityType", "paymentType", "createdAtFrom", "createdAtTo", "status"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                columns={columns}
                countName="Транзакций"
                initialState={{
                    columnOrder,
                }}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Box>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch className={classes.filterSearch}  name="query" placeholder="Поиск" />
                                <FSelect
                                    name="entityType"
                                    size="sm"
                                    className={classes.filterSelect}
                                    data={prepareOptionsForSelect({
                                        data: transactionFilters.data?.entityTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Сущность"
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.entityTypes.length}
                                />
                                <FSelect
                                    name="paymentType"
                                    size="sm"
                                    className={classes.filterSelect}
                                    data={prepareOptionsForSelect({
                                        data: transactionFilters.data?.paymentTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Вид оплаты"
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.paymentTypes.length}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    className={classes.filterDateRangePicker}
                                    size="sm"
                                    clearable
                                    allowSingleDateInRange
                                    disabled={transactionFilters.isLoading}
                                />
                                <FSelect
                                    name="status"
                                    size="sm"
                                    className={classes.filterSelect}
                                    data={prepareOptionsForSelect({
                                        data: transactionFilters.data?.statuses,
                                        value: "status",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Статус"
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.statuses.length}
                                />
                            </Flex>
                            <Flex gap={16}>
                                <Button mt={16} type="submit" w={164}>
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button mt={16} variant="border" w={164} onClick={handleReset}>
                                        Сбросить
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
