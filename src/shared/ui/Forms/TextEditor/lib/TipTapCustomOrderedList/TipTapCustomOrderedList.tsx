import { OrderedList } from "@tiptap/extension-ordered-list";

export const CustomOrderedList = OrderedList.extend({
    addOptions() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ...this.parent?.(), // Копируем все опции из базового BulletList
            HTMLAttributes: {},
            itemTypeName: "customListItem",
        };
    },
    content: "customListItem+",
});
