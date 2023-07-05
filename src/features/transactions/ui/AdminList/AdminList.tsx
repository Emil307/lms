import { Box, BoxProps, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminTransactionFromList, AdminTransactionsFiltersForm, transactionApi, useAdminTransactionFilters } from "@entities/transaction";
import { columns, filterInitialValues, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminTransactionsRequest } from "./utils";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const transactionFilters = useAdminTransactionFilters();

    const handleClickCell = (cell: MRT_Cell<AdminTransactionFromList>) => {
        router.push({ pathname: "/admin/transactions/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminTransactionFromList, AdminTransactionsFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_TRANSACTIONS}
                queryFunction={(params) => transactionApi.getAdminTransactions(adaptGetAdminTransactionsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "entityType", "paymentType", "createdAtFrom", "createdAtTo", "status"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Статей"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };
                    return (
                        <Box mb={24}>
                            <Group sx={{ gap: 8 }}>
                                <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
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
                                    maw={252}
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
                                    maw={252}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    clearable
                                    w="100%"
                                    maw={252}
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
                                    maw={252}
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

export default AdminList;
