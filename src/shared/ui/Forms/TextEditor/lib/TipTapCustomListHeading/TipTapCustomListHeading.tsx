import { Node, mergeAttributes } from "@tiptap/core";

export const ListHeading = Node.create({
    name: "listHeading",

    group: "block",
    content: "inline*",

    defining: true,

    parseHTML() {
        return [{ tag: "h1" }, { tag: "h2" }, { tag: "h3" }, { tag: "h4" }];
    },

    renderHTML({ node, HTMLAttributes }) {
        const tag = node.attrs.level === 1 ? "h1" : node.attrs.level === 2 ? "h2" : node.attrs.level === 3 ? "h3" : "h4";
        return [tag, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    addAttributes() {
        return {
            level: {
                default: 1,
            },
        };
    },
});
