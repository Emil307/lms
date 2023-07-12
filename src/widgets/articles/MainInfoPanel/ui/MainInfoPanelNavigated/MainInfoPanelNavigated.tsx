import { Flex, FlexProps, Group, Text, ThemeIcon } from "@mantine/core";
import { FileText } from "react-feather";
import { ArticleWithMeta } from "@entities/article";
import { FavoriteButton, Rating } from "@features/articles";
import { Heading } from "@shared/ui";
import { Pagination, TagList } from "./components";
import useStyles from "./MainInfoPanelNavigated.styles";

export interface MainInfoPanelNavigatedProps extends Omit<FlexProps, "children"> {
    articleData: ArticleWithMeta;
}

const MainInfoPanelNavigated = ({ articleData: { data, meta }, ...props }: MainInfoPanelNavigatedProps) => {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            <Group w="100%">
                <Flex align="center" gap={16} sx={{ flex: 1 }}>
                    <ThemeIcon variant="outline" className={classes.wrapperDocumentIcon}>
                        <FileText width={26} height={26} />
                    </ThemeIcon>
                    <Flex direction="column" gap={4}>
                        <Heading>{data.name}</Heading>
                        <Text className={classes.categoryName}>{data.category?.name}</Text>
                    </Flex>
                </Flex>
                <Flex gap={8}>
                    <Rating data={data} />
                    <FavoriteButton data={data} />
                </Flex>
            </Group>
            <TagList data={data.tags} />
            <Pagination meta={meta} />
        </Flex>
    );
};

export default MainInfoPanelNavigated;
