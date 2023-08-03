import { Flex, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import IconCalendar from "public/icons/calendar.svg";
import { Paragraph } from "@shared/ui";
import useStyles from "./AccessEndDate.styles";

export interface AccessEndDateProps {
    availableTo: Date | null;
}

const AccessEndDate = ({ availableTo }: AccessEndDateProps) => {
    const { classes } = useStyles();

    return (
        <Flex align="center" gap={6}>
            <ThemeIcon className={classes.wrapperIcon}>
                <IconCalendar />
            </ThemeIcon>
            {availableTo ? (
                <Paragraph variant="text-small-m">{`Доступ: до ${dayjs(availableTo).format("D MMMM YYYY HH:mm")}`}</Paragraph>
            ) : (
                <Paragraph variant="text-small-m">Доступ не ограничен</Paragraph>
            )}
        </Flex>
    );
};

export default AccessEndDate;
