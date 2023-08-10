import { Avatar, Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { AdminSupportConversationFromList } from "@entities/support";
import AvatarIcon from "@public/icons/avatar.svg";
import { getFullName } from "@shared/utils";
import useStyles from "./SearchItemComponent.styles";

export interface SearchItemComponentProps extends Omit<FlexProps, "onClick"> {
    data: AdminSupportConversationFromList;
    isSelected: boolean;
    onClick?: (item: AdminSupportConversationFromList, newSearchValue: string) => void;
}

const SearchItemComponent = ({ data, isSelected, onClick = () => undefined }: SearchItemComponentProps) => {
    const { classes } = useStyles({ isSelected });

    const fio = getFullName({ data: data.profile });

    const handleClick = () => onClick(data, fio);

    return (
        <Flex className={classes.root} onClick={handleClick}>
            <Avatar src={data.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                    <AvatarIcon />
                </ThemeIcon>
            </Avatar>
            {fio}
        </Flex>
    );
};

export default SearchItemComponent;
