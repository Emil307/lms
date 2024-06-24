import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { FDateRangePicker, FRadioGroup, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { AdminHomeworkAnswerFromList, lessonApi, useAdminLessonHomeworkAnswersResources } from "@entities/lesson";
import { useMedia } from "@shared/utils";
import { adaptGetAdminHomeworkAnswersRequest, getBadgeColors } from "./utils";
import { radioGroupValues, columns, filterInitialValues, columnOrder } from "./constants";
import { AdminHomeworkAnswersFilters } from "./types";
import useStyles from "./HomeworkList.styles";

const HomeworkList = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const { data: homeworkFilters, isLoading: isLoadingFilters } = useAdminLessonHomeworkAnswersResources({ type: FilterTypes.SELECT });

    const optionsForSelects = useMemo(() => {
        const courses = prepareOptionsForSelect({
            data: homeworkFilters?.courses,
            value: "id",
            label: "name",
        });
        const students = prepareOptionsForSelect({
            data: homeworkFilters?.students,
            value: "id",
            label: ({ profile }) => [profile.lastName, profile.firstName].join(" "),
        });
        return { courses, students };
    }, [homeworkFilters]);

    const openHomeworkDetail = (id: number) => {
        router.push({ pathname: "/admin/homeworks/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<AdminHomeworkAnswerFromList>) => {
        openHomeworkDetail(cell.row.original.id);
    };

    return (
        <Box>
            <ManagedDataGrid<AdminHomeworkAnswerFromList, AdminHomeworkAnswersFilters>
                queryKey={[
                    QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS,
                    [EntityNames.LESSON_HOMEWORK, EntityNames.COURSE, EntityNames.GROUP, EntityNames.STUDENT, EntityNames.COURSE_MODULE],
                ]}
                queryFunction={(params) => lessonApi.getAdminHomeworkAnswers(adaptGetAdminHomeworkAnswersRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "status", "studentId", "courseId", "updatedAtFrom", "updatedAtTo"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={getBadgeColors}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Заданий"
                initialState={{
                    columnOrder,
                }}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
                                <FSelect
                                    name="courseId"
                                    size="sm"
                                    data={optionsForSelects.courses}
                                    clearable
                                    label="Входящие курсы"
                                    className={classes.filterSelect}
                                    disabled={isLoadingFilters || !optionsForSelects.courses.length}
                                />
                                <FSelect
                                    name="studentId"
                                    size="sm"
                                    data={optionsForSelects.students}
                                    clearable
                                    label="Ученик"
                                    className={classes.filterSelect}
                                    disabled={isLoadingFilters || !optionsForSelects.students.length}
                                />
                                <FDateRangePicker
                                    name="updatedAtFrom"
                                    nameTo="updatedAtTo"
                                    label="Дата выполнения"
                                    size="sm"
                                    className={classes.filterDateRangePicker}
                                    clearable
                                    allowSingleDateInRange
                                />
                            </Flex>
                            <FRadioGroup name="status" defaultValue="" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={handleReset} w={164}>
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

export default HomeworkList;
