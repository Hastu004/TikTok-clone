import { supabase } from "./supabase.js";

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL;

export const uploadVideo = async ({ videoFile }) => {
  const filename = window.crypto.randomUUID();

  const { data, error } = await supabase.storage
    .from("videos")
    .upload(`uploads/${filename}.mp4`, videoFile);

  const file = data?.Key ? `${prefix}${data.Key}` : "";
  return [error, file];
};

export const publishVideo = async ({ videoSrc, description }) => {
  console.log({description})
  const defaultAlbum =
    "https://i.etsystatic.com/32636106/r/il/d8de88/3901747595/il_794xN.3901747595_gijb.jpg";
  const defaultSong = "classic song";

  const { data, error } = await supabase.from("videos").insert([
    {
      user_id: "3e46b669-8f29-4ce8-980c-b00e5b3c8af4",
      description,
      albumCover: defaultAlbum,
      songTitle: defaultSong,
      src: videoSrc,
    },
  ]);

  return [error, data];
};

export const getVideos = async () => {
  const { data, error } = await supabase
    .from("videos")
    .select(
      `*, user:user_id (
      avatar,
      username,
      id
    )`
    )
    .order("created_at", { ascending: false });

  return [error, data];
};
