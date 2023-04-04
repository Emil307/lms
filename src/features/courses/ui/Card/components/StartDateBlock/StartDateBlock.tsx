import { Group, Text, ThemeIcon } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
import IconCalendar from "public/icons/calendar.svg";
import useStyles from "./StartDateBlock.styles";

export interface StartDateBlockProps {
    startDate?: string;
}

const StartDateBlock = ({ startDate }: StartDateBlockProps) => {
    const { classes } = useStyles();

    const renderStartDate = () => {
        if (startDate) {
            return (
                <Text className={classes.startDate}>{`Начало: ${getHumanDate(new Date(startDate), {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}`}</Text>
            );
        }
        return <Text className={classes.startDate}>Свободное прохождение</Text>;
    };

    return (
        <Group sx={{ gap: 8 }}>
            <ThemeIcon color="secondary16" w={32} h={32} sx={{ borderRadius: 56 }}>
                <IconCalendar />
            </ThemeIcon>
            {renderStartDate()}
        </Group>
    );
};

export default StartDateBlock;
