import { Box, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { Heart, Trash2 } from "react-feather";
import { BreadCrumbs, Button, Heading } from "@shared/ui";
import { List as CourseList } from "@features/courses";
import { useDeleteFavoriteCourses } from "@entities/course";
import { breadCrumbsItems } from "./constants";

const MyFavoriteCoursesPage = () => {
    const deleteFavoriteCourses = useDeleteFavoriteCourses();

    const handleDeleteFavoriteCourses = () => {
        deleteFavoriteCourses.mutate(null);
    };

    return (
        <Box>
            <CourseList
                perPage={9}
                withPagination
                isFavorite
                headerSlot={(courseData) => (
                    <Flex justify="space-between" gap={24} mb={32}>
                        <Box>
                            <BreadCrumbs items={breadCrumbsItems} mb={8} />
                            <Flex align="center" gap={12}>
                                <ThemeIcon color="primaryHover">
                                    <Heart />
                                </ThemeIcon>
                                <Heading>Избранные курсы</Heading>
                            </Flex>
                        </Box>
                        {!!courseData?.data.length && (
                            <Button variant="border" leftIcon={<Trash2 />} onClick={handleDeleteFavoriteCourses}>
                                Очистить
                            </Button>
                        )}
                    </Flex>
                )}
            />
        </Box>
    );
};

export default MyFavoriteCoursesPage;
