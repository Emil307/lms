import { Flex, Text, Divider } from "@mantine/core";
import useStyles from "./DateDivider.styles";
import { getFormatCreatedAt } from "./utils";

export interface DateDividerProps {
    date: Date;
}

const DateDivider = ({ date }: DateDividerProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Divider className={classes.divider} size={1} color="grayLight" />
            <Text className={classes.dateInfo}>{getFormatCreatedAt(date)}</Text>
            <Divider className={classes.divider} size={1} color="grayLight" />
        </Flex>
    );
};

export default DateDivider;
