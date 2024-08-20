import { Box, BoxProps, Flex } from "@mantine/core";
import { FDateRangePicker, FSelect, ManagedDataGridWithoutPagination, prepareOptionsForSelect, Button } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useMedia } from "@shared/utils";
import {
    AdminStudentReportFromList,
    AdminStudentReportsFiltersForm,
    AdminStudentReportsResponseMeta,
    AdminTransactionableTypeName,
    reportApi,
    useAdminStudentReportFilters,
} from "@entities/report";
import PencilIcon from "@public/icons/pencil.svg";
import { columns, filterInitialValues, columnOrder } from "./constants";
import { adaptGetAdminStudentReportsRequest } from "./utils";
import useStyles from "./AdminStudentReportList.styles";
import { EntitySelect } from "./components";
import { $AdminStudentReportsFiltersFormValidation } from "./types";

export interface AdminStudentReportListProps extends Omit<BoxProps, "children"> {}

const AdminStudentReportList = (props: AdminStudentReportListProps) => {
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const studentReportResources = useAdminStudentReportFilters();

    return (
        <Box {...props}>
            <ManagedDataGridWithoutPagination<
                AdminStudentReportFromList,
                AdminStudentReportsFiltersForm,
                unknown,
                AdminStudentReportsResponseMeta
            >
                queryKey={[QueryKeys.GET_ADMIN_STUDENT_REPORTS, [EntityNames.STUDENT_REPORT, EntityNames.STUDENT, EntityNames.USER]]}
                queryFunction={(params) => reportApi.getAdminStudentReports(adaptGetAdminStudentReportsRequest(params))}
                queryCacheKeys={["sort", "createdAtFrom", "createdAtTo", "transactionableType", "transactionableIds", "roleId"]}
                filter={{
                    initialValues: filterInitialValues,
                    validationSchema: $AdminStudentReportsFiltersFormValidation,
                }}
                columns={columns}
                initialState={{
                    columnOrder,
                }}
                displayMeta={{
                    leftSide: {
                        name: "Учеников: ",
                        value: ({ studentsCount }) => String(studentsCount),
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
                {({ dirty, values, handleReset }) => {
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
                                    allowSingleDateInRange
                                    disabled={studentReportResources.isLoading}
                                />
                                <FSelect
                                    name="transactionableType"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: studentReportResources.data?.transactionableTypes,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Вид сущности"
                                    className={classes.filterSelect}
                                    disabled={studentReportResources.isLoading || !studentReportResources.data?.transactionableTypes.length}
                                />
                                <EntitySelect
                                    name="transactionableIds"
                                    entityType={values.transactionableType as AdminTransactionableTypeName}
                                    className={classes.filterSelect}
                                    disabled={studentReportResources.isLoading}
                                />
                                <FSelect
                                    name="roleId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: studentReportResources.data?.roles,
                                        value: "id",
                                        label: "displayName",
                                    })}
                                    clearable
                                    label="Тип ученика"
                                    className={classes.filterSelect}
                                    disabled={studentReportResources.isLoading || !studentReportResources.data?.roles.length}
                                />
                            </Flex>

                            <Flex className={classes.buttons}>
                                <Button className={classes.button} type="submit">
                                    Сформировать
                                </Button>
                                {dirty && (
                                    <Button className={classes.button} type="button" variant="border" onClick={handleReset}>
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

export default AdminStudentReportList;
