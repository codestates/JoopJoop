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
    <div className="flex flex-col">
      <div className="flex text-2xl font-semibold justify-center p-4">
        {room} 채팅방
      </div>
      <div className="w-[1000px] h-[500px] overflow-x-hidden scroll-smooth snap-end">
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
      <form
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
        <input
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          className="w-full border-2"
          placeholder="여기에 채팅을 입력해주세요"
        />
      </form>
    </div>
  );
};

export default connect(mapStateToProps)(Chat);