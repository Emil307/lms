import { Flex, Spoiler as MSpoiler, SpoilerProps as SpoilerProps, Text, ThemeIcon } from "@mantine/core";
import { useMemo } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { CoursePackageDetails } from "@entities/coursePackage";
import useStyles from "./CourseList.styles";
import { CourseItem } from "../CourseItem";

export interface CourseListProps extends Omit<SpoilerProps, "children" | "maxHeight" | "hideLabel" | "showLabel"> {
    data: CoursePackageDetails;
}

const CourseListFromPackage = ({ data, ...props }: CourseListProps) => {
    const { classes } = useStyles();

    const showLabel = (
        <Flex gap={8}>
            <Text className={classes.spoilerLabelText}>Показать все</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronDown />
            </ThemeIcon>
        </Flex>
    );

    const hideLabel = (
        <Flex gap={8}>
            <Text className={classes.spoilerLabelText}>Свернуть</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronUp />
            </ThemeIcon>
        </Flex>
    );

    const renderCourses = useMemo(() => data.courses.map((course) => <CourseItem key={course.id} data={course} />), [data.courses]);

    return (
        <MSpoiler {...props} classNames={classes} maxHeight={184} showLabel={showLabel} hideLabel={hideLabel}>
            <Flex direction="column" gap={8}>
                {renderCourses}
            </Flex>
        </MSpoiler>
    );
};

export default CourseListFromPackage;
