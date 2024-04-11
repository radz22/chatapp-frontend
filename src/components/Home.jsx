import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext ";

const Home = () => {
  const { socket } = useContext(SocketContext);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleJoin = () => {
    const timestamp = new Date().toLocaleTimeString();

    if (room !== "" && name !== "") {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("room", room);
      navigate("/chat");
      socket.emit("join", {
        name: name,
        room: room,
        time: timestamp,
      });
    } else {
      alert("pls input");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#14569c] ">
      <div className="bg-[#e1e5e8] w-1/3 rounded-lg		">
        <div className="px-5 py-3 ">
          <div>
            <h1 className="text-2xl	 font-bold	text-center">Join a Chat</h1>
          </div>
          <div className="mt-5">
            <div>
              <p className="text-xl	font-semibold">Display name</p>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="w-full py-3 px-3	rounded-md	"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <div>
              <p className="text-xl	font-semibold">Room name</p>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="w-full py-3 px-3	rounded-md	"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center mt-5">
            {" "}
            <button
              className="text-xl	font-semibold bg-[#14569c] w-full px-3 py-3 text-white"
              onClick={handleJoin}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
