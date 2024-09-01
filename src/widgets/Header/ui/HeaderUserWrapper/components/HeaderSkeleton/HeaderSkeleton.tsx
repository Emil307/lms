import { Flex, Header as MHeader, Skeleton } from "@mantine/core";
import useStyles from "./HeaderSkeleton.styles";

const HeaderSkeleton = () => {
    const { classes } = useStyles();

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Skeleton className={classes.left} />
                <Skeleton className={classes.right} />
            </Flex>
        </MHeader>
    );
};

export default HeaderSkeleton;
