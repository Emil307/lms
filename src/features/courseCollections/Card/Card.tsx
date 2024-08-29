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
    onClick?: (id: unknown) => void;
}

const MemoizedCard = memo(function Card({ data, onClick, ...props }: CardProps) {
    const { classes } = useStyles();
    const router = useRouter();
    const handleClickCard = () => router.push({ pathname: "/course-collections/[id]", query: { id: String(data.id) } });

    return (
        <Box {...props} className={classes.root} onClick={handleClickCard}>
            <Group className={classes.content}>
                <Flex direction="column" gap={35} miw={264}>
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
                    <Heading order={3} lineClamp={2}>
                        {data.name}
                    </Heading>
                </Flex>
            </Group>
        </Box>
    );
});

export default MemoizedCard;
