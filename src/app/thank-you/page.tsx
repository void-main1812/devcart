import PaymentStatus from "@/components/PaymentStatus";
import { buttonVariants } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/getPayload";
import { getServerSideUser } from "@/lib/payload.util";
import { cn, formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-type";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface pageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ThankYouPage = async ({ searchParams }: pageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) {
    return notFound();
  }

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=/thank-you?orderId=${orderId}`);
  }

  const products = order.products as Product[];

  const orderTotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <main className="lg:min-h-full fixed w-full">
      <div className="fixed h-80 hidden md:block overflow-hidden lg:absolute lg:h-[95vh] lg:w-1/2 lg:pr-4 xl:pr-12 bg-black/10">
        <Image
          fill
          src="/banner.jpg"
          alt="banner Image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="overflow-scroll h-[100vh]">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-24 xl:gap-x-24">
          <div className="lg: col-start-2">
            <p className="text-sm font-medium text-zinc-600">
              Order Successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Thanks for your order!
            </h1>
            {/* checking while the order is valid or not */}
            {order._paid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your Order was processed and your assets are available to
                download below. We&apos;ve sent your recipt and order details to
                your{" "}
                {typeof order.user !== "string" ? (
                  <span className="font-bold text-gray-900">
                    {order.user.email}
                  </span>
                ) : (
                  <span>email</span>
                )}
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                We appreciate your order, and we&apos;re currently processing
                it. So hang tight! We&apos;ll send you an email when it&apos;s
                ready.
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order no.</div>
              <div className="mt-2 text-gray-900">{order.id}</div>
            </div>

            <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
              {(order.products as Product[]).map((product) => {
                const label = PRODUCT_CATEGORIES.find(
                  ({ value }) => value === product.category
                )?.label;

                const downloadUrl = (product.product_files as ProductFile)
                  .url as string;

                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="relative h-28 w-28">
                      {typeof image !== "string" && image.url ? (
                        <Image
                          fill
                          src={image.url}
                          alt={`The ${product.name} image`}
                          className="flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                      ) : null}
                    </div>
                    <div className="flex-auto flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-gray-900 text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-normal">
                          category: {label}
                        </p>
                      </div>

                      {order._paid ? (
                        <a
                          href={downloadUrl}
                          download={product.name}
                          className={cn(buttonVariants({ size: "sm" }))}
                        >
                          Download Asset
                        </a>
                      ) : null}
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      {formatPrice(product.price, { currency: "INR" })}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-6 border-t mb-10 lg:mb-0 border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>
                  {formatPrice(orderTotal, {
                    currency: "INR",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Transaction Fee</p>
                <p>
                  {formatPrice(50, {
                    currency: "INR",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <p className="text-base ">Total</p>
                <p className="text-base ">
                  {formatPrice(orderTotal + 50, { currency: "INR" })}
                </p>
              </div>
            </div>

            <PaymentStatus
              isPaid={order._paid}
              orderEmail={(order.user as User).email}
              orderId={order.id}
            />
            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                href="/products"
                className={buttonVariants({ variant: "link" })}
              >
                Continue Shopping &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
