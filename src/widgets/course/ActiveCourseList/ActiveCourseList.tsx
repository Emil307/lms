import { Flex, Skeleton } from "@mantine/core";
import { useRouter } from "next/router";
import { Button, EmptyData, Heading, Paragraph } from "@shared/ui";
import { Card } from "@features/groups";
import { GroupFromList, useGroups } from "@entities/group";
import { List as ListComponent } from "@components/List";
import { initialParamsForCoursesInProgress, initialParamsForNewCourses } from "./constants";

const ActiveCourseList = () => {
    const router = useRouter();
    const { data: newCourses, isFetching: isFetchingNewCourses } = useGroups(initialParamsForNewCourses);
    const { data: coursesInProgress, isFetching: isFetchingCoursesInProgress } = useGroups(initialParamsForCoursesInProgress);

    if (isFetchingNewCourses || isFetchingCoursesInProgress) {
        return (
            <>
                <Skeleton maw={261} h={72} radius={8} />
                <Skeleton w="100%" h={268} radius={16} />
            </>
        );
    }

    if (!newCourses?.data || !coursesInProgress?.data) {
        return null;
    }

    const groupList = coursesInProgress.data.concat(newCourses.data);

    const handleOpenMyCourseDetails = (id: unknown) => router.push({ pathname: "/my-courses/[id]", query: { id: String(id) } });

    const renderContent = () => {
        if (!groupList.length) {
            return <EmptyData title="У Вас нет новых и текущих курсов" description="Чтобы посмотреть Ваши курсы нажмите на кнопку ”Все”" />;
        }
        return (
            <ListComponent<GroupFromList>
                data={groupList}
                colProps={{ md: 4, sm: 6 }}
                renderItem={(props) => <Card {...props} onClick={handleOpenMyCourseDetails} />}
            />
        );
    };

    const handleClickAllMyCourses = () => router.push("/my-courses");

    return (
        <Flex gap={32} direction="column">
            <Flex gap={8} direction="column">
                <Flex gap={24}>
                    <Heading order={1}>Мои курсы</Heading>
                    <Button variant="white" size="small" onClick={handleClickAllMyCourses}>
                        Все
                    </Button>
                </Flex>
                <Paragraph variant="large" color="neutral_gray">
                    Текущие и новые курсы
                </Paragraph>
            </Flex>
            {renderContent()}
        </Flex>
    );
};

export default ActiveCourseList;
