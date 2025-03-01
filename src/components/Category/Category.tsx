// "use client"
// import Image from "next/image"

// const Category = () => {
//   const images = [
//     {
//       id: 1,
//       category: "Anime",
//       image: "/image/anime.jpg",
//     },
//     {
//       id: 2,
//       category: "Luxury",
//       image: "/image/luxury.jpg",
//     },
//     {
//       id: 3,
//       category: "God",
//       image: "/image/God.png",
//     },
//     {
//       id: 4,
//       category: "Marvel",
//       image: "/image/Marvel.png",
//     },
//     {
//       id: 5,
//       category: "Sports",
//       image: "/image/nike.jpg",
//     },
//     {
//       id: 6,
//       category: "Mandala",
//       image: "/image/mandala.jpg",
//     },
//     {
//       id: 7,
//       category: "Abstract",
//       image: "/image/abstract.jpg",
//     },
//     {
//       id: 8,
//       category: "Unique",
//       image: "/image/unique.jpg",
//     },
//   ]

//   return (
//     <div className="py-12 sm:p-6 md:p-8 flex flex-col items-center">
//       <div className="text-center mb-10 flex flex-col items-center">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
//             Select your theme
//             <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
//           </h1>
//           <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">
//             Choose from a wide range of categories
//           </p>
//       </div>
//       <div className="w-full max-w-[90%] bg-white p-4 sm:p-6 rounded-lg">
//         <div className="flex flex-wrap justify-center -mx-2">
//           {images.map((categ) => (
//             <div key={categ.id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
//               <div className="relative overflow-hidden group aspect-[4/2.5] rounded-lg">
//                 <Image
//                   src={categ.image || "/placeholder.svg"}
//                   alt={categ.category}
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="transition-transform duration-300 ease-in-out group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
//                 <h1 className="px-4 text-white text-2xl sm:text-3xl md:text-4xl font-bold py-2 sm:py-3 md:py-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center w-full">
//                   {categ.category}
//                 </h1>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Category


"use client"
import Image from "next/image"
import Link from "next/link"

const Category = () => {
  const images = [
    {
      id: 1,
      category: "Anime",
      image: "/image/anime.jpg",
    },
    {
      id: 2,
      category: "Luxury",
      image: "/image/luxury.jpg",
    },
    {
      id: 3,
      category: "God",
      image: "/image/God.png",
    },
    {
      id: 4,
      category: "Marvel",
      image: "/image/Marvel.png",
    },
    {
      id: 5,
      category: "Sports",
      image: "/image/nike.jpg",
    },
    {
      id: 6,
      category: "Mandala",
      image: "/image/mandala.jpg",
    },
    {
      id: 7,
      category: "Abstract",
      image: "/image/abstract.jpg",
    },
    {
      id: 8,
      category: "Unique",
      image: "/image/unique.jpg",
    },
  ]

  return (
    <div className="py-12 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="text-center mb-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
          Select your theme
          <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
        </h1>
        <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">Choose from a wide range of categories</p>
      </div>
      <div className="w-full max-w-[70%] bg-white p-4 sm:p-6 rounded-lg">
        <div className="flex flex-wrap -mx-2">
          {images.map((categ) => (
            <Link href={`/products/${categ.category}`} key={categ.id} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
              <div className="relative overflow-hidden group aspect-square rounded-lg">
                <Image
                  src={categ.image || "/placeholder.svg"}
                  alt={categ.category}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center w-full">
                  {categ.category}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category




