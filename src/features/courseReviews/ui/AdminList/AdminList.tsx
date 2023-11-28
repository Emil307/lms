import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import {
    AdminCourseReviewFiltersForm,
    AdminCourseReviewFromList,
    courseReviewApi,
    useAdminCourseReviewsResources,
} from "@entities/courseReview";
import { useMedia } from "@shared/utils";
import { columns, radioGroupValues, filterInitialValues, columnOrder, scoreOptions } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminCourseReviewsRequest } from "./utils";
import useStyles from "./AdminList.styles";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const isMobile = useMedia("sm");

    const courseReviewsResources = useAdminCourseReviewsResources({ type: FilterTypes.SELECT });

    const handleClickCell = (cell: MRT_Cell<AdminCourseReviewFromList>) => {
        router.push({ pathname: "/admin/settings/course-reviews/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminCourseReviewFromList, AdminCourseReviewFiltersForm>
                queryKey={[
                    QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                    [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                ]}
                queryFunction={(params) => courseReviewApi.getAdminCourseReviews(adaptGetAdminCourseReviewsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "courseId", "createdAtFrom", "createdAtTo", "score", "isPublished"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isPublished }]}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Отзывов"
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
                                <FSearch name="query" placeholder="Поиск" size="sm" className={classes.filterSearch} />
                                <FSelect
                                    name="categoryIds"
                                    label="Категория"
                                    data={prepareOptionsForSelect({
                                        data: courseReviewsResources.data?.courses,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={courseReviewsResources.isLoading || !courseReviewsResources.data?.courses.length}
                                />
                                <FSelect
                                    name="score"
                                    label="Оценка"
                                    data={scoreOptions}
                                    size="sm"
                                    clearable
                                    className={classes.filterSelect}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата отзыва"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
                                />
                            </Flex>
                            <FRadioGroup name="isPublished" defaultValue="" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
                            <Flex gap={16}>
                                <Button w={164} type="submit">
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

export default AdminList;
