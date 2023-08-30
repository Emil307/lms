import dayjs from "dayjs";
import { Flex, ThemeIcon } from "@mantine/core";
import { Paragraph } from "@shared/ui";
import IconCalendar from "public/icons/calendar.svg";
import useStyles from "./AvailableDateInfo.styles";

export interface AvailableDateInfoProps {
    availableTo: Date | null;
}

const AvailableDateInfo = ({ availableTo }: AvailableDateInfoProps) => {
    const { classes } = useStyles();

    const renderAvailableDate = () => {
        if (availableTo) {
            return (
                <Paragraph variant="text-small-m" className={classes.availableDate}>{`Доступ к материалам курса: до ${dayjs(
                    availableTo
                ).format("D MMMM YYYY")}`}</Paragraph>
            );
        }
        return (
            <Paragraph variant="text-small-m" className={classes.availableDate}>
                Бессрочный доступ
            </Paragraph>
        );
    };

    return (
        <Flex align="center" gap={8}>
            <ThemeIcon className={classes.iconCalendarWrapper}>
                <IconCalendar />
            </ThemeIcon>
            {renderAvailableDate()}
        </Flex>
    );
};

export default AvailableDateInfo;
