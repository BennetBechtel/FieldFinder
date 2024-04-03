import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-2xl font-bold">Bilder</h2>
      <div className="flex flex-col gap-1 rounded border p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full cursor-pointer font-normal text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "Es muss mindestens ein Bild ausgewählt werden";
              }
              if (totalLength > 6) {
                return "Es dürfen maximal 6 Bilder ausgewählt werden";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="input-error-message">{errors.imageFiles.message}</span>
      )}
    </div>
  );
};

export default ImagesSection;
