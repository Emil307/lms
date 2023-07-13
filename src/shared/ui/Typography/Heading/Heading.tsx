import { Title, TitleProps } from "@mantine/core";
import useStyles from "./Heading.styles";

export interface HeadingProps extends TitleProps {}

const Heading = ({ children, className, ...props }: HeadingProps) => {
    const { classes, cx } = useStyles({ order: props.order });

    return (
        <Title className={cx(classes.root, className)} {...props}>
            {children}
        </Title>
    );
};

export default Heading;
