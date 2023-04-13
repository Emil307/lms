import { Group, Title, Text, Flex } from "@mantine/core";
import { List } from "@components/List";
import { Course, GetFavoriteCoursesResponse } from "@entities/course";
import { CourseCard } from "@features/courses";
import IconEmptyBox from "public/icons/emptyBox.svg";
import useStyles from "./FavoriteCoursesList.styles";

export interface FavoriteCoursesListProps {
    data: GetFavoriteCoursesResponse;
}

const FavoriteCoursesList = ({ data }: FavoriteCoursesListProps) => {
    const { classes } = useStyles();
    if (!data.data.length) {
        return (
            <Group sx={{ gap: 24 }}>
                <IconEmptyBox />
                <Flex direction="column" gap={8} maw={472}>
                    <Title order={3}>К сожалению, у вас нет избранных курсов. Попробуем исправить это?</Title>
                    <Text className={classes.description}>
                        Чтобы добавить курс в раздел нажмите на кнопку “Избранное” в карточке курса.
                    </Text>
                </Flex>
            </Group>
        );
    }

    return (
        <List<Course>
            data={data.data}
            renderItem={(props) => <CourseCard {...props} />}
            colProps={{ lg: 4, md: 4, sm: 6, pb: { sm: 20 } }}
            withPagination
            pagination={data.meta.pagination}
            mb={{ sm: -20 }}
        />
    );
};

export default FavoriteCoursesList;
