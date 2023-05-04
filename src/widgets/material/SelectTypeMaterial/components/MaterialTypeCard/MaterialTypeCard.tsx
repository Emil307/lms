import { Flex, FlexProps, ThemeIcon, Title } from "@mantine/core";
import { memo } from "react";
import { Button } from "@shared/ui";
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
                <Title order={2} color="dark" sx={{ flex: 1 }}>
                    {data.title}
                </Title>
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
