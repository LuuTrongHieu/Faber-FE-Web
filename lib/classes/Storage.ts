// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KEYS = ["token", "theme"] as const;
export type TLocalStorageKey = (typeof KEYS)[number];
export const LOCAL_STORAGE_KEYS: {
    [key in TLocalStorageKey]: string;
} = {
    token: "token",
    theme: "theme",
};
