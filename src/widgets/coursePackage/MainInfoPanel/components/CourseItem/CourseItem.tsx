import { Divider, Flex, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { CourseFromCoursePackage } from "@entities/coursePackage";
import { Button, Paragraph } from "@shared/ui";
import useStyles from "./CourseItem.styles";

export interface CourseItemProps {
    data: CourseFromCoursePackage;
}

const MemoizedCourseItem = memo(function CourseItem({ data }: CourseItemProps) {
    const { classes } = useStyles();
    const router = useRouter();

    const handleRedirectCoursePage = () => {
        router.push({ pathname: "/courses/[id]", query: { id: String(data.id) } });
    };

    return (
        <Flex key={data.id} gap={16}>
            <Button
                variant="text"
                rightIcon={
                    <ThemeIcon className={classes.iconChevronRightWrapper}>
                        <ChevronRight />
                    </ThemeIcon>
                }
                size="small"
                onClick={handleRedirectCoursePage}>
                {data.name}
            </Button>
            <Divider my="xs" sx={{ flex: 1 }} color="gray45" variant="dashed" />
            <Paragraph variant="small-semi" className={classes.price}>{`${data.price.toLocaleString("ru")} ₽`}</Paragraph>
        </Flex>
    );
});

export default MemoizedCourseItem;
