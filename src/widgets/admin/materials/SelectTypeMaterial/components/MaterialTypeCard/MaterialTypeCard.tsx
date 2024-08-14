import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { memo, ReactNode } from "react";
import { Button, Heading } from "@shared/ui";
import useStyles from "./MaterialTypeCard.styles";

export interface MaterialTypeCardProps extends Omit<FlexProps, "children" | "id" | "onClick"> {
    icon: ReactNode;
    title: string;
    onClick: () => void;
}

const MemoizedMaterialTypeCard = memo(function MaterialTypeCard({ title, icon, onClick, ...props }: MaterialTypeCardProps) {
    const { classes } = useStyles();
    return (
        <Flex {...props} className={classes.root}>
            <Flex justify="space-between" className={classes.heading}>
                <Heading order={2}>{title}</Heading>
                <Button variant="secondary" onClick={onClick} w="min-content">
                    Выбрать
                </Button>
            </Flex>
            <ThemeIcon className={classes.wrapperIcon}>{icon}</ThemeIcon>
        </Flex>
    );
});

export default MemoizedMaterialTypeCard;
