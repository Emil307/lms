import { useEffect, useState } from "react";
import { TPagination } from "@shared/types";

export const useCurrentPaginationData = (pagination?: TPagination) => {
    const [paginationData, setPaginationData] = useState<TPagination>();

    //Изменяем отображение данных о пагинации только после успешного запроса на сервер
    useEffect(() => {
        if (pagination?.totalPages !== undefined) {
            setPaginationData(pagination);
        }
    }, [pagination]);

    return paginationData;
};
