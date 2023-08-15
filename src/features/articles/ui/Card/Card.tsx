import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { ReactNode, memo } from "react";
import { FileText, Lock } from "react-feather";
import { ArticleFromList } from "@entities/article";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<FlexProps, "onClick"> {
    data: ArticleFromList;
    actionSlot?: ReactNode;
    onClick?: (article: ArticleFromList) => void;
}

const MemoizedCard = memo(function Card({ data, actionSlot, onClick, ...props }: CardProps) {
    const { classes, cx } = useStyles({ isAvailable: data.isAvailable });

    const openArticle = () => onClick?.(data);

    return (
        <Flex {...props} className={cx(classes.root, props.className)} onClick={openArticle}>
            <Flex className={classes.contentContainer}>
                <ThemeIcon className={classes.wrapperDocumentIcon}>
                    {data.isAvailable ? <FileText width={24} height={24} /> : <Lock width={24} height={24} />}
                </ThemeIcon>
                <Flex direction="column" gap={2}>
                    <Heading order={4}>{data.name}</Heading>
                    <Paragraph variant="text-caption">{data.category?.name}</Paragraph>
                </Flex>
            </Flex>
            <Flex gap={8} onClick={(event) => event.stopPropagation()}>
                {actionSlot}
            </Flex>
        </Flex>
    );
});

export default MemoizedCard;
