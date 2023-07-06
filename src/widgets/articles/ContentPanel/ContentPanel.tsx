import { Flex, FlexProps } from "@mantine/core";
import { Article } from "@entities/article";
import { ContentByTextEditor } from "@shared/ui";
import { MaterialFiles, Footer } from "./components";
import useStyles from "./ContentPanel.styles";

export interface ContentPanelProps extends Omit<FlexProps, "children"> {
    data: Article;
}

const ContentPanel = ({ data, ...props }: ContentPanelProps) => {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            <ContentByTextEditor data={data.content} />
            <MaterialFiles data={data} />
            <Footer data={data} />
        </Flex>
    );
};

export default ContentPanel;
