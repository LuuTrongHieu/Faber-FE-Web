export type TRegisterRequest = {
    email: string;
    password: string;
    passwordConfirmation: string;
};

export type TRegisterReturn = {
    data: {
        message: string;
        success: boolean;
    };
};

export type TLoginRequest = {
    email: string;
    password: string;
};

export type TLoginReturn = {
    message: string;
    success: boolean;
    data: {
        accessToken: string;
        refreshToken: string;
    };
};
