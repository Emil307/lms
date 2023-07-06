import { Box, BoxProps, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import {
    AdminCourseReviewFiltersForm,
    AdminCourseReviewFromList,
    courseReviewApi,
    useAdminCourseReviewsResources,
} from "@entities/courseReview";
import { columns, radioGroupValues, filterInitialValues, columnOrder, scoreOptions } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminCourseReviewsRequest } from "./utils";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const courseReviewsResources = useAdminCourseReviewsResources({ type: "select" });

    const handleClickCell = (cell: MRT_Cell<AdminCourseReviewFromList>) => {
        router.push({ pathname: "/admin/settings/course-reviews/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminCourseReviewFromList, AdminCourseReviewFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_COURSE_REVIEWS}
                queryFunction={(params) => courseReviewApi.getAdminCourseReviews(adaptGetAdminCourseReviewsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "courseId", "createdAtFrom", "createdAtTo", "score", "isPublished"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isPublished}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Отзывов"
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
                                    name="courseId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: courseReviewsResources.data?.courses,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Курс"
                                    disabled={courseReviewsResources.isLoading || !courseReviewsResources.data?.courses.length}
                                    w="100%"
                                    maw={252}
                                />
                                <FSelect name="score" size="sm" data={scoreOptions} clearable label="Оценка" w="100%" maw={252} />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата отзыва"
                                    size="sm"
                                    clearable
                                    maw={252}
                                />
                            </Group>
                            <Box mt={16}>
                                <FRadioGroup name="isPublished" defaultValue="">
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                            </Box>
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
