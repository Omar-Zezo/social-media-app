import Feed from "@/components/Feed";
import FeedSwitch from "@/components/FeedSwitch";
import Share from "@/components/Share";

export default function Home() {
  return (
    <div>
      <FeedSwitch />
      <Share />
      <Feed />
    </div>
  );
}
