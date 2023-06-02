import { Flex, FlexProps, ThemeIcon, Text } from "@mantine/core";
import { memo } from "react";
import { FileText } from "react-feather";
import { ArticleFromList } from "@entities/article";
import useStyles from "./ArticleItem.styles";

export interface ArticleItemProps extends FlexProps {
    data: ArticleFromList;
}

const MemoizedArticleItem = memo(function ArticleItem({ data, ...props }: ArticleItemProps) {
    const { classes } = useStyles();
    return (
        <Flex {...props} className={classes.root}>
            <ThemeIcon variant="outline" color="secondary" className={classes.wrapperDocumentIcon}>
                <FileText width={16} height={16} />
            </ThemeIcon>
            <Text className={classes.articleName}>{data.name}</Text>
        </Flex>
    );
});

export default MemoizedArticleItem;
