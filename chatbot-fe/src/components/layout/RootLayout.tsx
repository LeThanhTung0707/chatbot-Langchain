import Link from "next/link";

const RootLayout = ({ children }: any) => {
  return (
    <>
      <div className="flex">
        <div className="w-[270px] bg-black flex flex-col gap-5">
          <div className="bg-white mx-2 p-2 mt-10 cursor-pointer rounded-lg">
            <Link href="/">Model 1</Link>
          </div>
          <div className="bg-white mx-2 p-2 cursor-pointer rounded-lg">
            <Link href="/chatbot2">Model 2</Link>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default RootLayout;
