import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (event, imageUrl) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl),
    );
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-2xl font-bold">Bilder</h2>
      <div className="flex flex-col gap-1 rounded border p-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url, index) => (
              <div key={index} className="group relative">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex w-full items-center justify-center bg-black bg-opacity-50 text-white opacity-0 duration-75 active:bg-opacity-60 group-hover:opacity-100"
                >
                  Entfernen
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full cursor-pointer font-normal text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

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
