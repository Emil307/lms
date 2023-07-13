import { Text, TextProps } from "@mantine/core";
import useStyles from "./ContentByTextEditor.styles";

export interface ContentByTextEditorProps extends TextProps {
    data?: string;
}

const ContentByTextEditor = ({ data = "", className, ...props }: ContentByTextEditorProps) => {
    const { classes, cx } = useStyles();
    return <Text className={cx(classes.root, className)} dangerouslySetInnerHTML={{ __html: data }} {...props} />;
};

export default ContentByTextEditor;
