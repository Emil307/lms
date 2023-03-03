import { Montserrat, Manrope } from "next/font/google";
import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
export const FuturaFont = localFont({
    src: [
        { path: "fonts/FuturaPT/FuturaPT-Bold.woff", style: "normal", weight: "bold" },
        { path: "fonts/FuturaPT/FuturaPT-Book.woff", style: "normal", weight: "normal" },
    ],
});
export const CentroSansPro = localFont({
    src: [{ path: "fonts/FuturaPT/PFCentroSansPro-Regular.woff", style: "normal", weight: "normal" }],
});

export const MontserratFont = Montserrat({ subsets: ["latin"] });
export const ManropeFont = Manrope({ subsets: ["latin"], weight: "600" });
