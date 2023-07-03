import { Flex, FlexProps } from "@mantine/core";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { Article, ArticleFromList, UserRating, useUpdateArticleRating } from "@entities/article";
import { ReactionButton } from "./components";

export interface RatingProps extends FlexProps {
    data: Article | ArticleFromList;
}

const Rating = ({ data, ...props }: RatingProps) => {
    const updateRating = useUpdateArticleRating(String(data.id));

    const handleUpdateReaction = (updatedStatus: UserRating | null) => {
        updateRating.mutate(updatedStatus);
    };

    return (
        <Flex {...props} gap={8}>
            <ReactionButton
                leftIcon={<ThumbsUp />}
                variant="like"
                userRating={data.userRating}
                onClick={handleUpdateReaction}
                disabled={!data.isAvailable}>
                {data.likesCount}
            </ReactionButton>
            <ReactionButton
                leftIcon={<ThumbsDown />}
                variant="dislike"
                userRating={data.userRating}
                onClick={handleUpdateReaction}
                disabled={!data.isAvailable}>
                {data.dislikesCount}
            </ReactionButton>
        </Flex>
    );
};

export default Rating;
