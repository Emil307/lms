import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { Button, Heading } from "@shared/ui";
import { FileTypeCard } from "@features/materials";
import useStyles from "./MaterialTypeCard.styles";

export interface MaterialTypeCardProps extends Omit<FlexProps, "children" | "id" | "onClick"> {
    data: FileTypeCard;
    onClick: (id: number) => void;
}

const MemoizedMaterialTypeCard = memo(function MaterialTypeCard({ data, onClick, ...props }: MaterialTypeCardProps) {
    const { classes } = useStyles();

    const handleClick = () => onClick(data.id);

    return (
        <Flex {...props} className={classes.root}>
            <Flex className={classes.heading}>
                <Heading order={2} sx={{ flex: 1 }}>
                    {data.title}
                </Heading>
                <ThemeIcon variant="outline" className={classes.wrapperIcon}>
                    {data.icon}
                </ThemeIcon>
            </Flex>
            <Button variant="secondary" onClick={handleClick} w="min-content">
                Выбрать
            </Button>
        </Flex>
    );
});

export default MemoizedMaterialTypeCard;
