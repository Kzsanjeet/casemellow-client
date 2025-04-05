// //@ts-nocheck
// "use client"
// import Cropper from 'react-easy-crop';
// import React, { useState, useCallback } from 'react';
// import { Trash2, Upload } from 'lucide-react';
// import Nav from '@/components/Nav/Nav';

// const Page = () => {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);

//   const onFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setImage(reader.result);
//       };
//     }
//   };

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   // const createImage = (url, onLoad, onError) => {
//   //   const img = new Image();
//   //   img.onload = () => onLoad(img);
//   //   img.onerror = (error) => onError(error);
//   //   img.src = url;
//   //   };


//   const createImage = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img);
//       img.onerror = (error) => reject(error);
//       img.src = url;
//     });
//   };
  

//   const getCroppedImg = async () => {
//     if (!image || !croppedAreaPixels) return null;
    
//     try {
//       const sourceImage = await createImage(image);
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       if (!ctx) throw new Error('Canvas context is null');

      
//       canvas.width = croppedAreaPixels.width;
//       canvas.height = croppedAreaPixels.height;
      
//       ctx.drawImage(
//         sourceImage,
//         croppedAreaPixels.x,
//         croppedAreaPixels.y,
//         croppedAreaPixels.width,
//         croppedAreaPixels.height,
//         0,
//         0,
//         croppedAreaPixels.width,
//         croppedAreaPixels.height
//       );
      
//       return canvas.toDataURL('image/jpeg');
//     } catch (e) {
//       console.error(e);
//       return null;
//     }
//   };

//   const showCroppedImage = useCallback(async () => {
//     try {
//       const result = await getCroppedImg();
//       if (result) {
//         setCroppedImage(result);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }, [croppedAreaPixels, image]);

//   const removeImage = () => {
//     setImage(null);
//     setCroppedImage(null);
//   };

//   return (
//     <div>
//       <Nav/>
//       <div className="max-w-md mx-auto mt-20 p-4 bg-gray-100 rounded-lg shadow-md">
//       <div className="relative">
//         <div className="flex items-center justify-center bg-gray-300">
//           <div className="relative w-[180px] h-[400px] bg-gray-200 rounded-[40px] shadow-md border border-gray-400 flex flex-col items-center p-4">
//             {croppedImage && (
//               <div 
//                 className="absolute inset-0 z-0 overflow-hidden rounded-[36px]"
//               >
//                 <img 
//                   src={croppedImage} 
//                   alt="Customized Case" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
            
//             <div className="absolute top-5 left-5 flex flex-col gap-2.5 z-10">
//               <div className="w-5 h-5 bg-black rounded-full border-2 border-gray-600"></div>
//               <div className="w-5 h-5 bg-black rounded-full border-2 border-gray-600"></div>
//             </div>
            
//             <div className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-black rounded-full z-10"></div>
//           </div>
//         </div>

//         <div className="mt-4 space-y-4">
//           {!image && (
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <Upload className="w-10 h-10 text-gray-500 mb-2" />
//                   <p className="mb-2 text-sm text-gray-500">Click to upload image</p>
//                 </div>
//                 <input 
//                   type="file" 
//                   className="hidden" 
//                   accept="image/*" 
//                   onChange={onFileChange} 
//                 />
//               </label>
//             </div>
//           )}

//           {image && !croppedImage && (
//             <div className="space-y-4">
//               <div className="relative h-64 w-full">
//                 <Cropper
//                   image={image}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={9 / 20}
//                   onCropChange={setCrop}
//                   onCropComplete={onCropComplete}
//                   onZoomChange={setZoom}
//                 />
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <span>Zoom</span>
//                 <input
//                   type="range"
//                   value={zoom}
//                   min={1}
//                   max={3}
//                   step={0.1}
//                   aria-labelledby="Zoom"
//                   onChange={(e) => setZoom(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//               </div>

//               <div className="flex justify-between">
//                 <button 
//                   onClick={removeImage}
//                   className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   <Trash2 className="mr-2 w-5 h-5" /> Remove
//                 </button>
//                 <button 
//                   onClick={showCroppedImage}
//                   className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Apply Crop
//                 </button>
//               </div>
//             </div>
//           )}

//           {croppedImage && (
//             <div className="flex justify-between">
//               <button 
//                 onClick={removeImage}
//                 className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 <Trash2 className="mr-2 w-5 h-5" /> Remove
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Page;


