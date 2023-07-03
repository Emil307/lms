import { ListProps, FavoriteListProps, MyListProps } from "../ui";

export type TListExtensions = {
    Main: ListProps;
    Favorite: FavoriteListProps;
    My: MyListProps;
};

export type TListType = ListProps | FavoriteListProps | MyListProps;
