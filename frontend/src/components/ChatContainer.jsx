import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatDate, formatMessageTime } from "../lib/utils";


const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto ">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        
        {messages.map((message, index) => {
          const currentMessageDate = formatDate(message.createdAt);
          const previousMessageDate =
            index > 0 ? formatDate(messages[index - 1].createdAt) : null;

          const showDate = currentMessageDate !== previousMessageDate;
          const todayDate = formatDate(new Date().toJSON());

          return (
            <div key={message._id}>
              {showDate && (
                <div className="text-center text-sm text-gray-500 my-4">
                  {currentMessageDate === todayDate ? `Today` : currentMessageDate}
                </div>
              )}

              <div
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header m-1 flex items-center">
                  <div>
                    {message.senderId === authUser._id ? `You` : selectedUser.fullName}
                  </div>
                </div>
                <div
                  className={
                    message.senderId === authUser._id
                      ? `chat-bubble rounded-4xl shadow-xl shadow-black px-5 py-3 max-w-xs flex flex-col`
                      : `chat-bubble rounded-4xl shadow-xl shadow-black px-5 py-3 bg-accent text-black max-w-xs flex flex-col`
                  }
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  
                  {message.text && <p>{message.text}</p>}
                </div>

                <div className="chat-footer mt-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            </div> 
          );
        })}

      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
