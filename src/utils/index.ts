import {IHasFio} from "./types";

export function getFio(source: IHasFio) {
    return `${source.lastname} ${source.lastname} ${source.patronymic}`;
}
