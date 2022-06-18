import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { XIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import action, { setIsLogin } from "../redux/action";
import axios from "axios";
import ModalConfirmSignOut from "../modals/modalConfirmSignOut";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    userEmail: state.loginEmail,
    userNickname: state.loginNickname,
    userId: state.userId,
    token: state.accessToken,
    profileImg: state.profileImg,
    isOAuthLogin: state.isOAuthLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLogin: (boolean) => dispatch(action.setIsLogin(boolean)),
    setEmail: (email) => dispatch(action.setEmail(email)),
    setNickname: (nickname) => dispatch(action.setNickname(nickname)),
    setPassword: (password) => dispatch(action.setPassword(password)),
    setProfileImg: (profileImg) => dispatch(action.setProfileImg(profileImg)),
  };
};

const EditProfile = ({
  switchEditMode,
  userEmail,
  userNickname,
  setNickname,
  setPassword,
  setProfileImg,
  profileImg,
  userId,
  token,
  isOAuthLogin,
}) => {
  const history = useHistory();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [files, setFiles] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef();
  password.current = watch("password");

  const onDeleteAccount = () => {
    axios
      .delete(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL + "/users/" + userId,

        {
          headers: { "Content-Type": "application/json", token: token },
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("계정이 삭제 되었습니다.");
        setIsLogin(false);
        return history.push("/");
      })
      .catch((err) => err);
  };

  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setFiles(file);
  };

  const handleClick = (e) => {
    console.log(
      process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL + "/upload"
    );
    const formData = new FormData();
    formData.append("file", files);

    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL + "/upload",
        formData,
        config
      )
      .then((res) => {
        updateProfileImg(res.data.image);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    const { nickname, password } = data;

    axios
      .put(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL + /users/ + userId,
        {
          nickname: nickname,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json", token: token },
          withCredentials: true,
        }
      )
      .then((res) => {
        setNickname(nickname);
        setPassword(password);
        alert("변경 되었습니다!");
      })
      .catch((err) => err);
  };

  const updateProfileImg = (res) => {
    axios
      .put(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL + "/users/" + userId,
        { profileImg: res },
        {
          headers: { "Content-Type": "application/json", token: token },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.profileImg[0] !== "/") {
          res.data.profileImg = "/" + res.data.profileImg;
        }
        setProfileImg(
          process.env.REACT_APP_DEPLOYSERVER_URL ||
            process.env.REACT_APP_LOCALSERVER_URL + res.data.profileImg
        );
      })
      .catch((err) => err);
  };

  function previewFile() {
    var preview = document.getElementById("preview");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="flex flex-col md:flex-row mt-10 items-center w-100% h-auto ">
      <button
        className="absolute left-[75%] top-[20%]"
        onClick={switchEditMode}
      >
        <XIcon className="h-5 w-5" />
      </button>

      <div className="flex flex-col items-center ">
        <img className="w-40 h-40 rounded-full mr-3" id="preview"></img>
        <form>
          <label
            className="btn w-20 h-5 my-2 text-xs btn-grey"
            for="file-input"
          >
            사진 올리기
          </label>
          <input
            className="hidden"
            type="file"
            name="file"
            accept="img/*"
            id="file-input"
            onChange={(e) => {
              onLoadFile(e);
              previewFile();
            }}
          />
        </form>
        <button
          type="submit"
          className="bg-green-100 w-32 text-white rounded-full"
          onClick={handleClick}
        >
          저장하기
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="mb-">이메일</label>
          <p
            name="email"
            type="email"
            className="w-[340px] h-[46px] input-ring-green rounded-3xl text-center pt-2"
          >
            {userEmail}
          </p>
          <label className="my-2">닉네임</label>
          <input
            name="nickname"
            placeholder={userNickname}
            className="w-[340px] h-[46px] input-ring-green rounded-3xl text-center mb-2"
            {...register("nickname", { required: true, maxLength: 10 })}
          />
          {errors.nickname && errors.nickname.type === "maxLength" && (
            <p className="text-xs text-red">최대 10글자 입니다.</p>
          )}
          {isOAuthLogin ? null : (
            <>
              <label className="mb-2">비밀번호</label>
              <input
                name="password"
                type="password"
                className="w-[340px] h-[46px] input-ring-green rounded-3xl text-center mb-2"
                placeholder="비밀번호를 입력하세요."
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="text-xs text-red">
                  필수 입력 사항입니다. 비밀번호도 변경도 가능합니다.
                </p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="text-xs text-red">
                  비밀번호는 6글자 이상이어야 합니다.
                </p>
              )}
              <input
                name="passwordConfirm"
                type="password"
                className="w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
                placeholder="비밀번호를 다시 입력하세요."
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === "required" && (
                  <p className="text-xs text-red">필수 입력 사항입니다.</p>
                )}
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === "validate" && (
                  <p className="text-xs text-red">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
            </>
          )}
          <div className="flex">
            <input
              type="submit"
              className=" w-36 h-12 btn-green mx-3 my-3 text-center rounded-3xl  text-white"
              value="수정하기"
              onClick={() => {
                onSubmit();
              }}
            />
            <button
              type="button"
              className=" w-36 h-12 btn-red mx-3 my-3 text-center rounded-3xl  text-white"
              onClick={() => {
                setDeleteModalOpen(true);
              }}
            >
              계정 삭제하기
            </button>
          </div>
        </div>
      </form>
      <ModalConfirmSignOut
        modalOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        onDeleteAccount={() => onDeleteAccount()}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
