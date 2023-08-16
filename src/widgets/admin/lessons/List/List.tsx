import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FRadioGroup, FSearch, ManagedDataGrid, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminLessonFromList, AdminLessonsFilters, lessonApi } from "@entities/lesson";
import { adaptGetAdminLessonsRequest } from "./utils";
import { radioGroupValues, columns, filterInitialValues } from "./constants";
import { ListMenu } from "./components";
import useStyles from "./List.styles";
import { useMediaQuery } from "@mantine/hooks";

const List = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 744px)");

    const openLessonDetails = (id: number) => {
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<AdminLessonFromList>) => {
        openLessonDetails(cell.row.original.id);
    };

    return (
        <Box mt={24}>
            <ManagedDataGrid<AdminLessonFromList, AdminLessonsFilters>
                queryKey={QueryKeys.GET_ADMIN_LESSONS}
                queryFunction={(params) => lessonApi.getAdminLessons(adaptGetAdminLessonsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "isActive", "createdAtFrom", "createdAtTo"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Уроков"
                initialState={{
                    columnOrder: ["id", "name", "description", "createdAt", "isActive", "mrt-row-actions"],
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
                                <FDateRangePicker
                                    className={classes.filterDateRangePicker}
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                />
                            </Flex>
                            <FRadioGroup name="isActive" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
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
