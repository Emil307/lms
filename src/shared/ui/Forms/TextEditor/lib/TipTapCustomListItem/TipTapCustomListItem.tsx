import { Node, mergeAttributes } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

export // Создаем кастомный элемент списка, который может содержать заголовки.
const CustomListItem = Node.create({
    name: "customListItem",

    content: "block*",
    defining: true,

    parseHTML() {
        return [{ tag: "li" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ["div", 0]];
    },

    addNodeView() {
        return ({ node }) => {
            const li = document.createElement("li");
            const contentDiv = document.createElement("div");

            node.content.forEach((childNode) => {
                if (childNode.type.name !== "bulletList" && childNode.type.name !== "orderedList") {
                    const domNode = document.createElement(childNode.type.name);
                    domNode.innerHTML = childNode.textContent;
                    contentDiv.appendChild(domNode);
                }
            });

            li.appendChild(contentDiv);

            return {
                dom: li,
                contentDOM: contentDiv,
            };
        };
    },

    addKeyboardShortcuts() {
        return {
            Enter: () => {
                const { state, view } = this.editor;
                const { $from } = state.selection;

                // Проверяем, что родительский узел является элементом списка (listItem)
                if ($from.parent.type.name !== "listItem") {
                    return false;
                }

                // Создаем новый параграф <p>
                const paragraphNode = state.schema.nodes.paragraph.create();
                const tr = state.tr.insert($from.pos + 1, paragraphNode);

                // Перемещаем каретку внутрь нового параграфа
                const resolvedPos = tr.doc.resolve($from.pos + 2);
                const newSelection = TextSelection.create(tr.doc, resolvedPos.pos, resolvedPos.pos);

                view.dispatch(tr.setSelection(newSelection).scrollIntoView());

                return true;
            },
        };
    },
});
