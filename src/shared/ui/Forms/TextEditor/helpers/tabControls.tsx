import {
    IconColumnInsertLeft,
    IconColumnInsertRight,
    IconRowInsertBottom,
    IconRowInsertTop,
    IconTableMinus,
    IconTablePlus,
} from "@tabler/icons-react";
import DeleteRowIcon from "@public/icons/deleteRow.svg";
import DeleteColumnIcon from "@public/icons/deleteColumn.svg";
import MergeCellsIcon from "@public/icons/mergeCells.svg";
import SplitCellIcon from "@public/icons/splitCell.svg";
import HeaderHorizontalIcon from "@public/icons/headerHorizontal.svg";
import HeaderVerticalIcon from "@public/icons/headerVertical.svg";
import { createControl } from "./createControl";
import { TableOperationType } from "./types";
import { ControlIcon } from "../components/ControlIcon";

export const TableControls = {
    InsertTable: createControl({
        label: "Добавить таблицу",
        icon: <ControlIcon variant="iconFromPackage" icon={<IconTablePlus width={14} height={14} />} />,
        isActive: { name: "insertTable" },
        operation: TableOperationType.INSERT_TABLE,
    }),
    DeleteTable: createControl({
        label: "Удалить таблицу",
        icon: <ControlIcon variant="iconFromPackage" icon={<IconTableMinus width={14} height={14} />} />,
        isActive: { name: "deleteTable" },
        operation: TableOperationType.DELETE_TABLE,
    }),
    AddColumnBefore: createControl({
        label: "Добавить одну колонку до текущей",
        icon: <ControlIcon variant="iconFromPackage" icon={<IconColumnInsertRight width={14} height={14} />} />,
        isActive: { name: "addColumnBefore" },
        operation: TableOperationType.ADD_COLUMN_BEFORE,
    }),
    AddColumnAfter: createControl({
        label: "Добавить одну колонку после текущей",
        icon: <ControlIcon variant="iconFromPackage" icon={<IconColumnInsertLeft width={14} height={14} />} />,
        isActive: { name: "addColumnAfter" },
        operation: TableOperationType.ADD_COLUMN_AFTER,
    }),
    DeleteColumn: createControl({
        label: "Удалить колонку",
        icon: <ControlIcon variant="localIcon" icon={<DeleteColumnIcon />} />,
        isActive: { name: "deleteColumn" },
        operation: TableOperationType.DELETE_COLUMN,
    }),
    AddRowBefore: createControl({
        label: "Добавить одну строку до текущей",
        icon: <ControlIcon variant="iconFromPackage" icon={<IconRowInsertTop width={14} height={14} />} />,
        isActive: { name: "addRowBefore" },
        operation: TableOperationType.ADD_ROW_BEFORE,
    }),
    AddRowAfter: createControl({
        label: "Добавить одну строку после текущей",
        icon: <ControlIcon variant="iconFromPackage" icon={<IconRowInsertBottom width={14} height={14} />} />,
        isActive: { name: "addRowAfter" },
        operation: TableOperationType.ADD_ROW_AFTER,
    }),
    DeleteRow: createControl({
        label: "Удалить строку",
        icon: <ControlIcon variant="localIcon" icon={<DeleteRowIcon />} />,
        isActive: { name: "deleteRow" },
        operation: TableOperationType.DELETE_ROW,
    }),
    MergeCells: createControl({
        label: "Обновить ячейки",
        icon: <ControlIcon variant="localIcon" icon={<MergeCellsIcon />} />,
        isActive: { name: "mergeCells" },
        operation: TableOperationType.MERGE_CELLS,
    }),
    SplitCell: createControl({
        label: "Разбить ячейку",
        icon: <ControlIcon variant="localIcon" icon={<SplitCellIcon />} />,
        isActive: { name: "splitCell" },
        operation: TableOperationType.SPLIT_CELL,
    }),
    ToggleHeaderRow: createControl({
        label: "Выделение первой строки",
        icon: (
            <ControlIcon
                variant="localIcon"
                icon={<HeaderHorizontalIcon />}
                sx={(theme) => ({
                    svg: {
                        transform: "scale(0.9) !important",
                        path: {
                            fill: theme.colors.gray45[0],
                        },
                    },
                })}
            />
        ),
        isActive: { name: "toggleHeaderRow" },
        operation: TableOperationType.TOGGLE_HEADER_ROW,
    }),
    ToggleHeaderColumn: createControl({
        label: "Выделение первого столбца",
        icon: (
            <ControlIcon
                variant="localIcon"
                icon={<HeaderVerticalIcon />}
                sx={(theme) => ({
                    svg: {
                        transform: "scale(0.9) !important",
                        path: {
                            fill: theme.colors.gray45[0],
                        },
                    },
                })}
            />
        ),
        isActive: { name: "toggleHeaderColumn" },
        operation: TableOperationType.TOGGLE_HEADER_COLUMN,
    }),
};
