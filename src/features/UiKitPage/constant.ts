import { MRT_ColumnDef } from "mantine-react-table";
import { TUser } from "./types";

export const columns: MRT_ColumnDef<TUser>['columns'] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'ФИО',
        accessorKey: 'fio',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Статус',
        accessorKey: 'status',
    }
]

export const users: TUser[] = [{
    email: '2312',
    fio: '23123',
    id: 1,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 2,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 3,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 4,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 5,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 6,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 7,
    role: '23e123',
    status: '23123'
}, {
    email: '2312',
    fio: '23123',
    id: 8,
    role: '23e123',
    status: '23123'
},]