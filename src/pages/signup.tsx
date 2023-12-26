import { Field, Form, Formik, type FieldProps } from "formik";
import { motion } from "framer-motion";
import { ExternalLinkIcon, LucideArrowLeft } from "lucide-react";
import { type GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";
import { toFormikValidationSchema } from "zod-formik-adapter";

import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SignUpSchema } from "@/utils/ValidationSchema";
import { api } from "@/utils/api";

/**
 * SignInPage Component
 *
 * This component represents the Sign-up page of the BlueBird Movie App.
 *
 * @returns {React.Component} - The rendered SignInPage component.
 */
export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Mutation for signup API
  const mutation = api.authentication.signup.useMutation({
    onError(error) {
      // Display error toast on mutation error
      toast({
        variant: "destructive",
        title: error.message || "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
    onSuccess: async () => {
      // Display success toast on successful signup and redirect to signin page
      toast({ title: "Account created successfully!" });
      await router.push("/signin").catch((err) => console.log(err));
    },
  });

  /**
   * Handle OAuth Sign-in
   *
   * @param {string} provider - OAuth provider (e.g., "github").
   */
  async function handelOauthSignin(provider: string) {
    await signIn(provider);
  }

  return (
    <>
      <Head>
        <title>BlueBird Movie App | Sign-up</title>
      </Head>
      <section className="bg-neutral-100 dark:bg-neutral-900">
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <motion.div className="flex items-center  gap-5" layoutId="header">
            <Link
              href="/"
              className="flex items-center gap-5 rounded-full border-neutral-400 p-2 transition duration-200 ease-in-out hover:bg-neutral-500/20 "
            >
              {/* <LucideArrowLeft className="text-2xl" /> */}
            </Link>
            <div className="my-10  flex flex-col items-center ">
              <p className="text-3xl">BlueBird Movie App</p>
              <Link
                href={"https://github.com/M-YasirGhaffar/sc-project-bluebird.git"}
                className={
                  "text-md flex items-center py-2 pl-3 pr-4 underline-offset-2  hover:underline "
                }
                target="_blank"
                aria-current="page"
              >
                Github Repo
                <ExternalLinkIcon className="ml-1 inline h-4 w-4" />
              </Link>
            </div>{" "}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-full rounded-xl bg-white shadow-lg dark:border dark:border-neutral-700 dark:bg-neutral-800 sm:max-w-md md:mt-0 xl:p-0"
          >
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-medium leading-tight tracking-tight text-neutral-900 dark:text-white md:text-2xl">
                Create new account
              </h1>
              {/* Formik form for signup */}
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={toFormikValidationSchema(SignUpSchema)}
                onSubmit={(values) => {
                  // Call the signup mutation on form submission
                  mutation.mutate(values);
                }}
              >
                <Form className="space-y-4 md:space-y-6" action="#">
                  {/* Form field for name */}
                  <Field name="name">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                        >
                          Your name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5  text-neutral-900 focus:border-black focus:ring-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                          placeholder="Full name"
                          required
                          {...field}
                        />
                        {/* Display error message if there is an error */}
                        {meta.touched && meta.error && (
                          <p className="ml-2 mt-2 text-sm text-red-500">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                  {/* Form field for email */}
                  <Field name="email">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5  text-neutral-900 focus:border-black focus:ring-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                          placeholder="name@company.com"
                          required
                          {...field}
                        />
                        {/* Display error message if there is an error */}
                        {meta.touched && meta.error && (
                          <p className="ml-2 mt-2 text-sm text-red-500">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                  {/* Password input field */}
                  <PasswordInput />
                  {/* Signup button */}
                  <Button
                    type="submit"
                    className="text-md w-full"
                    size="lg"
                    isLoading={mutation.isLoading}
                    loadingText="Signing up..."
                  >
                    Sign up
                  </Button>
                  {/* OAuth signup with Github button */}
                  <div className="flex flex-col items-center gap-2 md:flex-row">
                    <Button
                      onClick={() => {
                        void handelOauthSignin("github");
                      }}
                      variant="outline"
                      className="text-md flex w-full items-center justify-center gap-4"
                      size="lg"
                      LeftIcon={FaGithub}
                    >
                      Continue with Github
                    </Button>
                  </div>
                  {/* Signin link */}
                  <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                    Already have an account ?{" "}
                    <Link
                      href="/signin"
                      className="font-medium text-black hover:underline dark:text-blue-500"
                    >
                      Sign In
                    </Link>
                  </p>
                </Form>
              </Formik>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/**
 * Get Server Side Props Function
 *
 * This function is used to fetch server-side data for the SignInPage component.
 *
 * @param {GetServerSidePropsContext} context - The context object.
 * @returns {Object} - An object with props or redirect information.
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Check if the user is already signed in
  const session = await getSession(context);
  if (session) {
    // Redirect to the dashboard if already signed in
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  // Return the session props
  return {
    props: { session },
  };
}
