"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";
import { TQueryValidator } from "@/lib/validators/Query-Validators";
import { Product } from "@/payload-type";
import ProductListing from "./ProductListing";

interface ProductReelProps {
  title: string;
  subTitle?: string;
  href?: string;
  query: TQueryValidator;
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subTitle, href, query } = props;

  const FALLBACK_LIMIT = 4;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];

  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="py-12 flex md:items-start md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subTitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: " justify-center items-center gap-2 hidden md:flex",
            })}
          >
            Shop the Collection{" "}
            <ArrowRight className="h-4 w-4" aria-hidden={true} />
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <div className=" mt-6 flex items-center w-full">
          <div className=" w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
