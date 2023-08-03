import { Box, Flex, ThemeIcon, Collapse } from "@mantine/core";
import { ChevronDown, ChevronUp } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { FDateRangePicker, FSearch, FSelect, Heading, ManagedDataGrid } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseReviewFromList, courseReviewApi } from "@entities/courseReview";
import { columns, radioGroupValues, filterInitialValues, columnOrder, scoreOptions } from "./constants";
import { ListMenu } from "./components";
import { adaptGetAdminCourseReviewsRequest } from "./utils";
import { AdminCourseReviewsExtraParams, AdminCourseReviewsFiltersForm } from "./types";
import useStyles from "./Reviews.styles";

export interface ReviewsProps {
    courseId: string;
}

const Reviews = ({ courseId }: ReviewsProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const [openedFilters, setOpenedFilters] = useState(false);

    const handleClickCell = (cell: MRT_Cell<AdminCourseReviewFromList>) => {
        router.push({ pathname: "/admin/settings/course-reviews/[id]", query: { id: cell.row.original.id.toString() } });
    };

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);

    const renderIconToggleButton = () => {
        if (openedFilters) {
            return (
                <ThemeIcon className={classes.iconToggle}>
                    <ChevronUp />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon className={classes.iconToggle}>
                <ChevronDown />
            </ThemeIcon>
        );
    };

    const labelToggleButton = openedFilters ? "Скрыть фильтр" : "Показать фильтр";

    return (
        <ManagedDataGrid<AdminCourseReviewFromList, AdminCourseReviewsFiltersForm, AdminCourseReviewsExtraParams>
            queryKey={QueryKeys.GET_ADMIN_COURSE_REVIEWS}
            queryFunction={(params) => courseReviewApi.getAdminCourseReviews(adaptGetAdminCourseReviewsRequest(params))}
            queryCacheKeys={["page", "perPage", "sort", "query", "courseId", "createdAtFrom", "createdAtTo", "score", "isPublished"]}
            filter={{
                initialValues: filterInitialValues,
            }}
            extraFilterParams={{ courseId }}
            renderBadge={(cell) => [{ condition: cell.row.original.isPublished }]}
            onClickCell={handleClickCell}
            columns={columns}
            countName="Отзывов"
            initialState={{
                columnOrder,
            }}
            renderRowActions={({ row }) => <ListMenu row={row} />}>
            {({ dirty, resetForm }) => {
                return (
                    <Box>
                        <Heading order={2}>Отзывы</Heading>
                        <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()} mt={32}>
                            {labelToggleButton}
                        </Button>
                        <Collapse in={openedFilters} w="100%" mt={16}>
                            <Flex gap={16} direction="column">
                                <Flex gap={8}>
                                    <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                                    <FSelect name="score" size="sm" data={scoreOptions} clearable label="Оценка" w="100%" maw={252} />
                                    <FDateRangePicker
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата отзыва"
                                        size="sm"
                                        clearable
                                        maw={252}
                                        w="100%"
                                    />
                                </Flex>
                                <FRadioGroup name="isPublished" defaultValue="">
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                                <Flex>
                                    <Button type="submit" w="100%" maw={164}>
                                        Найти
                                    </Button>
                                    {dirty && (
                                        <Button variant="white" w="100%" maw={164} onClick={resetForm}>
                                            Сбросить
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                        </Collapse>
                    </Box>
                );
            }}
        </ManagedDataGrid>
    );
};

export default Reviews;
