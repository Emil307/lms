import { Flex, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { Paragraph } from "@shared/ui";
import IconCalendar from "public/icons/calendar.svg";
import useStyles from "./StartDateBlock.styles";

export interface StartDateBlockProps {
    startDate?: string;
}

const StartDateBlock = ({ startDate }: StartDateBlockProps) => {
    const { classes } = useStyles();

    const renderStartDate = () => {
        if (startDate) {
            return <Paragraph variant="text-small-m">{`Начало: ${dayjs(startDate).format("D MMMM YYYY")}`}</Paragraph>;
        }
        return <Paragraph variant="text-small-m">Свободное прохождение</Paragraph>;
    };

    return (
        <Flex gap={8} align="center">
            <ThemeIcon className={classes.wrapperCalendarIcon}>
                <IconCalendar />
            </ThemeIcon>
            {renderStartDate()}
        </Flex>
    );
};

export default StartDateBlock;
