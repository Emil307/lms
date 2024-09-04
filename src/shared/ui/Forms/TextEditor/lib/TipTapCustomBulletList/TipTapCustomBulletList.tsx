import { BulletList } from "@tiptap/extension-bullet-list";

export const CustomBulletList = BulletList.extend({
    addOptions() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ...this.parent?.(), // Копируем все опции из базового BulletList
            HTMLAttributes: {},
            itemTypeName: "customListItem", // Переопределяем itemTypeName
        };
    },
    // Отключаем вложенные списки
    content: "customListItem+",
});
