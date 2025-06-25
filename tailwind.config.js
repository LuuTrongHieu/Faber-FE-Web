/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss/plugin");

module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            xs: "360px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1366px",
            "3xl": "1440px",
            "4xl": "1600px",
            "5xl": "1920px",
            phone: "360px",
            "phone-2": "640px",
            tablet: "768px",
            "tablet-2": "1024px",
            "tablet-3": "1180px",
            "tablet-sm": "960px",
            desktop: "1280px",
            "desktop-2": "1366px",
            "desktop-3": "1440px",
            "desktop-4": "1600px",
            "desktop-5": "1920px",
        },
        extend: {
            keyframes: {
                toastIn: {
                    "0%, 100%": { transform: "translateX(200%)", opacity: 0 },
                    "10%, 90%": { transform: "translateX(0)", opacity: 1 },
                },
                sliderNext: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                sliderPrev: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            fontFamily: {
                primary: [
                    "Outfit",
                    '"Open Sans"',
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
                input: [
                    "Outfit",
                    '"Open Sans"',
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            fontSize: {
                "8xl": "6rem",
                "9xl": "7rem",
                "10xl": "8rem",
            },
            colors: {
                primary: "#060616",
                secondary: "#1E212C",
                "sidebar-dark": "#30324F",
                "sidebar-light": "#FAFAFA",
                "header-dark": "#191919",
                "header-light": "#191919",
                footer: "#222222",
                "modal-backdrop": "#000000",
                "modal-light": "#f8f8f8",
                "modal-dark": "#222222",
                icon: "#ffffff",
                "icon-dark": "#333333",
                "icon-disabled": "#777777",
                main: "#D72E33",
                "secondary-1": "#ECAF53",
                "secondary-2": "#27AE60",
                "secondary-3": "#00A0F2",
                "secondary-4": "#F8F8F8",

                "gray-1": "#4F4F4F",
                "gray-2": "#828282",
                "gray-3": "#BDBDBD",
                "gray-4": "#E0E0E0",
                "gray-5": "#F6F6F6",
                "gray-f5": "#F5F5F5",
                "gray-b7": "#B7BAD3",
                "gray-d9": "#D9D9D9",
                "gray-f1": "#F1F1F1",
                "gray-eb": "#EBEBEB",
                "gray-dm": "#B7B9BA",
                "gray-6": "#898989",
                "white-w10": "#EBECF5",
                "dark-01": "#403D38",
                "blue-1": "#46B4F2",
            },
            spacing: {
                "header-lg": "80px",
                header: "60px",
                branding: "48px",
                "branding-sm": "32px",
                footer: "60px",
                "icon-xs": "12px",
                "icon-sm": "18px",
                icon: "24px",
                "icon-lg": "36px",
                "icon-xl": "45px",
                "icon-2xl": "50px",
                sidebar: "315px",
                modal: "480px",
                "login-form": "368px",
                "contain-header": "calc(100vh - 60px)",
                "contain-header-padding": "calc(100vh - 195px)",
                "character-container-w": "275px",
                "character-container-h": "327px",
                "character-square": "263px",
                "character-card-w": "263px",
                "character-card-h": "315px",
                "character-enhance-image-h": "122px",
                "character-enhance-image-h-2": "200px",
                "equipment-card-w": "263px",
                "equipment-card-h": "315px",
                "equipment-select-h": "288px",
                "card-panel-h": "358px",
                "gift-box-card-w": "263px",
                "gift-box-card-h": "288px",
                "sub-card-w": "124px",
                "sub-card-h": "155px",
                "item-thumbnail-h": "246px",
            },
            inputSize: {
                xs: "10px",
                sm: "16px",
            },
            boxShadow: {
                "character-slot": "0px 0px 40px rgba(0,0,0,0.1)",
            },
            backgroundImage: {
                Roadmap: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/about/Roadmap.png)`,
                characterMB: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/enjoyandearn/character-bg-mb.svg)`,
                Character: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/about/bg-character.png)`,
                Character1: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/enjoyandearn/Character-1.svg)`,
                EquipmentMobile: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/enjoyandearn/EquipmentMobile.png)`,
                Equipment: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/about/bg-equipment.png)`,
                TokenFlow: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/token/token-flow.png)`,
                FlowChart: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/token/Flow-chart.png)`,
                FlowChartMB: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/images/token/Flow-chart-sm.png)`,
            },
        },
        zIndex: {
            0: 0,
            5: 5,
            10: 10,
            15: 15,
            20: 20,
            25: 25,
            30: 30,
            35: 35,
            40: 40,
            45: 45,
            50: 50,
            55: 55,
            70: 70,
            100: 100,
            auto: "auto",
        },
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@tailwindcss/line-clamp"),
        plugin(({ addComponents, addUtilities }) => {
            addComponents({
                ".input-normal": {
                    border: "2px solid",
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: 400,
                    "&:focus": {
                        // borderColor: "#000000",
                        // color: "#000000",
                    },
                    "&:disabled": {
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#F1F1F1",
                    },
                    "&&::placeholder": {
                        // color: "rgba(0, 0, 0, 0.3)"
                    },
                },

                ".input-border": {
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "rgba(23, 23, 23, 0.2)",
                    "&:hover": {
                        borderColor: "rgba(23, 23, 23, 0.3)",
                    },
                    "&:focus": {
                        borderColor: "rgba(23, 23, 23, 0.5)",
                    },
                    "&:disabled": {
                        borderColor: "rgba(23, 23, 23, 0.2)",
                    },
                },

                ".input-error": {
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#d72e33 !important",
                },
                ".input-sm": {
                    height: "40px",
                    borderRadius: "12px",
                    padding: "0 12px",
                    fontSize: "16px",
                },
                ".input-md": {
                    height: "48px",
                    borderRadius: "12px",
                    padding: "0 16px",
                    fontSize: "16px",
                },
                ".input-lg": {
                    height: "3rem",
                    borderRadius: "0.5rem",
                    padding: "0 1rem",
                    fontSize: "1.125rem",
                },
                ".btn-sm": {
                    height: "40px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    padding: "12px",
                },
                ".btn-md": {
                    height: "40px",
                    padding: "12px 10px",
                    borderRadius: "10px",
                    fontSize: "14px",
                },
                ".btn-lg": {
                    height: "48px",
                    borderRadius: "12px",
                    fontSize: "16px",
                },

                ".btn": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transitionProperty:
                        "color, background-color, border-color, text-decoration-color, fill, stroke",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDuration: "150ms",
                },

                ".contained-primary": {
                    backgroundColor: "#D72E33",
                    color: "white",
                    border: "none",
                    "&:hover": {
                        backgroundColor: "#d72e33",
                    },
                    "&:active": {
                        backgroundColor: "#D72E33",
                    },
                    "&:disabled": {
                        color: "#555555",
                        backgroundColor: "#E6E6E6",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                },

                ".contained-secondary": {
                    backgroundColor: "#F9E0E1",
                    color: "#D72E33",
                    "&:hover": {
                        color: "#d72e33",
                        background: "#FFBFC2",
                    },
                    "&:active": {
                        backgroundColor: "#F9E0E1",
                        color: "#D72E33",
                    },
                    "&:disabled": {
                        color: "#555555",
                        backgroundColor: "#E6E6E6",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                },

                ".contained-third": {
                    backgroundColor: "#00A0F2",
                    color: "white",
                    "&:hover": {
                        background: "#008BD2",
                    },
                    "&:active": {
                        backgroundColor: "#00A0F2",
                    },
                    "&:disabled": {
                        color: "#555555",
                        backgroundColor: "#E6E6E6",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                },

                ".contained-gray": {
                    backgroundColor: "#E6E6E6",
                    color: "#55555580",
                    "&:hover": {
                        backgroundColor: "#D5D5D5",
                    },
                    "&:active": {
                        backgroundColor: "#E6E6E6",
                    },
                    "&:disabled": {
                        color: "#F6F6F6",
                        backgroundColor: "rgba(23, 23, 23, 0.15)",
                        cursor: "not-allowed",
                    },
                },

                ".contained-default": {
                    backgroundColor: "#fff",
                    color: "#555555",
                    border: "2px solid rgba(0, 0, 0, 0.2)",
                },

                ".outlined-primary": {
                    borderColor: "#D72E33",
                    backgroundColor: "transparent",
                    color: "#D72E33",
                    border: "2px solid",
                    "& svg": {
                        fill: "#DC413A",
                    },

                    "&:hover": {
                        backgroundColor: "#D72E33",
                        color: "white",
                        "& svg": {
                            fill: "white",
                        },
                    },
                    "&:active": {
                        borderColor: "#D72E33",
                        backgroundColor: "transparent",
                        color: "#D72E33",
                        "& svg": {
                            fill: "#DC413A",
                        },
                    },
                    "&:disabled": {
                        color: "#555555",
                        borderColor: "#E6E6E6",
                        backgroundColor: "#E6E6E6",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                },
                ".outlined-white": {
                    borderColor: "#FFFFFF",
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    border: "2px solid",

                    "&:hover": {
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        borderColor: "#FFFFFF",
                    },
                    "&:active": {
                        borderColor: "#FFFFFF",
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                    },
                    "&:disabled": {
                        color: "#555555",
                        borderColor: "#E6E6E6",
                        backgroundColor: "#E6E6E6",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                },
                ".outlined-gray": {
                    border: "2px solid",
                    borderColor: "rgba(0, 0, 0, 0.2)",
                    backgroundColor: "transparent",
                    color: "#555555",
                    "&:hover": {
                        borderColor: "#555555",
                    },
                    "&:active": {
                        borderColor: "rgba(0, 0, 0, 0.2)",
                        backgroundColor: "transparent",
                    },
                    "&:disabled": {
                        color: "#555555",
                        borderColor: "#E6E6E6",
                        backgroundColor: "#E6E6E6",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                },
                ".btn-text-primary": {
                    color: "#DC413A",
                    padding: "0",
                    "&:hover": {
                        color: "rgba(220, 65, 58, 0.7)",
                    },
                    "&:active": {
                        color: "#DC413A",
                    },
                    "&:disabled": {
                        color: "#EDA09C",
                        cursor: "not-allowed",
                    },
                },
                ".btn-primary": {
                    color: "#FFFFFF",
                    backgroundColor: "#E42D25",
                    "&:hover": {
                        backgroundColor: "#E36761",
                    },
                    "&:active": {
                        backgroundColor: "#DC413A",
                    },
                    "&:disabled": {
                        backgroundColor: "rgba(23, 23, 23, 0.15)",
                        cursor: "not-allowed",
                    },
                },
                ".btn-text-gray": {
                    color: "rgba(23, 23, 23, 0.3)",
                    padding: "0",
                    "&:hover": {},
                    "&:active": {
                        color: "rgba(23, 23, 23, 0.3)",
                    },
                    "&:disabled": {
                        color: "rgba(23, 23, 23, 0.15)",
                        cursor: "not-allowed",
                    },
                },

                ".stroke-primary-btn": {
                    "& svg": {
                        stroke: "white",
                    },
                    "&:disabled": {
                        "& svg": {
                            stroke: "#555555",
                        },
                    },
                },
                ".stroke-secondary-btn": {
                    "& svg": {
                        stroke: "#D72E33",
                    },
                    "&:disabled": {
                        "& svg": {
                            stroke: "#555555 !important",
                        },
                    },
                },
                ".fill-primary-btn": {
                    "& svg": {
                        fill: "white",
                    },
                    "&:disabled": {
                        "& svg": {
                            fill: "#555555",
                        },
                    },
                },

                ".fill-secondary-btn": {
                    "& svg": {
                        fill: "#D72E33",
                    },
                    "&:disabled": {
                        "& svg": {
                            fill: "#555555 !important",
                        },
                    },
                },

                //text
                ".text-h1": {
                    fontSize: "48px",
                    lineHeight: "60px",
                },
                ".text-h2": {
                    fontSize: "36px",
                    lineHeight: "46px",
                },
                ".text-h3": {
                    fontSize: "30px",
                    lineHeight: "40px",
                },
                ".text-h4": {
                    fontSize: "25px",
                    lineHeight: "35px",
                },
                ".text-h5": {
                    fontSize: "22px",
                    lineHeight: "35px",
                },
                ".text-h6": {
                    fontSize: "20px",
                    lineHeight: "30px",
                },
                ".text-h7": {
                    fontSize: "18px",
                    lineHeight: "25px",
                },
                ".text-h8": {
                    fontSize: "16px",
                    lineHeight: "22px",
                },
                ".text-h9": {
                    fontSize: "14px",
                    lineHeight: "18px",
                },
                ".text-h10": {
                    fontSize: "12px",
                    lineHeight: "16px",
                },

                ".text-caption-0": {
                    fontSize: "18px",
                    lineHeight: "18px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                },
                ".text-caption-1": {
                    fontSize: "16px",
                    lineHeight: "18px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                },
                ".text-caption-2": {
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                },
                ".text-caption-3": {
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                },
                ".text-caption-4": {
                    fontSize: "10px",
                    lineHeight: "14px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                },
                ".min-h-contain-header": {
                    minHeight: "calc(100vh - 60px)",
                },
                ".min-h-contain-2header": {
                    minHeight: "calc(100vh - 120px)",
                },

                ".input-date": {
                    display: "flex",
                    justifyContent: "center",
                    "&::-webkit-date-and-time-value": {
                        margin: "0",
                    },
                    "&::-webkit-calendar-picker-indicator": {
                        cursor: "pointer",
                    },
                },

                ".small-select": {
                    borderColor: "rgb(23 23 23 / 0.2)",
                    "> div:first-child": {
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        // color: "rgb(23 23 23 / 0.5)",
                        marginRight: "16px",
                    },
                    "> div:nth-child(2)": {
                        // opacity: 0.5,
                        right: "6px",
                    },

                    svg: {
                        opacity: 0.5,
                    },

                    ".options": {
                        "> div": {
                            padding: "4px 6px",
                        },
                    },
                },

                ".btn-transfer": {
                    background: "linear-gradient(225deg, #D72E33 0%, #A31A1E 100%)",
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
                },
                ".rarity-legendary": {
                    background:
                        "linear-gradient(90deg, #FF4444 18.41%, #FF7E76 55.23%, #FFF177 80.34%)",
                },
                ".red-circle-about": {
                    background: "linear-gradient(180deg, #EE312F 0%, #960F0D 100%);",
                    border: "1px solid #FF5050",
                    boxShadow: "-20px 0px 50px #EE312F",
                    borderRadius: "50%",
                },
                ".red-circle-about-mb": {
                    background: "linear-gradient(180deg, #EE312F 0%, #960F0D 100%)",
                    border: "1px solid #FF5050",
                    boxShadow: "0px -10px 50px #EE312F",
                    borderRadius: "50%",
                },
                ".red-big-circle-about-mb": {
                    background: "linear-gradient(180deg, #EE312F 0%, #960F0D 100%)",
                    border: "1px solid #FF5050",
                    boxShadow: "0px -20px 50px #EE312F",
                    borderRadius: "50%",
                },
                ".yellow-circle-about": {
                    background: "linear-gradient(180deg, #D6FFCC 0%, #95FF7B 100%)",
                    border: "1px solid #FDFF83",
                    boxShadow: "0px 0px 100px #3F0100",
                    borderRadius: "50%",
                },
                ".about-btn": {
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                    backgroundColor: "#000",
                },
                ".red-circle-token": {
                    background: "linear-gradient(180deg, #FF5D39 0%, #B30200 100%)",
                    border: "1px solid #E82F2D",
                    boxShadow: "0px 0px 100px #3F0100",
                    borderRadius: "999px",
                },
                ".justify-normal": {
                    justifyContent: "normal",
                },
            });
            addUtilities({
                ".bg-wavy": {
                    backgroundColor: "#f7ede6",
                    backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
                    backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
                    backgroundImage:
                        "linear-gradient(#f74545 2px, transparent 2px), linear-gradient(90deg, #f74545 2px, transparent 2px), linear-gradient(#f74545 1px, transparent 1px), linear-gradient(90deg, #f74545 1px, #f7ede6 1px)",
                },
                ".animate-pause": {
                    "animation-play-state": "paused",
                },
                ".prevent-scroll-outside": {
                    overscrollBehaviorY: "contain",
                    overflowY: "auto",
                },
                ".scrollbar-none": {
                    "scrollbar-width": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".scrollbar-thin": {
                    "scrollbar-width": "thin",
                    "&::-webkit-scrollbar": {
                        width: "5px",
                        height: "8px",
                        background: "rgba(255,255,255,0.02)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#D9D9D9",
                    },
                },
                ".swiper-dark-pagination": {
                    ".swiper-pagination-bullet-active": {
                        backgroundColor: "#FFFFFFB2 !important",
                    },
                    ".swiper-pagination-bullet:not(.swiper-pagination-bullet-active)": {
                        backgroundColor: "#FFFFFF4D !important",
                    },
                },
                ".scrollbar-thin-rounded": {
                    "scrollbar-width": "thin",
                    "&::-webkit-scrollbar": {
                        width: "6px",
                        height: "8px",
                        background: "rgba(255,255,255,0.02)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#D9D9D9",
                        borderRadius: "999px",
                    },
                },
                ".scrollbar-thin-rounded-dark": {
                    "&::-webkit-scrollbar-thumb": {
                        background: "##FFFFFF4D",
                    },
                },
            });
        }),
    ],
};
