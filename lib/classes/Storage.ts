// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KEYS = ["accessToken", "refreshToken", "remember", "refreshTokenExpiredAt", "theme"] as const;
export type TLocalStorageKey = (typeof KEYS)[number];
export const LOCAL_STORAGE_KEYS: {
    [key in TLocalStorageKey]: string;
} = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    remember: "remember",
    refreshTokenExpiredAt: "refreshTokenExpiredAt",
    theme: "theme",
};
