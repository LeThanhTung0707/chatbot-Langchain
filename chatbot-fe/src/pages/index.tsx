import MessageBlock from "@/components/MessageBlock";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const message = useRef<any>(null);
  const [conversation, setConversation] = useState<any>([]);
  useEffect(() => {
    fetch(`http://localhost:3030/history1`, {}).then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        setConversation(response.history);
      }
    });
  }, []);
  const handleMessage = (e: Event) => {
    e.preventDefault();

    if (message.current && message.current.value) {
      setConversation((current: any) => {
        return [
          ...current,
          {
            bot: false,
            message: message.current.value,
          },
        ];
      });
      fetch(`http://localhost:3030?message=${message.current.value}`, {}).then(
        async (res) => {
          if (res.ok) {
            const response = await res.json();
            setConversation((current: any) => {
              return [
                ...current,
                {
                  bot: true,
                  message: response.message,
                },
              ];
            });
          }
        }
      );
    }
    message.current.value = "";
  };
  return (
    <div className="flex justify-center h-screen">
      <div className="max-w-[1500px] h-full w-full">
        <div className=" flex flex-col justify-between items-center h-full">
          <div className="flex-1 w-full mt-4 overflow-auto flex gap-4 flex-col chat">
            {conversation.map((item: any, index: number) => {
              return (
                <MessageBlock
                  key={index}
                  bot={item.bot}
                  message={item.message}
                ></MessageBlock>
              );
            })}
          </div>
          <div className="flex gap-4 w-[60%] py-10">
            <TextField
              sx={{
                width: "100%",
                fontSize: "30px",
              }}
              inputRef={message}
              id="outlined-basic"
              label="Message"
              variant="outlined"
            />
            <Button
              onClick={(e) => handleMessage(e as any)}
              sx={{}}
              variant="outlined"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const model = new ChatOpenAI({
//     temperature: 0,
//     openAIApiKey: process.env.OPENAI_API_KEY,
//   });
//   const tools = [
//     new SerpAPI(process.env.SERPAPI_API_KEY, {
//       hl: "en",
//       gl: "us",
//     }),
//     new Calculator(),
//   ];
//   const executor = await initializeAgentExecutorWithOptions(tools, model, {
//     agentType: "chat-conversational-react-description",
//     verbose: true,
//   });

//   console.log(executor);
//   return {
//     props: {
//       executor,
//     },
//   };
// }
