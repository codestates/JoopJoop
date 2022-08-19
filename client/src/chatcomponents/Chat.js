import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    loginNickname: state.loginNickname,
  };
};

const Chat = ({ room, socket, userId, loginNickname }) => {
  const [chat, setChat] = useState("");
  const [list, setList] = useState([]); // 채팅 텍스트 list

  useEffect(() => {
    axios
      .get(
        (process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL) + "/chat",
        {
          withCredentials: true,
        },
      )
      .then((data) => {
        const filteredData = data.data.filter((chat) => {
          return chat.connected_gathering === room;
        });
        console.log(filteredData);
        setList([...filteredData]);
      });
  }, [room]);

  useEffect(() => {
    socket.on("message", (userId, loginNickname, chat) => {
      setList((prev) => prev.concat(
        { 
          author: {nickname: loginNickname, _id: userId},
          message: chat }
        ));
    });
  }, [socket]);

  return (
    <div id="Frame11" className="flex flex-col items-start">
      <div id="TopBar" className="flex flex-row items-start gap-2 py-2 px-4">
        <div id="Other User" className="flex felx-row items-center gap-4 py-2">
          <div id="Avatar" className="bg-red w-10 h-10 rounded-full"></div>
          <div id="Texts" className="text-xl font-semibold">{room}에 오신걸 환영합니다!</div>
        </div>
      </div>

      <div id="Frame48" className="flex flex-col justify-end items-center py-5 gap-10">
        <div id="list_message" className="flex flex-col items-center w-[1024px] h-[500px] overflow-x-hidden scroll-smooth snap-end">
          {list.map((item, index) => (
            <div 
              key={index}
              className="rounded-md m-4 py-1 px-4 w-full"
            >
              {item.author.nickname}
              <br/>
              {item.message}
            </div>
          ))}
        </div>

        <div id="BigInputBar" className="flex flex-row justify-center items-end pr-36 pl-32">
          <form
            id="InputBar"
            onSubmit={(e) => {
              e.preventDefault();
              socket.emit("message", userId, chat, room, loginNickname, () => {
                setList((prev) => prev.concat(        
                  { 
                    author: { nickname: loginNickname, _id: userId},
                    message: chat 
                  }
                  ));
                setChat("");
              });
              // socket.emit("message", userId, nickname, profileImg, chat, room, () => {
              //   setList((prev) => prev.concat({ me: true, text: chat }));
              //   setChat("");
              // });
            }}
          >
            <div className="flex flex-row border-2">
            <input
              id="Message"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              className="w-[500px] font-normal text-[16px] text-grey-70"
              placeholder="여기에 채팅을 입력해주세요"
            />
            <img className="w-[80px]" alt="전송Img"></img>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Chat);