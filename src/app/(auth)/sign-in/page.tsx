"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/AccountCredentialsValidator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const page = () => {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },

    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid Email or Password");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      {isClient && (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 max-w-3xl">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Icons.logo className="h-20 w-20 rounded-xl shadow-xl shadow-black/25" />
              <h1 className="text-2xl font-bold">
                Sign In to Your {isSeller ? "Seller" : ""} Account
              </h1>

              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "link",
                  className: "text-muted-foreground gap-1.5",
                })}
              >
                Don&apos;t have an account? Sign Up
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      className={cn({
                        "focus-visible:ring-red-500": errors.email,
                      })}
                      placeholder="username@host.com"
                    />
                    {errors?.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password")}
                      className={cn({
                        "focus-visible:ring-red-500": errors.password,
                      })}
                      type="password"
                      placeholder="akInLIH552"
                    />
                    {errors?.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button>Sign In</Button>
                </div>
              </form>
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden={true}
                >
                  <span className="w-full border-t" />
                </div>
                <div className="relateive flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    or
                  </span>
                </div>
              </div>
              {isSeller ? (
                <Button
                  onClick={continueAsBuyer}
                  variant="secondary"
                  disabled={isLoading}
                >
                  Continue as a Customer
                </Button>
              ) : (
                <Button
                  onClick={continueAsSeller}
                  variant="secondary"
                  disabled={isLoading}
                >
                  Continue as a Seller
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
