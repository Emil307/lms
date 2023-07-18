import { Flex, Spoiler as MSpoiler, SpoilerProps as SpoilerProps } from "@mantine/core";
import { useMemo } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { CoursePackageDetails } from "@entities/coursePackage";
import { Button } from "@shared/ui";
import useStyles from "./CourseList.styles";
import { CourseItem } from "../CourseItem";

export interface CourseListProps extends Omit<SpoilerProps, "children" | "maxHeight" | "hideLabel" | "showLabel"> {
    data: CoursePackageDetails;
}

const CourseListFromPackage = ({ data, ...props }: CourseListProps) => {
    const { classes } = useStyles();

    const showLabel = (
        <Button variant="text" rightIcon={<ChevronDown />} size="small">
            Показать все
        </Button>
    );

    const hideLabel = (
        <Button variant="text" rightIcon={<ChevronUp />} size="small">
            Свернуть
        </Button>
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
