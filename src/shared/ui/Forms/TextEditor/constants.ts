import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Link } from "@mantine/tiptap";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { storageApi } from "@entities/storage";
import { TipTapCustomImage } from "./lib";

export const extensions = [
    StarterKit,
    Underline,
    Link.extend({
        inclusive: false,
    }),
    Superscript,
    SubScript,
    Highlight,
    Table.configure({
        resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TipTapCustomImage(async (file) => {
        const result = await storageApi.uploadImage({ file });
        return result.absolutePath;
    }),
];
