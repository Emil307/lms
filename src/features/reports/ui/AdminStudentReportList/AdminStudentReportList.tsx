import { Box, BoxProps, Flex } from "@mantine/core";
import { FDateRangePicker, FSelect, ManagedDataGridWithoutPagination, prepareOptionsForSelect } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
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
                queryKey={QueryKeys.GET_ADMIN_STUDENT_REPORTS}
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

export default AdminStudentReportList;
