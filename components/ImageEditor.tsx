import Image from "next/image";
import { SettingsType } from "./CreatePostActions";

interface Props {
  preview: string;
  onClose: () => void;
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
}

const ImageEditor = ({ preview, onClose, settings, setSettings }: Props) => {
  const handleChangeSensitive = (sensitive: boolean) => {
    setSettings((prev) => ({ ...prev, sensitive }));
  };

  const handleChangeSettingType = (type: "original" | "wide" | "square") => {
    setSettings((prev) => ({ ...prev, type }));
  };

  return (
    <div className="size-full bg-[#5b708366] fixed left-0 top-0 z-10 flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-black rounded-xl p-12">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <svg
              onClick={onClose}
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
              />
            </svg>
            <h3 className="text-xl text-white font-semibold">Media Settings</h3>
          </div>
          <div
            onClick={onClose}
            className="py-2 px-4 bg-white text-black font-semibold rounded-full cursor-pointer"
          >
            Save
          </div>
        </div>
        {/* IMAGE CONTAINER */}
        <div className="w-[600px] h-[500px] flex items-center rounded-lg overflow-hidden">
          <Image
            width={600}
            height={500}
            src={preview}
            alt="image preview"
            className={`w-full ${
              settings.type === "original"
                ? "h-full object-contain"
                : settings.type === "wide"
                ? "aspect-video object-cover"
                : "aspect-square object-cover"
            }`}
          />
        </div>
        {/* OPTIONS */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <div
              onClick={() => handleChangeSettingType("original")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <svg width={24} viewBox="0 0 24 24">
                <path
                  className={
                    settings.type === "original"
                      ? "fill-iconBlue"
                      : "fill-textGray"
                  }
                  d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z"
                />
              </svg>
              Original
            </div>
            <div
              onClick={() => handleChangeSettingType("wide")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <svg width={24} viewBox="0 0 24 24">
                <path
                  className={
                    settings.type === "wide" ? "fill-iconBlue" : "fill-textGray"
                  }
                  d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z"
                />
              </svg>
              Wide
            </div>
            <div
              onClick={() => handleChangeSettingType("square")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <svg width={24} viewBox="0 0 24 24">
                <path
                  className={
                    settings.type === "square"
                      ? "fill-iconBlue"
                      : "fill-textGray"
                  }
                  d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z"
                />
              </svg>
              Square
            </div>
          </div>
          <button
            onClick={() => handleChangeSensitive(!settings.sensitive)}
            className={`${
              settings.sensitive
                ? "bg-red-700 text-white"
                : "bg-white text-black"
            } font-semibold py-1 px-4 rounded-full cursor-pointer`}
          >
            Sensitive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
