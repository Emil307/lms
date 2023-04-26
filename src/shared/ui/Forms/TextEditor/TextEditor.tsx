import React, { ReactNode, memo } from "react";
import { RichTextEditor, RichTextEditorProps } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { Box, Flex, Group, Text, ThemeIcon } from "@mantine/core";
import { z } from "zod";
import { extensions } from "./constants";
import useStyles from "./TextEditor.styles";

export interface TextEditorProps extends Omit<RichTextEditorProps, "editor" | "children"> {
    value?: string;
    setValue?: (value: string) => void;
    error?: ReactNode;
    description?: string;
    success?: string | boolean;
}

const MemoizedTextEditor = memo(function TextEditor({
    value,
    error,
    description,
    success,
    setValue = () => undefined,
    ...props
}: TextEditorProps) {
    const statusSuccess = !!value && !error && !!success;
    const { classes } = useStyles({ isError: !!error, statusSuccess });

    const editor = useEditor({
        extensions,
        parseOptions: { preserveWhitespace: "full" },
        content: value,
        onUpdate(props) {
            setValue(props.editor.getHTML());
        },
    });

    const renderError = error && (
        <Group className={classes.error}>
            <ThemeIcon variant="outline" color="warning" className={classes.wrapperIcon}>
                <AlertTriangle />
            </ThemeIcon>
            <Text className={classes.helperText}>{error}</Text>
        </Group>
    );

    const renderDescription = () => {
        if (!description && !(success && statusSuccess)) {
            return;
        }

        return (
            <Flex direction="column">
                {statusSuccess && !z.boolean().safeParse(success).success && (
                    <Flex className={classes.description}>
                        <ThemeIcon variant="outline" color="done" className={classes.wrapperIcon}>
                            <CheckCircle />
                        </ThemeIcon>
                        <Text className={classes.helperText}>{success}</Text>
                    </Flex>
                )}
                {description && (
                    <Flex className={classes.description}>
                        <ThemeIcon variant="outline" color="primaryHover" className={classes.wrapperIcon}>
                            <Info />
                        </ThemeIcon>
                        <Text className={classes.helperText}>{description}</Text>
                    </Flex>
                )}
            </Flex>
        );
    };

    return (
        <Box>
            <RichTextEditor {...props} classNames={classes} editor={editor}>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
            {renderError}
            {renderDescription()}
        </Box>
    );
});

export default MemoizedTextEditor;