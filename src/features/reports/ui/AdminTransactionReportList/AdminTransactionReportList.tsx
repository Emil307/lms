import { Box, BoxProps, Flex } from "@mantine/core";
import { FDateRangePicker, FSelect, ManagedDataGridWithoutPagination, prepareOptionsForSelect } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { useMedia } from "@shared/utils";
import {
    AdminTransactionReportFromList,
    AdminTransactionReportsFiltersForm,
    AdminTransactionReportsResponseMeta,
    AdminTransactionableTypeName,
    reportApi,
    useAdminTransactionReportFilters,
} from "@entities/report";
import PencilIcon from "@public/icons/pencil.svg";
import { columns, filterInitialValues, columnOrder } from "./constants";
import { adaptGetAdminStudentReportsRequest } from "./utils";
import useStyles from "./AdminTransactionReportList.styles";
import { EntitySelect } from "./components";
import { $AdminTransactionReportsFiltersFormValidation } from "./types";

export interface AdminTransactionReportListProps extends Omit<BoxProps, "children"> {}

const AdminTransactionReportList = (props: AdminTransactionReportListProps) => {
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const transactionReportResources = useAdminTransactionReportFilters();

    return (
        <Box {...props}>
            <ManagedDataGridWithoutPagination<
                AdminTransactionReportFromList,
                AdminTransactionReportsFiltersForm,
                unknown,
                AdminTransactionReportsResponseMeta
            >
                queryKey={QueryKeys.GET_ADMIN_TRANSACTION_REPORTS}
                queryFunction={(params) => reportApi.getAdminTransactionReports(adaptGetAdminStudentReportsRequest(params))}
                queryCacheKeys={[
                    "sort",
                    "createdAtFrom",
                    "createdAtTo",
                    "transactionableType",
                    "transactionableIds",
                    "roleId",
                    "paymentTypes",
                    "statuses",
                ]}
                filter={{
                    initialValues: filterInitialValues,
                    validationSchema: $AdminTransactionReportsFiltersFormValidation,
                }}
                columns={columns}
                initialState={{
                    columnOrder,
                }}
                displayMeta={{
                    leftSide: {
                        name: "Курсов: ",
                        value: ({ totalCount }) => String(totalCount),
                    },
                    rightSide: {
                        name: "Итого: ",
                        value: ({ totalAmount }) => `${totalAmount.toLocaleString("ru")} ₽`,
                    },
                }}
                defaultBlock={{
                    icon: <PencilIcon />,
                    title: "Для формирования отчета по продажам заполните поля",
                    description: "Воспользуйтесь фильтром и нажмите кнопку сформировать.",
                }}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, values, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterDatePickerAndSelects}>
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Период"
                                    size="sm"
                                    className={classes.filterDateRangePicker}
                                    clearable
                                />
                                <FSelect
                                    name="transactionableType"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionReportResources.data?.transactionableTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Вид сущности"
                                    className={classes.filterSelect}
                                    disabled={
                                        transactionReportResources.isLoading ||
                                        !transactionReportResources.data?.transactionableTypes.length
                                    }
                                />
                                <EntitySelect
                                    name="transactionableIds"
                                    entityType={values.transactionableType as AdminTransactionableTypeName}
                                    className={classes.filterSelect}
                                />
                                <FSelect
                                    name="paymentTypes"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionReportResources.data?.paymentTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Тип платежа"
                                    className={classes.filterSelect}
                                    disabled={transactionReportResources.isLoading || !transactionReportResources.data?.paymentTypes.length}
                                />
                                <FSelect
                                    name="statuses"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionReportResources.data?.statuses,
                                        value: "status",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Статус платежа"
                                    className={classes.filterSelect}
                                    disabled={transactionReportResources.isLoading || !transactionReportResources.data?.statuses.length}
                                />
                                <FSelect
                                    name="roleId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: transactionReportResources.data?.roles,
                                        value: "id",
                                        label: "displayName",
                                    })}
                                    clearable
                                    label="Тип ученика"
                                    className={classes.filterSelect}
                                    disabled={transactionReportResources.isLoading || !transactionReportResources.data?.roles.length}
                                />
                            </Flex>

                            <Flex gap={16}>
                                <Button w={164} type="submit" disabled={!dirty}>
                                    Сформировать
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={handleResetForm} w={164}>
                                        Cбросить
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedDataGridWithoutPagination>
        </Box>
    );
};

export default AdminTransactionReportList;