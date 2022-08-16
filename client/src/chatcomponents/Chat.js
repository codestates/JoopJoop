import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

const Chat = ({ room, socket, userId }) => {
  const [chat, setChat] = useState("");
  const [list, setList] = useState([]); // 채팅 텍스트 list

  // useEffect(() => {
  //   axios.get(
  //     (process.env.REACT_APP_DEPLOYSERVER_URL ||
  //       process.env.REACT_APP_LOCALSERVER_URL) + "/chat",
  //     {
  //       withCredentials: true,
  //     },
  //   )
  //   .then((data) => {

  //   })
  // })

  console.log(room);

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log(msg);
      setList((prev) => prev.concat({ me: false, text: msg }));
    });
  }, [socket]);

  return (
    <div className="flex flex-col">
      <div className="flex text-2xl font-semibold justify-center p-4">
        {room} 채팅방
      </div>
      <div className="w-[1000px] h-[500px]">
        {list.map((item, index) => (
          <div
            key={index}
            className={`${
              item.me ? "text-right bg-[#9FC044]" : "bg-[#DBDDD8]"
            } rounded-md m-4 py-1 px-4 w-full h-10`}
          >
            {item.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("message", userId, chat, room, () => {
            setList((prev) => prev.concat({ me: true, text: chat }));
            setChat("");
          });
        }}
      >
        <input
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          className="w-full border-2"
        />
      </form>
    </div>
  );
};

export default connect(mapStateToProps)(Chat);
