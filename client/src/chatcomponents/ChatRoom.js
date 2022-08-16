const ChatRoom = ({ room, onJoin }) => {
  return (
    <div
      onClick={() => onJoin(room._id)}
      className="w-[330px] h-[80px] rounded-lg p-4 m-1 bg-[#DBDDD8]"
    >
      <div className="p-2">{room.title}</div>
    </div>
  );
};

export default ChatRoom;
