import { Box, BoxProps, Flex, Group } from "@mantine/core";
import { memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Heading } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { CourseCollectionFromList } from "@entities/courseCollection";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: CourseCollectionFromList;
    isActive?: boolean;
    onClick?: (id: unknown) => void;
    courseCollection?: boolean;
    customStyles?: () => { classes: any; cx: (...args: any) => string };
    gap?: number;
}

const MemoizedCard = memo(function Card({ data, isActive, onClick, courseCollection, customStyles, gap = 35, ...props }: CardProps) {
    const defaultStyles = useStyles();
    const { classes, cx } = customStyles ? customStyles() : defaultStyles;
    const router = useRouter();
    const handleClickCard = () => router.push({ pathname: "/course-collections/[id]", query: { id: String(data.id) } });

    return (
        <Box {...props} className={cx(classes.root, { activeSlide: isActive })} onClick={handleClickCard}>
            <Group className={classes.content}>
                <Flex direction="column" gap={gap} miw={264} w="100%">
                    <Flex className={classes.imageContent}>
                        <Flex className={classes.courseInfo}>
                            <Button variant="primary" size="small">{`${data.coursesCount} ${getPluralString(
                                data.coursesCount,
                                "курс",
                                "курса",
                                "курсов"
                            )}`}</Button>
                        </Flex>
                        {data.cover && (
                            <Image
                                src={data.cover.absolutePath}
                                alt={data.cover.name}
                                fill
                                sizes="100%"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </Flex>
                    <Heading order={2} lineClamp={2} className={classes.title}>
                        {data.name}
                    </Heading>
                </Flex>
            </Group>
        </Box>
    );
});

export default MemoizedCard;
