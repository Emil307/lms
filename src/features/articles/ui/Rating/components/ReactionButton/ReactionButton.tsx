import { Button, ButtonProps } from "@shared/ui";
import { UserRating } from "@entities/article";
import useStyles from "./ReactionButton.styles";

export interface ReactionButtonProps extends Omit<ButtonProps, "variant" | "onClick"> {
    userRating: UserRating | null;
    variant: "like" | "dislike";
    onClick: (updatedStatus: UserRating | null) => void;
}

const ReactionButton = ({ userRating, variant, onClick, ...props }: ReactionButtonProps) => {
    const { classes } = useStyles({ isActive: userRating === variant });

    const handleUpdateReaction = () => {
        const updatedStatus = userRating !== variant ? variant : null;
        onClick(updatedStatus);
    };

    return <Button {...props} className={classes.reactionButton} variant="text" onClick={handleUpdateReaction} />;
};

export default ReactionButton;
