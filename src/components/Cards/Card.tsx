import { motion } from "motion/react"
import Image from "next/image";
import Link from "next/link";

interface Brand {
  _id: string;
  brandName: string;
}

interface Product {
  _id: string;
  productName: string;
  brands: Brand | null;
  phoneModel: string;
  coverType: string[];
  productDescription: string;
  productPrice: number;
  discount:number;
  productImage: string;
  productCategory: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CardProps {
  product: Product;
}


const Card: React.FC<CardProps> = ({ product }) => {
  if (!product) return null; // Prevents error if product is undefined

let discountRate: number;
if (product.discount <= 0) {
  discountRate = 10;
} else {
  discountRate = product.discount;
}

// Convert discount to decimal
const priceBeforeDiscount = (product.productPrice / (1 - discountRate / 100)).toFixed(0);

  // const params = useParams();
  // const category = params.category;

  return (
    <Link href={`/products/${product.productCategory.toLowerCase()}/${product._id}`}>
      <motion.div 
      initial ={{opacity:0, y: -50}}
      animate={{opacity:1, y:0}}
      transition={{duration: 0.5, delay: 0.5}}
      className="w-80 h-[420px] bg-white rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
        <div className="relative">
          <Image
            src={product.productImage || "/placeholder.png"} // Default fallback image
            width={320}
            height={320}
            alt={product.productName}
            className="w-full h-80 object-cover duration-300 hover:scale-110"
          />
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1">
            NEW
          </span>
        </div>
        <div className="p-3">
          <h1 className="text-lg font-bold text-gray-900 truncate">{product.productName}</h1>
          <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {product.productCategory} 
          </p>
          <p className="text-sm text-gray-800">{product.brands?.brandName}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <span className="text-[17px] font-bold text-red-600">Rs {product.productPrice}</span>
              <span className="text-xs text-gray-700 line-through ml-2">Rs {priceBeforeDiscount}</span>
            </div>
            <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-md">{discountRate}% off</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Card;
