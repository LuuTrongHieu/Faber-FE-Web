"use client";
import { Button } from "@/components/bases/Button";
import { Input } from "@/components/bases/Input";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { TObject, TRule } from "@/lib/classes/Validator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/common";
import { useValidator } from "@/lib/hooks/useValidator";
import { authActions } from "@/lib/redux/features/auth/authSlice";
import authApi from "@/lib/services/endpoints/auth";
import classNames from "classnames";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import methods from "validator";

const rules: TRule[] = [
    {
        field: "phoneNumber",
        type: "requirePhoneNumber",
        method: methods.isEmpty,
        when: false,
        message: "Vui lòng nhập số điện thoại",
    },
    {
        field: "password",
        type: "requirePassword",
        method: methods.isEmpty,
        when: false,
        message: "Vui lòng nhập mật khẩu",
    },
];

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const router: AppRouterInstance = useRouter();
    const rfForm = useRef<HTMLFormElement>(null);
    const validator = useValidator(rules);
    const { token, bLogging, loginError } = useAppSelector((state) => state.auth);
    const [login] = authApi.useLoginMutation();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<TObject>({});
    const [showPassword, setShowPassword] = useState(false);

    const handleOnLogInBtnClicked = useCallback(async () => {
        validator.validate({
            phoneNumber: phoneNumber.trim(),
            password,
        });

        if (!validator.valid) {
            setErrors(validator.errors);
            return;
        }

        login({
            so_dien_thoai: phoneNumber.trim(),
            password: password,
        });
    }, [phoneNumber, password, validator, login]);

    const handleOnPhoneNumberErrorBtnClicked = useCallback(() => {
        const e = { ...errors };
        delete e["requirePhoneNumber"];
        delete e["phoneNumberNotMatch"];
        setErrors(e);
        setPhoneNumber("");
    }, [errors]);

    const handleOnPasswordErrorBtnClicked = useCallback(() => {
        const e = { ...errors };
        delete e["requirePassword"];
        delete e["passwordNotMatch"];
        setErrors(e);
        setPassword("");
    }, [errors]);

    const handleOnChangePhoneNumber: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleOnPhoneNumberErrorBtnClicked();
            setPhoneNumber(event.target.value);
        },
        [handleOnPhoneNumberErrorBtnClicked]
    );

    const handleOnChangePassword: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleOnPasswordErrorBtnClicked();
            setPassword(event.target.value);
        },
        [handleOnPasswordErrorBtnClicked]
    );

    const handleOnPasswordTypeBtnClicked = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    useEffect(() => {
        (async () => {
            if (token) router.replace("/");
        })();
    }, [token]);

    useEffect(() => {
        if (bLogging == "rejected" && loginError) {
            setErrors({
                phoneNumberNotMatch: loginError.so_dien_thoai || "",
                passwordNotMatch: loginError.password || "",
            });
        }
        return () => {
            setErrors({});
        };
    }, [bLogging, loginError]);

    useEffect(() => {
        dispatch(authActions.resetLoginErrors());
    }, [dispatch]);

    const renderPhoneNumberInput = useCallback(() => {
        return (
            <div className="flex flex-col">
                <div>
                    <label className="text-[14px] leading-[20px] text-[#171717]/70 font-bold">
                        Số điện thoại{" "}
                    </label>
                    <span className="text-[#DC413A] mb-5">*</span>
                </div>
                <div className="relative mt-1">
                    <Input
                        placeholder="Enter phone number"
                        className={classNames(
                            "input-md placeholder:text-[#171717]/30 w-full",
                            errors.requirePhoneNumber || errors.phoneNumberNotMatch
                                ? "input-error pr-10"
                                : "input-border"
                        )}
                        value={phoneNumber}
                        maxLength={20}
                        onChange={handleOnChangePhoneNumber}
                    />
                    {errors.phoneNumberNotMatch && (
                        <div
                            className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5"
                            onClick={handleOnPhoneNumberErrorBtnClicked}
                        >
                            <ErrorIcon />
                        </div>
                    )}
                </div>
                <label className="text-[12px] leading-[18px] text-[#E36761] mt-1 h-[18px]">
                    {errors.requirePhoneNumber || errors.phoneNumberNotMatch}
                </label>
            </div>
        );
    }, [
        errors.requirePhoneNumber,
        errors.phoneNumberNotMatch,
        handleOnChangePhoneNumber,
        handleOnPhoneNumberErrorBtnClicked,
        phoneNumber,
    ]);

    const renderPasswordInput = useCallback(() => {
        return (
            <div className="flex flex-col mt-5">
                <div>
                    <label className="text-[14px] leading-[20px] text-[#171717]/70 font-bold">
                        Mật khẩu{" "}
                    </label>
                    <span className="text-[#DC413A] mb-5">*</span>
                </div>
                <div className="relative mt-1">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className={classNames(
                            "input-md placeholder:text-[#171717]/30 w-full pr-10",
                            errors.requirePassword || errors.passwordNotMatch
                                ? "input-error pr-20"
                                : "input-border"
                        )}
                        value={password}
                        maxLength={100}
                        onChange={handleOnChangePassword}
                        onEnter={handleOnLogInBtnClicked}
                    />
                    {errors.passwordNotMatch && (
                        <div className="absolute top-1/2 right-11 -translate-y-1/2 w-8 h-5 pr-3 border-r border-[#171717]/20">
                            <div onClick={handleOnPasswordErrorBtnClicked}>
                                <ErrorIcon />
                            </div>
                        </div>
                    )}
                    {!showPassword ? (
                        <div
                            onClick={handleOnPasswordTypeBtnClicked}
                            className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 ml-3 opacity-50"
                        >
                            <CloseEyeIcon />
                        </div>
                    ) : (
                        <div
                            onClick={handleOnPasswordTypeBtnClicked}
                            className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-3 ml-3"
                        >
                            <EyeIcon />
                        </div>
                    )}
                </div>
                <label className="text-[12px] leading-[18px] text-[#E36761] mt-1 h-[18px]">
                    {errors.requirePassword || errors.passwordNotMatch}
                </label>
            </div>
        );
    }, [
        errors.passwordNotMatch,
        errors.requirePassword,
        handleOnChangePassword,
        handleOnLogInBtnClicked,
        handleOnPasswordErrorBtnClicked,
        handleOnPasswordTypeBtnClicked,
        password,
        showPassword,
    ]);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen p-5">
            <Head>
                <title>Login</title>
            </Head>
            <form
                ref={rfForm}
                className="flex flex-col w-[550px] max-w-[100%] rounded-[20px] bg-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.1)] py-[50px] px-[60px] mb-[2%]"
            >
                <div className="text-[28px] leading-[40px] font-bold mb-3 text-center">
                    Admin Faber
                </div>
                <div className="mt-5 mb-8">
                    {renderPhoneNumberInput()}
                    {renderPasswordInput()}
                </div>
                <div>
                    <Button
                        onClick={handleOnLogInBtnClicked}
                        type="button"
                        className="btn btn-primary btn-lg w-full font-bold leading-[22px]"
                    >
                        {bLogging === "pending" && (
                            <div className="w-icon-sm h-icon-sm grow-0 shrink-0 mr-4 last:mr-0">
                                <LoadingIcon className="fill-icon-dark animate-spin" />
                            </div>
                        )}
                        <span>Log in</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
