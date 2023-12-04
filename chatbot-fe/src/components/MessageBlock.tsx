const MessageBlock = ({ bot, message }: any) => {
  return (
    <>
      <div
        className={`flex ${
          !bot ? "justify-end pr-4" : "justify-start pl-4"
        } w-full`}
      >
        <div
          className={`flex-col flex ${
            !bot ? "items-end" : "items-start"
          } gap-1 w-[70%]`}
        >
          <div
            className={`rounded-t-[30px] text-[22px] ${
              !bot
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-bl-[30px]"
                : "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 rounded-br-[30px]"
            } p-4`}
          >
            {message}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBlock;