//@ts-nocheck
"use client"
import Cropper from 'react-easy-crop';
import React, { useState, useCallback } from 'react';
import { Trash2, Upload } from 'lucide-react';
import Nav from '@/components/Nav/Nav';

const Page = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCover, setSelectedCover] = useState([]);
  
  // Mock data for demonstration
  const brandDetails = [
    { _id: "1", brandName: "Apple" },
    { _id: "2", brandName: "Samsung" },
    { _id: "3", brandName: "Google" }
  ];
  
  const phoneModelDetails = selectedBrand === "1" 
    ? ["iPhone 13", "iPhone 14", "iPhone 15"] 
    : selectedBrand === "2" 
      ? ["Galaxy S22", "Galaxy S23", "Galaxy Fold"] 
      : selectedBrand === "3" 
        ? ["Pixel 6", "Pixel 7", "Pixel 8"] 
        : [];
  
  const product = {
    productName: "Custom Phone Case",
    productDescription: "Personalized phone case with your own image. High-quality printing on durable material.",
    productPrice: "1299",
    coverType: ["Hard Case", "Soft Case", "Wallet Case", "Magnetic Case"]
  };
  
  const handleCoverTypeChange = (type) => {
    setSelectedCover(prev => 
      prev.includes(type) 
        ? prev.filter(item => item !== type)
        : [...prev, type]
    );
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };
  
  const getCroppedImg = async () => {
    if (!image || !croppedAreaPixels) return null;
    
    try {
      const sourceImage = await createImage(image);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context is null');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      
      ctx.drawImage(
        sourceImage,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      
      return canvas.toDataURL('image/jpeg');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const result = await getCroppedImg();
      if (result) {
        setCroppedImage(result);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image]);

  const removeImage = () => {
    setImage(null);
    setCroppedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Customize Your Phone Case</h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Phone Preview & Image Upload */}
            <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center border-r border-gray-200">
              <div className="relative mb-6">
                <div className="relative w-[200px] h-[400px] bg-gray-200 rounded-[40px] shadow-md border border-gray-300 flex flex-col items-center p-4">
                  {croppedImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[36px]">
                      <img 
                        src={croppedImage} 
                        alt="Customized Case" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="absolute top-5 left-5 flex flex-col gap-2.5 z-10">
                    <div className="w-5 h-5 bg-black rounded-full border-2 border-gray-600"></div>
                    <div className="w-5 h-5 bg-black rounded-full border-2 border-gray-600"></div>
                  </div>
                  
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-16 bg-black rounded-l-full z-10"></div>
                </div>
              </div>

              <div className="w-full space-y-4">
                {!image && (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-blue-500 mb-2" />
                        <p className="mb-2 text-sm text-blue-500 font-medium">Click to upload image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={onFileChange} 
                      />
                    </label>
                  </div>
                )}

                {image && !croppedImage && (
                  <div className="space-y-4">
                    <div className="relative h-72 w-full rounded-lg overflow-hidden border border-gray-300">
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={9 / 20}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Zoom</span>
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button 
                        onClick={removeImage}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        <Trash2 className="mr-2 w-4 h-4" /> Remove
                      </button>
                      <button 
                        onClick={showCroppedImage}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Apply Crop
                      </button>
                    </div>
                  </div>
                )}

                {croppedImage && (
                  <div className="flex justify-center">
                    <button 
                      onClick={removeImage}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      <Trash2 className="mr-2 w-4 h-4" /> Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Customization Options */}
            <div className="w-full md:w-1/2 p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{product.productName}</h2>
                  <div className="h-1 w-20 bg-blue-500 my-2"></div>
                  <p className="text-gray-600 mt-2">{product.productDescription}</p>
                </div>
                
                <div>
                  <div className="text-3xl font-bold text-blue-600">₹{product.productPrice}</div>
                  <p className="text-sm text-gray-500">(Free shipping on orders above ₹999)</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Brand</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">Choose a brand</option>
                      {brandDetails.map((brand) => (
                        <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Model</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedBrand}
                    >
                      <option value="">{selectedBrand ? "Choose a model" : "Select brand first"}</option>
                      {phoneModelDetails.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Cover Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {product?.coverType?.map((type) => (
                        <label key={type} className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${selectedCover.includes(type) ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}`}>
                          <input 
                            type="checkbox" 
                            checked={selectedCover.includes(type)} 
                            onChange={() => handleCoverTypeChange(type)} 
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!croppedImage || !selectedBrand || !selectedModel || selectedCover.length === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;