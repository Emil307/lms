import { ReactNode, forwardRef } from "react";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { PremadeControlProps } from "@mantine/tiptap/lib/controls/Control/Control";
import { TableOperationType } from "./types";

interface CreateControlProps {
    label: string;
    icon: ReactNode;
    isActive?: { name: string; attributes?: Record<string, any> | string };
    operation: TableOperationType;
}

export function createControl({ label, isActive, operation, icon }: CreateControlProps) {
    // eslint-disable-next-line react/display-name
    return forwardRef<HTMLButtonElement, PremadeControlProps>((props, ref) => {
        const { editor } = useRichTextEditorContext();

        const handleClick = () => {
            switch (operation) {
                case TableOperationType.INSERT_TABLE:
                    return editor?.chain().focus().insertTable().run();
                case TableOperationType.DELETE_TABLE:
                    return editor?.chain().focus().deleteTable().run();
                case TableOperationType.ADD_COLUMN_AFTER:
                    return editor?.chain().focus().addColumnAfter().run();
                case TableOperationType.ADD_COLUMN_BEFORE:
                    return editor?.chain().focus().addColumnBefore().run();
                case TableOperationType.DELETE_COLUMN:
                    return editor?.chain().focus().deleteColumn().run();
                case TableOperationType.ADD_ROW_AFTER:
                    return editor?.chain().focus().addRowAfter().run();
                case TableOperationType.ADD_ROW_BEFORE:
                    return editor?.chain().focus().addRowBefore().run();
                case TableOperationType.DELETE_ROW:
                    return editor?.chain().focus().deleteRow().run();
                case TableOperationType.MERGE_CELLS:
                    return editor?.chain().focus().mergeCells().run();
                case TableOperationType.SPLIT_CELL:
                    return editor?.chain().focus().splitCell().run();
                case TableOperationType.TOGGLE_HEADER_ROW:
                    return editor?.chain().focus().toggleHeaderRow().run();
                case TableOperationType.TOGGLE_HEADER_COLUMN:
                    return editor?.chain().focus().toggleHeaderColumn().run();
            }
        };

        const isDisabled = () => {
            switch (operation) {
                case TableOperationType.INSERT_TABLE:
                    return false;
                case TableOperationType.DELETE_TABLE:
                    return !editor?.can().deleteTable();
                case TableOperationType.ADD_COLUMN_AFTER:
                    return !editor?.can().addColumnAfter();
                case TableOperationType.ADD_COLUMN_BEFORE:
                    return !editor?.can().addColumnBefore();
                case TableOperationType.DELETE_COLUMN:
                    return !editor?.can().deleteColumn();
                case TableOperationType.ADD_ROW_AFTER:
                    return !editor?.can().addRowAfter();
                case TableOperationType.ADD_ROW_BEFORE:
                    return !editor?.can().addRowBefore();
                case TableOperationType.DELETE_ROW:
                    return !editor?.can().deleteRow();
                case TableOperationType.MERGE_CELLS:
                    return !editor?.can().mergeCells();
                case TableOperationType.SPLIT_CELL:
                    return !editor?.can().splitCell();
                case TableOperationType.TOGGLE_HEADER_ROW:
                    return !editor?.can().toggleHeaderRow();
                case TableOperationType.TOGGLE_HEADER_COLUMN:
                    return !editor?.can().toggleHeaderColumn();
            }
        };

        return (
            <RichTextEditor.Control
                aria-label={label}
                title={label}
                active={isActive?.name ? editor?.isActive(isActive.name, isActive.attributes) : false}
                ref={ref}
                onClick={handleClick}
                disabled={isDisabled()}
                {...props}>
                {icon}
            </RichTextEditor.Control>
        );
    });
}
