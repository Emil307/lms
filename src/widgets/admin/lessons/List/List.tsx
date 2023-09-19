import { Box, Flex } from "@mantine/core";
import { FDateRangePicker, FRadioGroup, FSearch, ManagedDataGrid, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminLessonFromList, AdminLessonsFilters, lessonApi } from "@entities/lesson";
import { useMedia } from "@shared/utils";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { radioGroupValues } from "./constants";
import { ListMenu } from "./components";
import useStyles from "./List.styles";
import { useLessonListData } from "./utils";

const List = () => {
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const { adaptGetAdminLessonsRequest, columns, columnOrder, filterInitialValues, handlerClickCell } = useLessonListData(userRole);

    if (!userRole) {
        return null;
    }

    return (
        <Box mt={24}>
            <ManagedDataGrid<AdminLessonFromList, Partial<AdminLessonsFilters>>
                queryKey={QueryKeys.GET_ADMIN_LESSONS}
                queryFunction={(params) => lessonApi.getAdminLessons(adaptGetAdminLessonsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "isActive", "createdAtFrom", "createdAtTo"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={userRole !== Roles.teacher ? (cell) => [{ condition: !!cell.row.original.isActive }] : undefined}
                onClickCell={handlerClickCell}
                columns={columns}
                accessRole={userRole}
                countName="Уроков"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch className={classes.filterSearch} size="sm" name="query" placeholder="Поиск" />
                                {userRole !== Roles.teacher && (
                                    <FDateRangePicker
                                        className={classes.filterDateRangePicker}
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата создания"
                                        size="sm"
                                    />
                                )}
                            </Flex>
                            {userRole !== Roles.teacher && (
                                <FRadioGroup name="isActive" className={classes.filterRadioGroup}>
                                    {radioGroupValues.map((item) => (
                                        <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                    ))}
                                </FRadioGroup>
                            )}
                            <Flex gap={16}>
                                <Button type="submit" w={164}>
                                    Найти
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
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
