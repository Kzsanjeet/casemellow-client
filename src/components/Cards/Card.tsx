import Image from "next/image";


const Card = () => {
  return (
    <div className="w-80 h-[420px] bg-white rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="relative">
        <Image
          src={"/image/anime.jpg"}
          width={320}
          height={320}
          alt="CR7 Inspired Cover"
          className="w-full h-80 object-cover duration-300 hover:scale-105"
        />
        <span className="absolute top-0 left-0 bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
          NEW
        </span>
      </div>
      <div className="p-3">
        <h1 className="text-lg font-bold text-gray-900">CR7 Inspired Cover</h1>
        <p className="text-sm text-gray-500">Sports - Premium Double Layer</p>
        <div className="flex justify-between items-center mt-2">
          <div>
            <span className="text-sm font-bold text-red-600">Rs 1000</span>
            <span className="text-sm text-gray-500 line-through ml-2">Rs 1200</span>
          </div>
          <span className="bg-green-500 text-white px-1 py-1 text-xs font-bold rounded-md">17% OFF</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
