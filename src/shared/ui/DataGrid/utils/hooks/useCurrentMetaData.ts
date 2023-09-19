import { useEffect, useState } from "react";

export const useCurrentMetaData = <M extends Record<string, any>>(meta?: M) => {
    const [metaData, setMetaData] = useState<M>();

    //Изменяем отображение данных о meta только после успешного запроса на сервер
    useEffect(() => {
        if (meta) {
            setMetaData(meta);
        }
    }, [meta]);

    return metaData;
};
