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
      <div className="text-center mb-40 md:mb-8 flex justify-center py-4 flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2">Customers Gallery</h1>
            <div className='bg-red-500 h-1 w-96'></div>
            <p className="text-xl sm:text-xl sm:mt-2 font-medium text-gray-700">See our customers review and many more</p>
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {images.map((img, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 break-inside-avoid">
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={img.height}
                className="w-full h-auto object-cover transition-transform ease-in-out duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TwoHeightMasonryGallery;
