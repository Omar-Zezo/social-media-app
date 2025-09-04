"use client";

import Image from "next/image";
import { useState } from "react";
import { shareAction } from "@/actions";
import ImageEditor from "./ImageEditor";
import UploadMedia from "./UploadMedia";

export type SettingsType = {
  type: "original" | "square" | "wide";
  sensitive: boolean;
};

const CreatePostActions = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsType>({
    type: "original",
    sensitive: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <form
      className="flex flex-col flex-1 gap-4"
      action={(formData) => shareAction(formData, settings)}
    >
      <input
        autoComplete="off"
        name="content"
        type="text"
        placeholder="What is happening?"
        className="text-xl bg-transparent outline-none placeholder:text-textGray"
        value={text ?? ""}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex items-center flex-wrap gap-4">
          <UploadMedia handleChange={handleChange} preview={preview} />
          <Image
            width={20}
            height={20}
            src="/icons/gif.svg"
            alt="image"
            className="cursor-pointer"
          />
          <Image
            width={20}
            height={20}
            src="/icons/poll.svg"
            alt="image"
            className="cursor-pointer"
          />
          <Image
            width={20}
            height={20}
            src="/icons/emoji.svg"
            alt="image"
            className="cursor-pointer"
          />
          <Image width={20} height={20} src="/icons/schedule.svg" alt="image" />
          <Image width={20} height={20} src="/icons/location.svg" alt="image" />
        </div>
        <button
          type="submit"
          disabled={preview || text ? false : true}
          className="text-black bg-white font-semibold py-2 px-4 rounded-full cursor-pointer disabled:cursor-default disabled:opacity-50"
        >
          Post
        </button>
      </div>
      {preview && media?.type.includes("image") && (
        <div className="relative rounded-md overflow-hidden">
          <div
            onClick={() => setIsEditorOpen(true)}
            className="absolute top-2 left-2 py-1 px-4 text-sm font-semibold bg-black/50 rounded-full cursor-pointer"
          >
            Edit
          </div>
          <div
            onClick={() => setMedia(null)}
            className="size-8 flex items-center justify-center rounded-full bg-zinc-900/50 text-sm font-bold text-white absolute top-2 right-2 cursor-pointer"
          >
            X
          </div>
          <Image
            width={600}
            height={600}
            src={preview}
            alt="post image"
            className={`w-full ${
              settings.type === "original"
                ? "h-full object-contain"
                : settings.type === "wide"
                ? "aspect-video object-cover"
                : "aspect-square object-cover"
            }`}
          />
          {isEditorOpen && (
            <ImageEditor
              settings={settings}
              setSettings={setSettings}
              preview={preview}
              onClose={() => setIsEditorOpen(false)}
            />
          )}
        </div>
      )}
      {preview && media?.type.includes("video") && (
        <div className="relative">
          <video src={preview ?? ""} controls />
          <div
            onClick={() => setMedia(null)}
            className="size-8 flex items-center justify-center rounded-full bg-zinc-900/50 text-sm font-bold text-white absolute top-2 right-2 cursor-pointer"
          >
            X
          </div>
        </div>
      )}
    </form>
  );
};

export default CreatePostActions;
