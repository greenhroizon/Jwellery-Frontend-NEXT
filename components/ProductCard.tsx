"use client";

import { ProductCardProps } from "@/type/api";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAddToCart } from "@/hooks/useDashboard";

export function ProductCard({
  title,
  price,
  image,
  id,
  productData,
}: ProductCardProps) {
const { mutate: addToCart, isPending } = useAddToCart();

const handleAddToCart = () => {
  addToCart({
    productId: id,
    productData,
  });
};

  return (
    <Card className="w-72 rounded-xl overflow-hidden shadow-md">
      
      {/* Image */}
      <Link href={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover cursor-pointer"
        />
      </Link>

      <div className="px-3 flex flex-col gap-3">
        <span className="text-xl font-semibold">{title}</span>
        <hr className="border-black border" />

        <div className="flex items-center">
          <span className="text-xl font-bold">{price}</span>

          <Button
            onClick={handleAddToCart}
            disabled={isPending}
            className="bg-red-800 ml-auto w-30 h-8"
          >
            {isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
}