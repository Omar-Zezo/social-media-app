import Link from "next/link";

const FeedSwitch = () => {
  return (
    <div className="flex border-b-[1px] border-borderGray">
      <Link
        href="/"
        className="flex items-center justify-center p-4 w-1/2 font-bold hover:bg-[#181818] relative blueLine"
      >
        For you
      </Link>
      <Link
        href="/"
        className="flex items-center justify-center p-4 w-1/2 text-textGray font-bold hover:bg-[#181818]"
      >
        Following
      </Link>
    </div>
  );
};

export default FeedSwitch;
