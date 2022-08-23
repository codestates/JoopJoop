import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { FaRegPaperPlane } from "react-icons/fa";

// const messageBoxRef = useRef<HTMLUListElement>(null);

// const scrollToBottom = () => {
//   if (messageBoxRef.current) {
//     messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
//   }
// };


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
        // console.log(filteredData);
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

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chat]);

console.log(list[list.length-1])
console.log(loginNickname)

  return (
    <div id="Frame11" className="flex flex-col items-start">
      <div id="TopBar" className="flex flex-row items-start gap-2 py-2 px-4 border-b-[1px] border-grey-70">
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
              id="Message"
              className={`${loginNickname === item.author.nickname? 'flex flex-row justify-end items-start p-0 w-full' : 'flex flex-row items-start p-0 bg-white rounded-md w-full' }`}
            >

              {loginNickname === item.author.nickname? null :         
              <div id="Frame13_profileimg">
                <img src={item.author.profileImg} alt="no img" className="w-10 h-10 rounded-full"/>
              </div>
              }

              <div id="Frame12_message" className="flex flex-col items-start p-0 gap-1">

              {loginNickname === item.author.nickname? null :        
              <div id="author" className=" font-semibold pt-1 pl-[4px]">
              {item.author.nickname}
              </div>
              }

              <div id="Message_outer" className={`${loginNickname === item.author.nickname? "flex flex-col justify-center mb-4 text-sm border-2 rounded-full border-green-50 py-1 px-3 gap-1 bg-green-50" 
              : "flex flex-col justify-center items-start mb-4 py-1 px-3 gap-1 text-sm border-2 rounded-full border-grey-50 p-4 bg-grey-50"}`}>
                <div id="message_inner" className="items-start font-normal font-sans text-sm">
              {item.message}
                </div>
              <div id="Time" className="flex flex-row justify-end p-0 gap-1 text-white text-[8px]">
                {item.updatedAt}
              </div>
              </div>

              </div>


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
            <div className="flex flex-row p-2 border-[1px] border-grey-50 rounded-lg ">
            <input
              id="Message"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              className="w-[400px] font-normal text-[16px] text-grey-80"
              placeholder="여기에 채팅을 입력해주세요"
            />
            {/* <img className="w-[80px]" alt="전송Img"></img> */}
            <FaRegPaperPlane 
            className=" text-green-90 ml-2 hover:scale-125 duration-200"
            />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Chat);