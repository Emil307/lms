import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FRadioGroup, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminHomeworkAnswerFromList, lessonApi, useAdminLessonHomeworkAnswersResources } from "@entities/lesson";
import { adaptGetAdminHomeworkAnswersRequest, getBadgeColors } from "./utils";
import { radioGroupValues, columns, filterInitialValues, columnOrder } from "./constants";
import { AdminHomeworkAnswersFilters } from "./types";
import React, { useMemo } from "react";

const HomeworkList = () => {
    const router = useRouter();

    const { data: homeworkFilters, isLoading: isLoadingFilters } = useAdminLessonHomeworkAnswersResources({ type: "select" });

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
        <Box mt={24}>
            <ManagedDataGrid<AdminHomeworkAnswerFromList, AdminHomeworkAnswersFilters>
                queryKey={QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS}
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
                }}>
                <Flex gap={16} direction="column">
                    <Flex gap={8}>
                        <FSearch w="100%" maw={382} size="sm" name="query" placeholder="Поиск" />
                        <FSelect
                            name="courseId"
                            size="sm"
                            data={optionsForSelects.courses}
                            clearable
                            label="Курс"
                            disabled={isLoadingFilters}
                            maw={252}
                            w="100%"
                        />
                        <FSelect
                            name="studentId"
                            size="sm"
                            data={optionsForSelects.students}
                            clearable
                            label="Ученик"
                            disabled={isLoadingFilters}
                            maw={252}
                            w="100%"
                        />
                        <FDateRangePicker
                            name="updatedAtFrom"
                            nameTo="updatedAtTo"
                            label="Дата выполнения"
                            size="sm"
                            disabled={isLoadingFilters}
                            maw={252}
                            w="100%"
                        />
                    </Flex>
                    <FRadioGroup name="status">
                        {radioGroupValues.map((item) => (
                            <Radio size="md" key={item.id} label={item.label} value={item.value} />
                        ))}
                    </FRadioGroup>
                    <Button type="submit" w="100%" maw={164}>
                        Найти
                    </Button>
                </Flex>
            </ManagedDataGrid>
        </Box>
    );
};

export default HomeworkList;
