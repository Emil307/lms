import React, { ReactNode, memo, useEffect } from "react";
import { RichTextEditor, RichTextEditorProps } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { Box, Flex, ThemeIcon } from "@mantine/core";
import { z } from "zod";
import { Paragraph } from "@shared/ui";
import { extensions } from "./constants";
import useStyles from "./TextEditor.styles";
import { TableControls } from "./helpers";

export interface TextEditorProps extends Omit<RichTextEditorProps, "editor" | "children"> {
    value?: string;
    setValue?: (value: string) => void;
    error?: ReactNode;
    description?: string;
    success?: string | boolean;
    readonly?: boolean;
}

const MemoizedTextEditor = memo(function TextEditor({
    value,
    error,
    description,
    success,
    readonly = false,
    setValue = () => undefined,
    ...props
}: TextEditorProps) {
    const statusSuccess = !!value && !error && !!success;
    const { classes } = useStyles({ isError: !!error, statusSuccess, readonly });

    const editor = useEditor({
        extensions,
        parseOptions: { preserveWhitespace: "full" },
        content: value,
        onUpdate(props) {
            setValue(props.editor.getHTML());
        },
    });

    // Это нужно чтобы сбрасывать значение редактора
    useEffect(() => {
        if (editor?.getHTML() !== value && value) {
            editor?.commands.setContent(value);
        }
    }, [value]);

    const renderError = error && (
        <Flex className={classes.error}>
            <ThemeIcon color="warning" className={classes.wrapperIcon}>
                <AlertTriangle />
            </ThemeIcon>
            <Paragraph variant="text-smaller" pt={2}>
                {error}
            </Paragraph>
            pt={2}
        </Flex>
    );

    const renderDescription = () => {
        if (!description && !(success && statusSuccess)) {
            return;
        }

        return (
            <Flex direction="column">
                {statusSuccess && !z.boolean().safeParse(success).success && (
                    <Flex className={classes.description}>
                        <ThemeIcon color="done" className={classes.wrapperIcon}>
                            <CheckCircle />
                        </ThemeIcon>
                        <Paragraph variant="text-smaller" pt={2}>
                            {success}
                        </Paragraph>
                    </Flex>
                )}
                {description && (
                    <Flex className={classes.description}>
                        <ThemeIcon color="primaryHover" className={classes.wrapperIcon}>
                            <Info />
                        </ThemeIcon>
                        <Paragraph variant="text-smaller" pt={2}>
                            {description}
                        </Paragraph>
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

                    <RichTextEditor.ControlsGroup>
                        <TableControls.InsertTable />
                        <TableControls.DeleteTable />
                        <TableControls.AddColumnBefore />
                        <TableControls.AddColumnAfter />
                        <TableControls.DeleteColumn />
                        <TableControls.AddRowBefore />
                        <TableControls.AddRowAfter />
                        <TableControls.DeleteRow />
                        <TableControls.MergeCells />
                        <TableControls.SplitCell />
                        <TableControls.ToggleHeaderRow />
                        <TableControls.ToggleHeaderColumn />
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
