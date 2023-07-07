import { ActionIcon, Avatar, Card as MCard, CardProps as MCardProps, Flex, Text, Spoiler } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { getFullName } from "@shared/utils";
import { Heading, Paragraph, Rating } from "@shared/ui";
import { CourseReviewFromList } from "@entities/courseReview";
import AvatarIcon from "public/icons/avatar.svg";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CourseReviewFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const router = useRouter();
    const { classes } = useStyles();

    const handleOpenCourse = () =>
        router.push({
            pathname: "/courses/[id]",
            query: { id: String(data.course?.id) },
        });

    const userFullName = getFullName({
        data: data.user.profile,
    });

    return (
        <MCard {...props} className={classes.root}>
            <MCard.Section className={classes.section}>
                <Flex gap={16}>
                    <Flex align="center" gap={16}>
                        {/* <Avatar src={data.avatar.absolutePath} alt="avatar" w={64} h={64} radius={50} /> */}
                        <Avatar
                            src={data.user.profile.avatar?.absolutePath}
                            alt="avatar"
                            w={64}
                            h={64}
                            radius={50}
                            styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                            <AvatarIcon />
                        </Avatar>
                        <Flex direction="column" gap={4}>
                            <Heading order={4} lineClamp={1}>
                                {userFullName}
                            </Heading>
                            <Paragraph variant="text-small-m" color="gray45">
                                {dayjs(data.createdAt).format("D MMMM YYYY HH:mm")}
                            </Paragraph>
                        </Flex>
                    </Flex>
                    <Flex className={classes.rating}>
                        <Rating defaultValue={1} count={1} readOnly size="small" />
                        <Text className={classes.ratingValue}>{data.score}</Text>
                    </Flex>
                </Flex>
                <Flex direction="column" gap={2}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Пройден курс
                    </Paragraph>
                    <Flex align="center" gap={8}>
                        <Text className={classes.courseName}>{data.course?.name}</Text>
                        <ActionIcon className={classes.iconLinkCourse} onClick={handleOpenCourse}>
                            <ChevronRight />
                        </ActionIcon>
                    </Flex>
                </Flex>
            </MCard.Section>
            <MCard.Section className={classes.section}>
                <Spoiler maxHeight={192} showLabel="еще" hideLabel="свернуть">
                    <Paragraph variant="small-m">{data.content}</Paragraph>
                </Spoiler>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
