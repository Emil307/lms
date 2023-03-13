module.exports = {
    types: [
        { value: "feat", name: "Работа над бизнес-задачей. Требуется указание номера задачи " },
        { value: "fix", name: "Исправления багов. Желательно указание номера задачи (если есть)" },
        { value: "docs", name: "Изменения документации / storybook / указание TS-DOC" },
        {
            value: "style",
            name: "Работа со стилями. Адаптивная вёрстка и т.п.",
        },
        {
            value: "refactor",
            name: "Изменения кода без изменения бизнес логики.",
        },
        {
            value: "perf",
            name: "Улучшение производительности",
        },
        { value: "test", name: "Cypress / Jest тесты." },
        {
            value: "chore",
            name: "Настройка библиотек / Релизы / CI и т.п.",
        },
        { value: "revert", name: "Отмена изменений в существующем коммите. Требуется указание отменяемого коммита" },
        { value: "WIP", name: "Промежуточный коммит" },
    ],
    messages: {
        type: "Тип изменения:",
        scope: "\nКакую часть приложения затрагивая (опционально):",
        // used if allowCustomScopes is true
        customScope: "Определить свою часть приложения:",
        subject: "Заголовок коммита:\n",
        body: 'Тело коммита (опционально). Используйте "|" чтобы перейти на новую строчку:\n',
        breaking: "List any BREAKING CHANGES (optional):\n",
        footer: "Задачи над которой ведется работа? (опционально) Формат => BG-XXXXX \n",
        confirmCommit: "Продолжить с коммитом выше?",
    },
    scopes: [{ name: "Общее" }],
    allowCustomScopes: true,
    skipEmptyScopes: true,
    ticketNumberPrefix: "BG-",
    ticketNumberRegExp: "\\d{1,5}",
    typePrefix: "[",
    typeSuffix: "]",
    skipQuestions: ["breaking"],
    subjectLimit: 100,
};
