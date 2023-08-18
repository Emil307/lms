import { Flex, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import IconCalendar from "public/icons/calendar.svg";
import { Paragraph } from "@shared/ui";
import useStyles from "./AvailableDate.styles";

export interface AvailableDateProps {
    availableTo: Date | null;
}

const AvailableDate = ({ availableTo }: AvailableDateProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <ThemeIcon className={classes.wrapperIcon}>
                <IconCalendar />
            </ThemeIcon>
            {availableTo ? (
                <Paragraph variant="text-small-m">{`Доступ: до ${dayjs(availableTo).format("D MMMM YYYY")}`}</Paragraph>
            ) : (
                <Paragraph variant="text-small-m">Доступ не ограничен</Paragraph>
            )}
        </Flex>
    );
};

export default AvailableDate;
