export type TRegisterRequest = {
    so_dien_thoai: string;
    password: string;
    ho_ten: string;
    dia_chi: string;
};

export type TRegisterReturn = {
    data: {
        message: string;
        success: boolean;
    };
};

export type TLoginRequest = {
    so_dien_thoai: string;
    password: string;
};

export type TLoginReturn = {
    message: string;
    success: boolean;
    data: {
        access_token: string;
        token_type: string;
        refresh_token: string;
        expires_at: string;
    };
};
