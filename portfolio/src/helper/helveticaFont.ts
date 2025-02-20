import localFont from "next/font/local";


export const helveticaFont = localFont({
  src: [
    {
      path: "../../public/media/fonts/HelveticaNeueLight.otf",
      weight: "100",
      style: "light",
    },
    {
      path: "../../public/media/fonts/HelveticaNeueUltraLight.otf",
      weight: "50",
      style: "ultralight",
    },
    {
      path: "../../public/media/fonts/HelveticaNeueThin.otf",
      weight: "300",
      style: "thin",
    },
    {
      path: "../../public/media/fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/media/fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/media/fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});
