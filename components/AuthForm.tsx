"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage(
        type === "sign-up"
          ? "Failed to create account. Please try again."
          : "Failed to sign in. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full p-8 md:p-32 lg:p-40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-6"
        >
          <h1 className="text-center font-semibold text-xl lg:2xl">
            {type === "sign-in"
              ? "Log in to your account"
              : "Create an account"}
          </h1>
          {type === "sign-up" && (
            <FormField
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="text-lg">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-12" disabled={isLoading}>
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p>* {errorMessage}</p>}
          <div className="flex justify-center space-x-4">
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-base font-medium animate-pulse"
            >
              {type === "sign-in" ? "Create an account" : "Login"}
            </Link>
          </div>
        </form>
      </Form>
      {accountId && (
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </div>
  );
};

export default AuthForm;
