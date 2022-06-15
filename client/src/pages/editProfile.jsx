import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { XIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import action from "../redux/action";
import axios from "axios";
import ModalConfirmSignOut from "../modals/modalConfirmSignOut";
import { useHistory } from "react-router-dom";

const localURL = "http://localhost:5000";

const mapStateToProps = (state) => {
  return {
    userEmail: state.loginEmail,
    userNickname: state.loginNickname,
    userId: state.userId,
    token: state.accessToken,
    profileImg: state.profileImg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
}) => {
  const history = useHistory();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [img, setImg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    const { nickname, password, profileImg } = data;
    console.log(data);
    axios
      .put(
        `${localURL}/users/${userId}`,
        {
          nickname: nickname,
          password: password,
          profileImg: profileImg,
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
      });
  };

  const onDeleteAccount = () => {
    axios
      .delete(
        `${localURL}/users/${userId}`,

        {
          headers: { "Content-Type": "application/json", token: token },
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("계정이 삭제 되었습니다.");
        history.push("/");
      });
  };

  const onLoadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  };
  console.log(img);

  const handleClick = async (e) => {
    const formData = new FormData();
    formData.append("profile_img", img);

    const config = {
      Hedaers: {
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      `http://localhost:5000/upload`,
      formData,
      config
    );
    console.log(res.data.image);
    setProfileImg(`http://localhost:5000/` + res.data.image);
    console.log(profileImg);
  };

  function previewFile() {
    const preview = document.getElementById("preview");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

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
    <div className="flex items-center w-80% h-auto">
      <button
        className="absolute left-[65%] top-[20%]"
        onClick={switchEditMode}
      >
        <XIcon className="h-5 w-5" />
      </button>
      {/* <img className="w-40 h-40 rounded-full " src="img/favicon.png" alt="" /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <img className="w-40 h-40 rounded-full" id="preview"></img>
          <input
            type="file"
            id="image"
            accept="img/*"
            onChange={(e) => {
              onLoadFile(e);
              previewFile();
            }}
          />
          <button
            className="bg-green-100 w-32 text-white rounded-full"
            onClick={handleClick}
          >
            저장하기
          </button>
        </div>
        <div className="flex flex-col">
          <label>이메일</label>
          <p
            name="email"
            type="email"
            className="w-72 h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
          >
            {userEmail}
          </p>
          <label>닉네임</label>
          <input
            name="nickname"
            placeholder={userNickname}
            className="w-72 h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            {...register("nickname", { required: true, maxLength: 10 })}
          />
          {errors.nickname && errors.nickname.type === "maxLength" && (
            <p className="text-xs text-red">최대 10글자 입니다.</p>
          )}
          <input
            name="password"
            type="password"
            className="w-72 h-10   bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
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
            className="w-72 h-10   bg-white text-center rounded-3xl mb-3 outline md:outline-2 placeholder:text-grey-70"
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
              <p className="text-xs text-red">비밀번호가 일치하지 않습니다.</p>
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
