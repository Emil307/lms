import { Flex, FlexProps, Text } from "@mantine/core";
import { GetArticleResponse } from "@entities/article";
import { AttachedFiles, Footer } from "./components";
import useStyles from "./ContentPanel.styles";

export interface ContentPanelProps extends Omit<FlexProps, "children"> {
    data: GetArticleResponse;
}

const ContentPanel = ({ data, ...props }: ContentPanelProps) => {
    const { classes } = useStyles();

    return (
        <Flex {...props} direction="column" className={classes.root}>
            <Text
                sx={(theme) => ({
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],
                    p: {
                        margin: 0,
                    },
                })}
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <AttachedFiles data={data} />
            <Footer data={data} />
        </Flex>
    );
};

export default ContentPanel;
