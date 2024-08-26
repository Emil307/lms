import { Title, TitleProps } from "@mantine/core";
import useStyles from "./Display.styles";

export interface DisplayProps extends TitleProps {}

const Display = ({ children, className, color = "dark", ...props }: DisplayProps) => {
    const { classes, cx } = useStyles();

    return (
        <Title className={cx(classes.root, className)} color={color} {...props}>
            {children}
        </Title>
    );
};

export default Display;
