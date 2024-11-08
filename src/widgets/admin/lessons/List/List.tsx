import { Box, Flex } from "@mantine/core";
import { FDateRangePicker, FRadioGroup, FSearch, ManagedDataGrid, Radio, Button } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminLessonFromList, AdminLessonsFilters, lessonApi } from "@entities/lesson";
import { useMedia } from "@shared/utils";
import { useUserRole } from "@entities/auth";
import { Roles } from "@shared/types";
import { radioGroupValues } from "./constants";
import { ListMenu } from "./components";
import useStyles from "./List.styles";
import { useLessonListData } from "./utils";

const List = () => {
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

    const userRole = useUserRole();

    const { adaptGetAdminLessonsRequest, columns, columnOrder, filterInitialValues, handlerClickCell } = useLessonListData(userRole?.name);

    if (!userRole) {
        return null;
    }

    return (
        <Box>
            <ManagedDataGrid<AdminLessonFromList, Partial<AdminLessonsFilters>>
                queryKey={[QueryKeys.GET_ADMIN_LESSONS, [EntityNames.LESSON]]}
                queryFunction={(params) => lessonApi.getAdminLessons(adaptGetAdminLessonsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "isActive", "createdAtFrom", "createdAtTo"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={userRole.name !== Roles.teacher ? (cell) => [{ condition: !!cell.row.original.isActive }] : undefined}
                onClickCell={handlerClickCell}
                columns={columns}
                accessRole={userRole.name}
                countName="Уроков"
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
                                <FSearch className={classes.filterSearch}  name="query" placeholder="Поиск" />
                                {userRole.name !== Roles.teacher && (
                                    <FDateRangePicker
                                        className={classes.filterDateRangePicker}
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата создания"
                                        size="sm"
                                        allowSingleDateInRange
                                    />
                                )}
                            </Flex>
                            {userRole.name !== Roles.teacher && (
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

export default List;
