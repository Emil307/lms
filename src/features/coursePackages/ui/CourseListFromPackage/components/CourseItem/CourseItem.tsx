import { ActionIcon, Divider, Flex, Text } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { CourseFromCoursePackage } from "@entities/coursePackage";
import { Paragraph } from "@shared/ui";
import useStyles from "./CourseItem.styles";

export interface CourseItemProps {
    data: CourseFromCoursePackage;
}

const MemoizedCourseItem = memo(function CourseItem({ data }: CourseItemProps) {
    const router = useRouter();
    const { classes } = useStyles();

    const handleRedirectCoursePage = () => {
        router.push({ pathname: "/courses/[id]", query: { id: String(data.id) } });
    };
    return (
        <Flex key={data.id} gap={16}>
            <Flex align="center" gap={8} onClick={handleRedirectCoursePage}>
                <Text className={classes.name} lineClamp={1}>
                    {data.name}
                </Text>
                <ActionIcon className={classes.iconLink}>
                    <ChevronRight />
                </ActionIcon>
            </Flex>
            <Divider my="xs" sx={{ flex: 1 }} color="gray45" variant="dashed" />
            <Paragraph variant="text-small-semi" className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Paragraph>
        </Flex>
    );
});

export default MemoizedCourseItem;
