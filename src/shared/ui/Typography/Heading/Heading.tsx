import { Title, TitleProps } from "@mantine/core";
import useStyles from "./Heading.styles";

export interface HeadingProps extends TitleProps {}

const Heading = ({ children, order, ...props }: HeadingProps) => {
    const { classes } = useStyles({ order });

    return (
        <Title className={classes.root} {...props}>
            {children}
        </Title>
    );
};

export default Heading;
