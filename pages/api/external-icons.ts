import * as FeatherIcons from "react-feather";
import { TPagination } from "@shared/types";
import { GetExternalIconsResponse } from "@entities/externalIcon";
import type { NextApiRequest, NextApiResponse } from "next";

export const getIconNames = () => {
    const featherIconNames = Object.keys(FeatherIcons).map((iconName) => ({
        id: iconName,
        name: iconName,
    }));

    return featherIconNames;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<GetExternalIconsResponse>) {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 25;

    const startIndex = (page - 1) * perPage;

    const data = getIconNames();

    const slicedData = data.slice(startIndex, startIndex + perPage);

    const pagination: TPagination = {
        count: slicedData.length,
        currentPage: page,
        links: {},
        perPage: perPage,
        total: data.length,
        totalPages: Math.ceil(data.length / perPage),
    };

    res.status(200).json({ data: slicedData, pagination });
}
