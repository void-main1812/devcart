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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const [isClient, setIsClient] = useState(false);

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

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({});

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      {isClient && (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 max-w-3xl">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Icons.logo className="h-20 w-20 rounded-xl shadow-xl shadow-black/25" />
              <h1 className="text-2xl font-bold">Create an Account</h1>

              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "link",
                  className: "text-muted-foreground gap-1.5",
                })}
              >
                Already have an account? Sign-in
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
                    {
                      //@ts-ignore
                      errors?.email?.message && (
                        <p className="text-sm text-red-500 ">
                          {errors?.email?.message}
                        </p>
                      )
                    }
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
                    {
                      //@ts-ignore
                      errors?.password?.message && (
                        <p className="text-sm text-red-500 ">
                          {errors?.password?.message}
                        </p>
                      )
                    }
                  </div>
                  <Button>Sign Up</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
