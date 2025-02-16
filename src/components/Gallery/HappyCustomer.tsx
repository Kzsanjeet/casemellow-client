import Image from "next/image";

const TwoHeightMasonryGallery = () => {
  const shortHeight = 250;
  const longHeight = 400;

  const images = [
    { src: "/image/anime.jpg", alt: "Anime", height: shortHeight },
    { src: "/image/luxury.jpg", alt: "Luxury", height: longHeight },
    { src: "/image/Marvel.png", alt: "Marvel", height: shortHeight },
    { src: "/image/nike.jpg", alt: "Nike", height: longHeight },
    { src: "/image/God.png", alt: "God", height: shortHeight },
    { src: "/image/anime.jpg", alt: "Nature", height: longHeight },
    { src: "/image/luxury.jpg", alt: "Technology", height: shortHeight },
    { src: "/image/God.png", alt: "Food", height: longHeight },
    { src: "/image/Marvel.png", alt: "Travel", height: shortHeight },
    { src: "/image/nike.jpg", alt: "Architecture", height: longHeight },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Title Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
            Customers Gallery
            <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
          </h1>
          <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">
            See our customers' reviews and many more
          </p>
        </div>

        {/* Responsive Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 mx-auto w-[80%] sm:w-full"
              style={{ height: img.height }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={img.height}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TwoHeightMasonryGallery;
