import { Flex, Spoiler as MSpoiler, SpoilerProps as SpoilerProps, Text, ThemeIcon } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { ChevronRight, ChevronUp } from "react-feather";
import { useEventListener } from "@mantine/hooks";
import { CoursePackage } from "@entities/coursePackage";
import { getPluralString } from "@shared/utils";
import useStyles from "./CourseListFromPackage.styles";
import { CourseItem } from "./components";

export interface CourseListFromPackageProps extends Omit<SpoilerProps, "children" | "maxHeight" | "hideLabel" | "showLabel"> {
    data: CoursePackage;
}

//TODO: Пока просто отображает список без пагинации
const CourseListFromPackage = ({ data, ...props }: CourseListFromPackageProps) => {
    const spoilerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const spoilerControlRef = useEventListener("click", () => {
        setIsOpen((prev) => !prev);
        spoilerRef.current?.children[0].scrollTo({ top: 0, behavior: "smooth" });
    });

    const { classes } = useStyles({ isOpen });

    const showLabel = () => {
        const hiddenCountCourse = data.courses.meta.pagination.total - 3;
        return (
            <Flex gap={8}>
                <Text className={classes.spoilerLabelText}>{`Еще ${hiddenCountCourse} ${getPluralString(
                    hiddenCountCourse,
                    "курс",
                    "курса",
                    "курсов"
                )}`}</Text>
                <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                    <ChevronRight />
                </ThemeIcon>
            </Flex>
        );
    };

    const hideLabel = (
        <Flex gap={8}>
            <Text className={classes.spoilerLabelText}>Свернуть</Text>
            <ThemeIcon variant="outline" color="dark" sx={{ border: "none" }}>
                <ChevronUp />
            </ThemeIcon>
        </Flex>
    );

    const renderCourses = useMemo(() => data.courses.data.map((course) => <CourseItem key={course.id} data={course} />), [data.courses]);

    return (
        <MSpoiler
            {...props}
            ref={spoilerRef}
            classNames={classes}
            controlRef={spoilerControlRef}
            maxHeight={88}
            showLabel={showLabel()}
            hideLabel={hideLabel}>
            <Flex direction="column" gap={8}>
                {renderCourses}
            </Flex>
        </MSpoiler>
    );
};

export default CourseListFromPackage;
