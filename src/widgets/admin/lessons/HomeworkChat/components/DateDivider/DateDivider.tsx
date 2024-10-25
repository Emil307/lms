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
            <Divider className={classes.divider} size={1} color="neutralGray200" />
            <Paragraph variant="text-small-m" color="neutralMain50">
                {getFormatCreatedAt(date)}
            </Paragraph>
            <Divider className={classes.divider} size={1} color="neutralGray200" />
        </Flex>
    );
};

export default DateDivider;
