export type TRegisterRequest = {
    so_dien_thoai: string;
    password: string;
    ho_ten: string;
    dia_chi: string;
};

export type TLoginRequest = {
    so_dien_thoai: string;
    password: string;
};

export type TLoginReturn = {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_at: string;
};

export interface IRefreshTokenRequest {
    token: string;
}

export interface IRefreshTokenResponse {
    access_token: string;
    token_type: string;
}
