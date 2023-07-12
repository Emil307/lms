import { Flex, FlexProps, Group, Text, ThemeIcon } from "@mantine/core";
import { FileText } from "react-feather";
import { Article } from "@entities/article";
import { FavoriteButton, Rating } from "@features/articles";
import { Heading } from "@shared/ui";
import { TagList } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    articleData: Article;
}

const MainInfoPanel = ({ articleData, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            <Group w="100%">
                <Flex align="center" gap={16} sx={{ flex: 1 }}>
                    <ThemeIcon variant="outline" className={classes.wrapperDocumentIcon}>
                        <FileText width={26} height={26} />
                    </ThemeIcon>
                    <Flex direction="column" gap={4}>
                        <Heading>{articleData.name}</Heading>
                        <Text className={classes.categoryName}>{articleData.category?.name}</Text>
                    </Flex>
                </Flex>
                <Flex gap={8}>
                    <Rating data={articleData} />
                    <FavoriteButton data={articleData} />
                </Flex>
            </Group>
            <TagList data={articleData.tags} />
        </Flex>
    );
};

export default MainInfoPanel;
