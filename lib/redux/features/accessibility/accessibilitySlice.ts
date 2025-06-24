import { LOCAL_STORAGE_KEYS } from "@/lib/classes/Storage";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

const THEMES = ["dark", "light"] as const;
export type TTheme = (typeof THEMES)[number];
export function isTheme(type: string): type is TTheme {
    return THEMES.includes(type as TTheme);
}

export type TAccessibilityState = {
    bMenuOn: boolean;
    bSidebarOn: boolean;
    bMobileSidebarOn: boolean;
    bLanguagePanelOn: boolean;
    theme?: TTheme;
    sanction?: boolean;
};

const initialState: TAccessibilityState = {
    bMenuOn: false,
    bSidebarOn: true,
    bMobileSidebarOn: false,
    bLanguagePanelOn: false,
};

const _toggleMenu: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bMenuOn = action.payload ?? !state.bMenuOn;
};

const _toggleSidebar: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bSidebarOn = action.payload ?? !state.bSidebarOn;
};

const _toggleMobileSidebar: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bMobileSidebarOn = action.payload ?? !state.bMobileSidebarOn;
};

const _toggleLanguagePanel: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bLanguagePanelOn = action.payload ?? !state.bLanguagePanelOn;
};

const _turnOffAllMenu: CaseReducer<TAccessibilityState> = (state) => {
    state.bLanguagePanelOn = false;
    state.bMenuOn = false;
    // state.bSidebarOn = false;
};

const _toggleTheme: CaseReducer<TAccessibilityState> = (state) => {
    const theme = state.theme !== "dark" ? "dark" : "light";
    state.theme = theme;
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.theme, theme);
};

const _toggleSanction: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    const sanction = action.payload ?? !state.sanction;
    state.sanction = sanction;
};

const _setTheme: CaseReducer<TAccessibilityState, PayloadAction<TTheme>> = (state, action) => {
    const theme = action.payload;
    state.theme = theme;
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.theme, theme);
};

const accessibilitySlice = createSlice({
    name: "accessibility",
    initialState,
    reducers: {
        setTheme: _setTheme,
        toggleMenu: _toggleMenu,
        toggleSidebar: _toggleSidebar,
        toggleMobileSidebar: _toggleMobileSidebar,
        toggleLanguagePanel: _toggleLanguagePanel,
        turnOffAllMenu: _turnOffAllMenu,
        toggleTheme: _toggleTheme,
        toggleSanction: _toggleSanction,
    },
});

export const accessibilityActions = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
