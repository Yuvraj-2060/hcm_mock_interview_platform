"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link"


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-in' ? z.string().min(3) : z.string().optional(),
    email: z.email(),
    password: z.string().min(3),
  })
}

const Authform = ({type} : {type:FormType}) => {
  
  // 1. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-141.5">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Prepwise</h2>
        </div>

        <h3>Practice job interview with AI.</h3>

         <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn &&
              <p>Name</p>
            }
            <p>Email</p>
            <p>Password</p>

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
            <p className="text center">
               {isSignIn ? "No account yet?" : "Have an account already?"}
               <Link
                 href={!isSignIn? '/sign-in' : '/sign-up'} 
                 className="font-bold text-user-primary ml-1">
                  {!isSignIn ? "Sign in" : "SIgn up"}
               </Link>

            </p>
      </div>
    </div>
  )
}

export default Authform