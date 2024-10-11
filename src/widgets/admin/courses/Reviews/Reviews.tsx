import { Box, Flex, ThemeIcon, Collapse } from "@mantine/core";
import { ChevronDown, ChevronUp } from "react-feather";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FDateRangePicker, FSearch, FSelect, Heading, ManagedDataGrid, Button } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { EntityNames, QueryKeys } from "@shared/constant";
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
            queryKey={[
                QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
            ]}
            queryFunction={(params) => courseReviewApi.getAdminCourseReviews(adaptGetAdminCourseReviewsRequest(params))}
            queryCacheKeys={["page", "perPage", "sort", "query", "courseId", "createdAtFrom", "createdAtTo", "score", "isPublished"]}
            filter={{
                initialValues: filterInitialValues,
            }}
            extraFilterParams={{ courseId: Number(courseId) }}
            renderBadge={(cell) => [{ condition: cell.row.original.isPublished }]}
            onClickCell={handleClickCell}
            columns={columns}
            countName="Отзывов"
            initialState={{
                columnOrder,
            }}
            renderRowActions={({ row }) => <ListMenu row={row} />}>
            {({ dirty, handleReset }) => {
                return (
                    <Box>
                        <Heading order={2}>Отзывы</Heading>
                        <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()} mt={32}>
                            {labelToggleButton}
                        </Button>
                        <Collapse in={openedFilters} w="100%" mt={16}>
                            <Flex className={classes.filterWrapper}>
                                <Flex className={classes.filterSearchAndSelects}>
                                    <FSearch className={classes.filterSearch}  name="query" placeholder="Поиск" />
                                    <FSelect
                                        className={classes.filterSelect}
                                        name="score"
                                        size="sm"
                                        data={scoreOptions}
                                        clearable
                                        label="Оценка"
                                    />
                                    <FDateRangePicker
                                        className={classes.filterDateRangePicker}
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата отзыва"
                                        size="sm"
                                        clearable
                                    />
                                </Flex>
                                <FRadioGroup name="isPublished" className={classes.filterRadioGroup}>
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup>
                                <Flex gap={16}>
                                    <Button type="submit" w={164}>
                                        Найти
                                    </Button>
                                    {dirty && (
                                        <Button type="button" variant="white" onClick={handleReset} w={164}>
                                            Cбросить
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
