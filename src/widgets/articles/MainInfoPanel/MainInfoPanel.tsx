import { Flex, FlexProps, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { FileText } from "react-feather";
import { GetFavoriteArticleResponse } from "@entities/article";
import { Pagination, TagList } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    articleData: GetFavoriteArticleResponse;
}

const MainInfoPanel = ({ articleData: { data, meta }, ...props }: MainInfoPanelProps) => {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            <Group w="100%">
                <Flex align="center" gap={16} sx={{ flex: 1 }}>
                    <ThemeIcon variant="outline" className={classes.wrapperDocumentIcon}>
                        <FileText width={26} height={26} />
                    </ThemeIcon>
                    <Flex direction="column" gap={4}>
                        <Title order={1} color="dark">
                            {data.name}
                        </Title>
                        <Text className={classes.categoryName}>{data.category?.name}</Text>
                    </Flex>
                </Flex>
                <Flex gap={8}>
                    {/* //TODO: как беки поправят схемы */}
                    {/* <Rating data={data} /> */}
                    {/* <FavoriteButton data={data} /> */}
                </Flex>
            </Group>
            <TagList data={data.tags} />
            <Pagination meta={meta} />
        </Flex>
    );
};

export default MainInfoPanel;
