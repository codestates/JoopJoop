import React, { useEffect, useState } from "react";
import NullChat from "../components/null_chat";
import { connect } from "react-redux";
import io from "socket.io-client";
import Chat from "../chatcomponents/Chat";
import ChatRoom from "../chatcomponents/ChatRoom";

const socket = io.connect("/");

const mapStateToProps = (state) => {
  return {
    loginNickname: state.loginNickname,
    isGuest: state.isGuest,
    gatherings: state.gatherings,
    userId: state.userId,
  };
};

const Chatpage = ({ loginNickname, isGuest, gatherings, userId }) => {
  const [rooms, setRooms] = useState([]); // room list
  const [join, setJoin] = useState(null); // 내가 join한 room
  const [isLoading, setIsLoading] = useState(false);

  // TODO : 현재 채팅방 내에서 나가기 버튼이 있는데 Gathering 탈퇴 시 DB에서 처리할지 고려
  // const onLeaveRoom = () => {
  //   socket.emit("leave-room", join, () => setJoin(null));
  // };

  // TODO : schedule.jsx와 동일한 함수를 사용하기 때문에 리팩토링 필요(api>service)
  const getRoomList = (gatherings) => {
    let filteredGatherings = gatherings;

    const filter = (gatherings) => {
      gatherings = gatherings.filter(
        (gathering) =>
          !!gathering.title &&
          !!gathering.town &&
          !!gathering.place &&
          !!gathering.date &&
          !!gathering.time &&
          !!gathering.longitude &&
          !!gathering.latitude &&
          !!gathering.author,
      );
      gatherings = gatherings.filter((gathering) => {
        if (!!gathering.participants) {
          let idArr = [];
          const filtered = gathering.participants.map((user) => {
            return user._id;
          });
          idArr = [...filtered];
          return idArr.includes(userId) || gathering.author._id === userId;
        } else {
          return null;
        }
      });

      gatherings.sort(function (a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a - b;
      });
      return gatherings;
    };

    filteredGatherings = filter(gatherings);

    return filteredGatherings;
  };

  const filteredRooms = getRoomList(gatherings);

  const onJoin = (roomName) => {
    socket.emit("join-room", roomName, () => setJoin(roomName));
    //! 채팅방 클릭시 state의 room 변경(어떤 방에 입장했는지)
    setRooms(roomName);
  };

  //! CreateRoom 성공시 함수 => Gathering 생성시 실행해야 할지 고려
  const onSuccessLogin = () => {
    socket.emit("login", () => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    //! socket login 후 isLoading false (isLoading false 위치는 다시 고려)
    socket.emit("nickname", loginNickname, onSuccessLogin);

    socket.on("connect", () => {
      // socket.on("remove-room", (roomName) => {
      //   setRooms((prev) => prev.filter((item) => item !== roomName));
      // });
    });
  }, []);

  return (
    <div id="프레임" className="flex flex-row items-start">
      {isLoading ? (
        <div>
          <NullChat></NullChat>
        </div>
      ) : (
        <div className="flex flex-row items-start">
          <div
            id="참여중인 채팅목록"
            className="flex flex-col items-center px-6 py-12"
          >
            <div id="frame47" className="flex flex-col items-center gap-5 pb-3">
              <div
                id="list"
                className="flex flex-row items-center justify-center gap-5 pb-1 border-b-[1px] border-grey-80"
              >
                <div className="flex items-center font-normal text-xl">ㅁ</div>
                <div className="flex items-center font-normal text-xl">
                  참여중인 채팅 목록
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              {filteredRooms.map((room, index) => (
                <ChatRoom key={index} room={room} onJoin={onJoin} />
              ))}
            </div>
          </div>
          <div>
            <Chat room={join} socket={socket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Chatpage);