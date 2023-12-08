import Rating from "@mui/material/Rating";
export default function ReviewCard({ image, name, review, rating }) {
  return (
    <div className="relative max-w-[380px] w-full bg-transparent px-[1rem] pb-[2rem] border-[2px] border-black border-opacity-50 rounded-[10px] hover:scale-105 hover:shadow-2xl transition-all duration-500">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1 rounded-full">
        <img src={image} alt="" className="w-[80px] h-[80px]" />
      </div>
      <div className="flex flex-col items-center justify-center mt-[3rem]">
        <h1 className="text-[18px] font-[500] mt-[1rem]">
          {name}
        </h1>
        <Rating value={rating} readOnly />
        <p className="text-[16px] font-[400] opacity-60 text-center mt-[1.5rem]">
          ❝ {review} ❞
        </p>
      </div>
    </div>
  );
}
