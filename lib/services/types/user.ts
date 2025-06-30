export type TGender = "male" | "female";

export type TStatusOfUserRegistration = "PENDING" | "ACCEPTED";

export interface IGetCurrentUserInfoReturn {
    id: number;
    ho_ten: string;
    dia_chi: string;
    so_dien_thoai: string;
    admin: boolean;
    status: TStatusOfUserRegistration;
    date_of_birth: string;
    gender: TGender;
    diem_thuong: number;
}
