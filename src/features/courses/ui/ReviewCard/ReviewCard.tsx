import { ActionIcon, Avatar, Card as MCard, CardProps as MCardProps, Flex, Group, Text } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { Review } from "@entities/course";
import { getLocalizationDate } from "@shared/utils";
import { Heading, Rating } from "@shared/ui";
import useStyles from "./ReviewCard.styles";

export interface ReviewCardProps extends Omit<MCardProps, "children"> {
    data: Review;
}

const MemoizedReviewCard = memo(function ReviewCard({ data, ...props }: ReviewCardProps) {
    const { classes } = useStyles();

    const handleOpenCourse = () => undefined;

    return (
        <MCard {...props} className={classes.root}>
            <MCard.Section className={classes.section}>
                <Group>
                    <Flex align="center" sx={{ gap: 16 }}>
                        <Avatar src={data.avatar.absolutePath} alt="avatar" w={64} h={64} radius={50} />
                        <Flex direction="column" gap={4}>
                            <Heading order={4}>Кремышева Виктория</Heading>
                            <Text className={classes.createdAt}>{getLocalizationDate(data.createdAt, true)}</Text>
                        </Flex>
                    </Flex>
                    <Flex className={classes.rating}>
                        <Rating defaultValue={1} count={1} readOnly size="small" />
                        <Text className={classes.ratingValue}>{data.rating}</Text>
                    </Flex>
                </Group>
                <Flex direction="column" gap={2}>
                    <Text className={classes.courseNameHelperText}>Пройден курс</Text>
                    <Flex align="center" gap={8}>
                        <Text className={classes.courseName}>{data.course.name}</Text>
                        <ActionIcon className={classes.iconLinkCourse} onClick={handleOpenCourse}>
                            <ChevronRight />
                        </ActionIcon>
                    </Flex>
                </Flex>
            </MCard.Section>
            <MCard.Section className={classes.section}>
                <Text>{data.content}</Text>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedReviewCard;
