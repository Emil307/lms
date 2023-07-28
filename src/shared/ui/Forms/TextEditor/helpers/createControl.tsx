import { ReactNode, forwardRef } from "react";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { PremadeControlProps } from "@mantine/tiptap/lib/controls/Control/Control";
import { OperationType } from "./types";
import { selectImage } from "./selectImage";
import { useUploadFile } from "@entities/storage";

interface CreateControlProps {
    label: string;
    icon: ReactNode;
    isActive?: { name: string; attributes?: Record<string, any> | string };
    operation: OperationType;
}

export function createControl({ label, isActive, operation, icon }: CreateControlProps) {
    // eslint-disable-next-line react/display-name
    return forwardRef<HTMLButtonElement, PremadeControlProps>((props, ref) => {
        const { editor } = useRichTextEditorContext();
        const { mutate: uploadFile } = useUploadFile();

        const handleClick = () => {
            switch (operation) {
                case OperationType.INSERT_IMAGE:
                    selectImage().then((image) => {
                        uploadFile(
                            { file: image, type: "image" },
                            {
                                onSuccess: (response) => {
                                    editor?.chain().focus().setImage({ src: response.absolutePath }).run();
                                },
                            }
                        );
                    });
                    return;
                case OperationType.INSERT_TABLE:
                    return editor?.chain().focus().insertTable().run();
                case OperationType.DELETE_TABLE:
                    return editor?.chain().focus().deleteTable().run();
                case OperationType.ADD_COLUMN_AFTER:
                    return editor?.chain().focus().addColumnAfter().run();
                case OperationType.ADD_COLUMN_BEFORE:
                    return editor?.chain().focus().addColumnBefore().run();
                case OperationType.DELETE_COLUMN:
                    return editor?.chain().focus().deleteColumn().run();
                case OperationType.ADD_ROW_AFTER:
                    return editor?.chain().focus().addRowAfter().run();
                case OperationType.ADD_ROW_BEFORE:
                    return editor?.chain().focus().addRowBefore().run();
                case OperationType.DELETE_ROW:
                    return editor?.chain().focus().deleteRow().run();
                case OperationType.MERGE_CELLS:
                    return editor?.chain().focus().mergeCells().run();
                case OperationType.SPLIT_CELL:
                    return editor?.chain().focus().splitCell().run();
                case OperationType.TOGGLE_HEADER_ROW:
                    return editor?.chain().focus().toggleHeaderRow().run();
                case OperationType.TOGGLE_HEADER_COLUMN:
                    return editor?.chain().focus().toggleHeaderColumn().run();
            }
        };

        const isDisabled = () => {
            switch (operation) {
                case OperationType.INSERT_TABLE:
                    return false;
                case OperationType.DELETE_TABLE:
                    return !editor?.can().deleteTable();
                case OperationType.ADD_COLUMN_AFTER:
                    return !editor?.can().addColumnAfter();
                case OperationType.ADD_COLUMN_BEFORE:
                    return !editor?.can().addColumnBefore();
                case OperationType.DELETE_COLUMN:
                    return !editor?.can().deleteColumn();
                case OperationType.ADD_ROW_AFTER:
                    return !editor?.can().addRowAfter();
                case OperationType.ADD_ROW_BEFORE:
                    return !editor?.can().addRowBefore();
                case OperationType.DELETE_ROW:
                    return !editor?.can().deleteRow();
                case OperationType.MERGE_CELLS:
                    return !editor?.can().mergeCells();
                case OperationType.SPLIT_CELL:
                    return !editor?.can().splitCell();
                case OperationType.TOGGLE_HEADER_ROW:
                    return !editor?.can().toggleHeaderRow();
                case OperationType.TOGGLE_HEADER_COLUMN:
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
