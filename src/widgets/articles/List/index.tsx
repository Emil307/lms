import { List as MainList, FavoriteList, MyList } from "./ui";

import { TListExtensions, TListType } from "./types";

type TListProps = {
    type: TListType;
};

export const List = ({ type }: TListProps & TListExtensions) => {
    return { type };
};

List.Main = MainList;
List.Favorite = FavoriteList;
List.My = MyList;
