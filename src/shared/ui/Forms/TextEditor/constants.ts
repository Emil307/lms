import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Link } from "@mantine/tiptap";
import { storageApi } from "@entities/storage";
import { TipTapCustomImage } from "./lib";

export const extensions = [
    StarterKit,
    Underline,
    Link,
    Superscript,
    SubScript,
    Highlight,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TipTapCustomImage(async (file) => {
        const result = await storageApi.uploadImage({ file });
        return result.absolutePath;
    }),
];
