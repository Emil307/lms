// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
    name: string;
    date: Date;
    datetime: string;
    time: string;
    role: Roles;
};

enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPERADMIN = "ADMIN",
    HERO = "HERO",
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({
        name: "Test",
        date: new Date(),
        datetime: new Date().toISOString(),
        time: "22:09",
        role: Roles.ADMIN,
    });
}
