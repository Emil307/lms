import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { IconCheck } from "@tabler/icons";
import { getIcon } from "@shared/utils";
import { ExternalIconFromList } from "@entities/externalIcon";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<FlexProps, "children" | "onClick"> {
    data: ExternalIconFromList;
    isSelected?: boolean;
    onClick?: (id: string) => void;
}

const MemoizedCard = memo(function Card({ data, isSelected = true, onClick, ...props }: CardProps) {
    const { classes } = useStyles({ isSelected });

    const handleClick = () => onClick?.(data.id);

    return (
        <Flex {...props} className={classes.root} onClick={handleClick}>
            {getIcon({ iconName: data.name })}
            {isSelected && (
                <ThemeIcon variant="outline" className={classes.wrapperCheckIcon}>
                    <IconCheck />
                </ThemeIcon>
            )}
        </Flex>
    );
});

export default MemoizedCard;
