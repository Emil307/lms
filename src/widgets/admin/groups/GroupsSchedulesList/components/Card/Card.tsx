import useStyles from "./Card.styles";
import { AdminGroupSchedule, AdminGroupSchedulesInfo } from "@entities/group";
import { Flex, Box, ThemeIcon, Collapse } from "@mantine/core";
import { ChevronDown as ChevronDownIcon } from "react-feather";
import React, { useState } from "react";
import UsersIcon from "public/icons/users.svg";
import { Button, Heading, Paragraph } from "@shared/ui";
import dayjs from "dayjs";
import SmallArrowIcon from "public/icons/smallArrow.svg";

interface CardProps {
    data: AdminGroupSchedulesInfo;
    onClick: (courseId: number) => void;
}

const Card = ({ data, onClick }: CardProps) => {
    const { classes } = useStyles();

    const [isOpenedSchedule, setOpenedSchedule] = useState(false);

    const handleToggleOpenedSchedule = () => setOpenedSchedule((prevState) => !prevState);

    const handleCourseButtonClick = () => onClick(data.course.id);

    const firstSchedules = data.schedules.slice(0, 4);
    const restSchedules = data.schedules.slice(4);

    const renderSchedule = (schedule: AdminGroupSchedule) => {
        return (
            <Flex className={classes.schedule} align="center">
                <Paragraph className={classes.scheduleDate} variant="text-small-semi">
                    {dayjs(schedule.date).format("D MMMM")}
                </Paragraph>
                <Flex gap={6} wrap="wrap">
                    {schedule.timings.map((timing) => (
                        <Box className={classes.badge} key={timing.id}>
                            <Paragraph variant="text-caption">
                                {dayjs(timing.from).format("HH:mm")}-{dayjs(timing.to).format("HH:mm")}
                            </Paragraph>
                        </Box>
                    ))}
                </Flex>
            </Flex>
        );
    };

    return (
        <Flex className={classes.card} direction="column" align="flex-start">
            <Flex gap={16} direction="column" align="flex-start">
                <Flex gap={16} align="center">
                    <ThemeIcon
                        w={64}
                        h={64}
                        color="primary"
                        sx={(theme) => ({
                            backgroundColor: theme.colors.secondary16[0],
                            borderRadius: 160,
                        })}>
                        <UsersIcon />
                    </ThemeIcon>
                    <Flex gap={8} direction="column">
                        <Heading order={4}>{data.name}</Heading>
                        <Paragraph variant="text-small-m">
                            Дата обучения: {dayjs(data.educationStartDate).format("D MMMM")}
                            &nbsp;-&nbsp;
                            {dayjs(data.educationFinishDate).format("D MMMM")}
                        </Paragraph>
                    </Flex>
                </Flex>
                <Flex gap={6} direction="column">
                    <Paragraph variant="text-small-m" color="neutral_gray">
                        Курс
                    </Paragraph>
                    <Button
                        className={classes.courseButton}
                        variant="text"
                        rightIcon={<SmallArrowIcon />}
                        onClick={handleCourseButtonClick}>
                        {data.course.name}
                    </Button>
                </Flex>
                <Flex gap={6} direction="column">
                    {firstSchedules.map((schedule) => renderSchedule(schedule))}
                </Flex>
            </Flex>

            {restSchedules.length > 0 && (
                <>
                    <Collapse in={isOpenedSchedule}>
                        <Flex gap={6} direction="column" mt={6}>
                            {restSchedules.map((schedule) => renderSchedule(schedule))}
                        </Flex>
                    </Collapse>
                    <Button
                        variant="text"
                        rightIcon={
                            <ThemeIcon color="dark" sx={{ transform: `rotate(${isOpenedSchedule ? 180 : 0}deg)` }}>
                                <ChevronDownIcon />
                            </ThemeIcon>
                        }
                        onClick={handleToggleOpenedSchedule}
                        mt={24}>
                        {isOpenedSchedule ? "Скрыть" : "Развернуть расписание"}
                    </Button>
                </>
            )}
        </Flex>
    );
};

export default Card;
