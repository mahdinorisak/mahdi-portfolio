"use client";
import ImageUpload from "./ImageUpload";

export default function PhotoUpload({ c, set }) {
  return (
    <ImageUpload
      label="Profile photo"
      value={c.photo}
      round
      prefix="profile"
      maxSide={1200}
      help="A portrait photo. It is shrunk automatically, so any size works. Click Save after uploading."
      onChange={(url, path) => set({ photo: url, photoPath: path })}
    />
  );
}