import Image from "next/image";

const TwoHeightMasonryGallery = () => {
  const imageHeight = 400; // Uniform height for all images

  const images = [
    { src: "/image/anime.jpg", alt: "Anime" },
    { src: "/image/luxury.jpg", alt: "Luxury" },
    { src: "/image/Marvel.png", alt: "Marvel" },
    { src: "/image/nike.jpg", alt: "Nike" },
    { src: "/image/God.png", alt: "God" },
    { src: "/image/anime.jpg", alt: "Nature" },
    { src: "/image/luxury.jpg", alt: "Technology" },
    { src: "/image/God.png", alt: "Food" },
    { src: "/image/Marvel.png", alt: "Travel" },
    { src: "/image/nike.jpg", alt: "Architecture" },
  ];

  return (
    <section className="py-12 bg-white w-full">
      <div className="w-full mx-auto px-4">
        
        {/* Title Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
            Customers Gallery
            <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
          </h1>
          <p className="text-lg sm:text-xl sm:mt-2 font-medium text-gray-700">
            See our customers' reviews and many more
          </p>
        </div>

        {/* Masonry Layout using Flexbox */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md"
              style={{ width: "80%", maxWidth: "300px", height: imageHeight }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={200}
                height={imageHeight}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TwoHeightMasonryGallery;
