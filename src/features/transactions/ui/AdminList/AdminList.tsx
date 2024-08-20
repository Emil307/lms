import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect, Button } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminTransactionFromList, AdminTransactionsFiltersForm, transactionApi, useAdminTransactionFilters } from "@entities/transaction";
import { useMedia } from "@shared/utils";
import { columns, filterInitialValues, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminTransactionsRequest } from "./utils";
import useStyles from "./AdminList.styles";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");
    const transactionFilters = useAdminTransactionFilters();

    const handleClickCell = (cell: MRT_Cell<AdminTransactionFromList>) => {
        router.push({ pathname: "/admin/transactions/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminTransactionFromList, AdminTransactionsFiltersForm>
                queryKey={[
                    QueryKeys.GET_ADMIN_TRANSACTIONS,
                    [
                        EntityNames.TRANSACTION,
                        EntityNames.USER,
                        EntityNames.COURSE,
                        EntityNames.COURSE_PACKAGE,
                        EntityNames.ARTICLE_PACKAGE,
                    ],
                ]}
                queryFunction={(params) => transactionApi.getAdminTransactions(adaptGetAdminTransactionsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "entityType", "paymentType", "createdAtFrom", "createdAtTo", "status"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Транзакций"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
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
                                    className={classes.filterSelect}
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.entityTypes.length}
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
                                    className={classes.filterSelect}
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.paymentTypes.length}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
                                    allowSingleDateInRange
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
                                    className={classes.filterSelect}
                                    disabled={transactionFilters.isLoading || !transactionFilters.data?.statuses.length}
                                />
                            </Flex>

                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="border" onClick={handleReset} w={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default AdminList;
