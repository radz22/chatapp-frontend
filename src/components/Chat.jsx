import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext ";
import { Toaster, toast } from "react-hot-toast";
import soundNotify from "../assets/sound.mp3";
const Chat = () => {
  const notificationSound = new Audio(soundNotify); // Adjust path if needed

  const [join, setJoin] = useState([]);
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);
  const [user, setUser] = useState([]);
  const [notify, setNotify] = useState(null);

  useEffect(() => {
    socket.on("join", (data) => {
      setJoin([...join, data]);
    });
    socket.on("user", (data) => {
      setUser(data);
    });
    socket.on("receiver", (data) => {
      setReceiveMessage([...receiveMessage, data]);
    });

    socket.on("notification", (msg) => {
      notificationSound.play();
    });
    return () => {
      socket.off("notification");
    };
  }, [join, user, receiveMessage, notify]);

  const handleMessage = () => {
    socket.emit("sender", {
      name: sessionStorage.getItem("name"),
      room: sessionStorage.getItem("room"),
      message: message,
    });
    setMessage("");
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <div className="w-full h-auto flex gap-5 bg-[#e1e5e8] ">
        <div className="w-1/4	  bg-[#14569c] h-screen">
          <div className="px-3 py-3 ">
            <div className="text-center">
              <h1 className="text-white text-3xl	font-semibold">People</h1>
            </div>
            <div>
              {user.map((item) => (
                <div className="bg-white py-2 px-2 mt-3 rounded-lg	">
                  <p className="text-xl 	">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-3/4 ">
          <div className="h-[90vh]		 overflow-scroll	px-3 py-3 bg-white ">
            <div>
              {join.map((item) => (
                <div className="mt-3">
                  <div className="flex gap-4 items-center">
                    <h1 className="font-bold">Admin</h1>
                    <p className="text-sm	 text-[#7a7a7a]">{item.currentTime}</p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">{item.user}</span> has
                      joined.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              {receiveMessage.map((item) => (
                <div>
                  {item.user == sessionStorage.getItem("name") ? (
                    <div className="flex items-end justify-end">
                      <div>
                        <div>
                          <p className="text-[#626262] text-left">
                            {item.user}
                          </p>
                        </div>
                        <div className="bg-[#e1e5e8] px-3 py-3 w-auto text-center rounded-md	">
                          <p>{item.message}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-start">
                      <div>
                        <div>
                          <p className="text-[#626262] text-left">
                            {item.user}
                          </p>
                        </div>
                        <div className="bg-[#e1e5e8] px-3 py-3 w-auto text-center rounded-md	">
                          <p>{item.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-4 gap-5">
            <div className="w-3/4	">
              <input
                type="text"
                placeholder="message"
                className="w-full py-3 px-3 text-xl"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <button
                className=" bg-[#14569c] text-white text-xl	 px-4 py-3"
                onClick={handleMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
