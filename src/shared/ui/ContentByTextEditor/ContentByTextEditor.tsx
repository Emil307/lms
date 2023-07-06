import { Text, TextProps } from "@mantine/core";
import useStyles from "./ContentByTextEditor.styles";

export interface ContentByTextEditorProps extends TextProps {
    data?: string;
}

const ContentByTextEditor = ({ data = "", ...props }: ContentByTextEditorProps) => {
    const { classes } = useStyles();
    return <Text className={classes.root} dangerouslySetInnerHTML={{ __html: data }} {...props} />;
};

export default ContentByTextEditor;
