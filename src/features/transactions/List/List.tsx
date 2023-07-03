import { Box, BoxProps, Group } from "@mantine/core";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { TransactionFromList, TransactionsFiltersForm, transactionApi, useTransactionFilters } from "@entities/transaction";
import { columns, filterInitialValues, columnOrder } from "./constants";
import { adaptGetTransactionsRequest } from "./utils";
import useStyles from "./List.styles";

export interface ListProps extends BoxProps {}

const List = (props: ListProps) => {
    const { classes } = useStyles({});
    const transactionFilters = useTransactionFilters();

    return (
        <Box className={classes.root} {...props}>
            <ManagedDataGrid<TransactionFromList, TransactionsFiltersForm>
                queryKey={QueryKeys.GET_TRANSACTIONS}
                queryFunction={(params) => transactionApi.getTransactions(adaptGetTransactionsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "entityType", "paymentType", "createdAtFrom", "createdAtTo", "status"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                columns={columns}
                countName="Транзакций"
                initialState={{
                    columnOrder,
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };
                    return (
                        <Box mb={24}>
                            <Group sx={{ gap: 8 }}>
                                <FSearch w="100%" maw={418} size="sm" name="query" placeholder="Поиск" />
                                <FSelect
                                    name="entityType"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionFilters.data?.entityTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Сущность"
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.entityTypes.length}
                                    w="100%"
                                    maw={206}
                                />
                                <FSelect
                                    name="paymentType"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionFilters.data?.paymentTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Вид оплаты"
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.paymentTypes.length}
                                    w="100%"
                                    maw={206}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    clearable
                                    w="100%"
                                    maw={206}
                                />
                                <FSelect
                                    name="status"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionFilters.data?.statuses,
                                        value: "status",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Статус"
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.statuses.length}
                                    w="100%"
                                    maw={206}
                                />
                            </Group>
                            <Group>
                                <Button mt={16} type="submit" w="100%" maw={164} disabled={!dirty}>
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button mt={16} variant="white" w="100%" maw={164} onClick={handleResetForm}>
                                        Сбросить
                                    </Button>
                                )}
                            </Group>
                        </Box>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
