import Image from "next/image";
import UploadImage from "./UploadMedia";
import CreatePostActions from "./CreatePostActions";

const Share = () => {
  return (
    <div className="p-4 flex gap-4">
      {/* AVATAR */}
      <div className="size-10 rounded-full relative overflow-hidden">
        {/* <div className="size-full bg-gray-400 animate-pulse"></div> */}
        <Image
          src="/general/avatar.webp"
          alt="omar abd elaziz"
          fill
          className="rounded-full"
        />
      </div>
      {/* OTHERS */}
      <CreatePostActions />
    </div>
  );
};

export default Share;
