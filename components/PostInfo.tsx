import Image from "next/image";

const PostInfo = () => {
  return (
    <div className="cursor-pointer">
      <Image src="/icons/infoMore.svg" alt="more" width={20} height={20} />
    </div>
  );
};

export default PostInfo;
