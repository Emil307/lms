import { Flex, Divider } from "@mantine/core";
import { Paragraph } from "@shared/ui";
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
            <Paragraph variant="text-small-m" color="gray45">
                {getFormatCreatedAt(date)}
            </Paragraph>
            <Divider className={classes.divider} size={1} color="grayLight" />
        </Flex>
    );
};

export default DateDivider;
