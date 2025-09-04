import Image from "next/image";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
}

const UploadMedia = ({ handleChange, preview }: Props) => {
  return (
    <div className="">
      <label htmlFor="upload-image">
        <Image
          width={20}
          height={20}
          src="/icons/image.svg"
          alt="image"
          className="cursor-pointer"
        />
      </label>
      <input
        name="media"
        id="upload-image"
        onChange={handleChange}
        type="file"
        className="hidden"
        accept="image/*,video/*"
      />
    </div>
  );
};

export default UploadMedia;
