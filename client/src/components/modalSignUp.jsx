import React, { useRef } from "react";
import { useForm } from "react-hook-form";
// import "../style.css";

const ModalSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch("password");
  const onSubmit = (data) => console.log("data", data);
  // axios.post('/', data)

  return (
    <div className="w-500 h-647 flex flex-col justify-center items-center">
      <div className="relative left-48">
        <button>X</button>
      </div>
      <div className="p-10">
        <img className="" src="/img/LOGO.jpg"></img>
      </div>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <input
          className='"w-80 h-12 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70'
          placeholder="Email"
          name="email"
          type="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red">This email field is required</p>
        )}

        <input
          className="w-80 h-12 bg-white text-center rounded-3xl mt-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="name"
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <p className="text-xs text-red">This email field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p className="text-xs text-red">Your input exceed maximum Length</p>
        )}

        <input
          className="w-80 h-12 bg-white text-center rounded-3xl mt-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="password"
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p className="text-xs text-red">This field is required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="text-xs text-red">
            Password must have at least 6 characters
          </p>
        )}

        <input
          className="w-80 h-12 bg-white text-center rounded-3xl mt-3 outline md:outline-2 placeholder:text-grey-70 "
          placeholder="password Confirm"
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p className="text-xs text-red">This field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p className="text-xs text-red">The passwords do not match</p>
          )}

        <input
          className="w-80 h-12 bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="nickname"
          name="nickname"
          {...register("nickname", { required: true, minLength: 4 })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <p className="text-xs text-red">This field is required</p>
        )}
        {errors.nickname && errors.nickname.type === "minLength" && (
          <p className="text-xs text-red">
            Nickname must have at least 4 characters
          </p>
        )}
        <div className="flex justify-center">
          <input
            className="w-36 h-12 bg-green-80 text-center rounded-3xl outline md:outline-2 text-white  cursor-pointer"
            type="submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default ModalSignUp;
