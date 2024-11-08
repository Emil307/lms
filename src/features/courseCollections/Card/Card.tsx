import { Box, BoxProps, Flex, Group, Paper } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { CourseCollectionFromList } from "@entities/courseCollection";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: CourseCollectionFromList;
    isActive?: boolean;
    onClick?: (id: unknown) => void;
    courseCollection?: boolean;
    customStyles?: () => { classes: any; cx: (...args: any) => string };
}

const MemoizedCard = memo(function Card({ data, isActive, onClick, courseCollection, customStyles, ...props }: CardProps) {
    const { classes, cx } = useStyles();

    return (
        <Link className={classes.linkCourse} href={{ pathname: "/course-collections/[id]", query: { id: String(data.id) } }}>
            <Box {...props} className={cx(classes.root, { activeSlide: isActive })} h={{ base: 376, sm: 432 }}>
                <Group className={classes.content}>
                    <Flex direction="column" gap={{ base: 16, sm: 32 }} miw={264} w="100%">
                        <Flex className={classes.imageContent}>
                            <Flex className={classes.courseInfo}>
                                <Paper h={28} pt={6.6} pr={11} pb={6.6} pl={11} bg="neutralGray100" radius={8}>
                                    <Paragraph variant="text-caption" color="dark">
                                        {`${data.coursesCount} ${getPluralString(data.coursesCount, "курс", "курса", "курсов")}`}
                                    </Paragraph>
                                </Paper>
                            </Flex>
                            {data.cover && (
                                <Image
                                    src={data.cover.absolutePath}
                                    alt={data.cover.name}
                                    fill
                                    sizes="100%"
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                        </Flex>
                        <Heading order={2} lineClamp={3}>
                            {data.name}
                        </Heading>
                    </Flex>
                </Group>
            </Box>
        </Link>
    );
});

export default MemoizedCard;
