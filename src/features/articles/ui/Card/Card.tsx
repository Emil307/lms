import { Flex, FlexProps, ThemeIcon, Text, Group, Title } from "@mantine/core";
import { ReactNode, memo } from "react";
import { FileText, Lock } from "react-feather";
import { ArticleFromList } from "@entities/article";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<FlexProps, "onClick"> {
    data: ArticleFromList;
    actionSlot?: ReactNode;
    onClick?: (article: ArticleFromList) => void;
}

const MemoizedCard = memo(function Card({ data, actionSlot, onClick, ...props }: CardProps) {
    const { classes } = useStyles({ isAvailable: data.isAvailable, isFavorite: data.isFavorite });

    const openArticle = () => onClick?.(data);

    return (
        <Flex {...props} className={classes.root} onClick={openArticle}>
            <Group sx={{ flex: 1 }}>
                <ThemeIcon variant="outline" className={classes.wrapperDocumentIcon}>
                    {data.isAvailable ? <FileText width={24} height={24} /> : <Lock width={24} height={24} />}
                </ThemeIcon>
                <Flex direction="column" gap={2}>
                    <Title order={4} color="dark">
                        {data.name}
                    </Title>
                    <Text className={classes.categoryName}>{data.category?.name}</Text>
                </Flex>
            </Group>
            <Flex gap={8} onClick={(event) => event.stopPropagation()}>
                {actionSlot}
            </Flex>
        </Flex>
    );
});

export default MemoizedCard;
