import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";

export default function BoardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex justify-between">
      <div className="px-2 xs:px-4  2xl:px-8">
        <LeftBar />
      </div>
      <div className="lg:min-w-[600px] border-x-[1px] border-borderGray flex-1">
        {children}
        {modal}
      </div>
      <div className="hidden xl:flex flex-1 ml-4 md:ml-8">
        <RightBar />
      </div>
    </div>
  );
}
