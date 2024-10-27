'use client';
import { EMAIL } from '@/libs/constants/regex';
import React from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Button } from './ui';
import http from '@/libs/configs/http';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


type Inputs = {
    username: string
    password: string
}

const LoginForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        control,
        setFocus,
        formState: { errors },
    } = useForm<Inputs>();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {

        http.post(`/auth/login`, { ...formData })
            .then((res) => {
                console.log({ res })

                //call api server
                fetch('/api/auth', {
                    method: 'POST',
                    body: JSON.stringify(res),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log('res\'s server', res);
                        toast.success('success');
                    })
                    .catch((err) => {
                        console.log('err\'s server', err);
                        toast.error('Fail');
                    })

                //set context user

                //redirect or reload (if we have a middleware)
                router.push("/home");
            })
            .catch((err) => {
                console.log({ err })
                toast.error(err?.response?.data?.msg);
            });
    };

    return (
        <React.Fragment>
            <ToastContainer />
            <div className='form__wrapper'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{
                            required: "Email không được bỏ trống",
                            // validate: validateEmail,
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <div className={`modal__form ${errors.username && "error"}`}>
                                    {/* <label htmlFor="">Email</label> */}
                                    <input
                                        type="text"
                                        placeholder="username@example.com"
                                        {...register("username")}
                                    // className={`${errors.email ? "error" : ""}`}
                                    />
                                </div>
                            );
                        }}
                    />

                    {errors.username && (
                        <p className="error__sub-text">{errors.username.message}</p>
                    )}

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Password không được bỏ trống",
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <div className={`modal__form ${errors.username && "error"}`}>
                                    {/* <label htmlFor="">Password</label> */}
                                    <input type="password" {...register("password")} />
                                </div>
                            );
                        }}
                    />

                    {errors.password && (
                        <p className="error__sub-text">
                            {errors.password.message}
                        </p>
                    )}

                    <p className='form__forgot'>Forgot password?</p>

                    <div className="btn__wrapper">
                        <Button
                            primary
                            text='Login'
                            type={"submit"}
                            onlyLoading
                            timer={2000}
                            callback={() => handleSubmit(onSubmit)}
                            showNotice={() => { }}
                        />
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default LoginForm