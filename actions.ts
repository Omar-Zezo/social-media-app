"use server";

import { SettingsType } from "./components/CreatePostActions";

export const shareAction = async (
  formData: FormData,
  settings: SettingsType
) => {
  const content = formData.get("content") as string;
  const media = formData.get("media") as File;

  console.log(content, media, settings);
};
