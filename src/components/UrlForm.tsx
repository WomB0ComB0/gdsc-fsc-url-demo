import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { urlShortener, TShortenerSchema } from '@/schema/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import ReCAPTCHA from 'react-google-recaptcha'
import { UrlFormContainer } from './UrlFormContainer';
import { db } from '@/core/firebase';
import { addDoc, collection, } from 'firebase/firestore';
import { toast } from 'sonner';
interface UrlShortenerProps {
  url: string;
  slug: string;
}

export const UrlForm: React.FC = () => {
  const defaultValues = {
    url: '',
    slug: '',
  };
  const [capVal, setCapVal] = useState<string | null>(null);
  const form = useForm<TShortenerSchema>({
    resolver: zodResolver(urlShortener), defaultValues,
  })
  const onSubmit = (data: UrlShortenerProps) => {
    if (capVal) {
      try {
        addDoc(collection(db, "urls"), data);
        if (form.formState.isSubmitSuccessful) {
          form.reset();
          setCapVal(null);
          toast.success(`URL shortened successfully!`);
        }
      } catch (error) {
        toast.error(`Error: ${error}!`);
      }
    }
  };


  return (
    <UrlFormContainer>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`
          flex flex-col items-center justify-center w-full h-full gap-2
          `}
        >
          <FormField
            control={form.control}
            name={`url`}
            render={({ field }) => (
              <FormItem className={`w-full mb-2`}>
                <FormControl className={`w-full`}>
                  <Input className={`w-full`} {...field} placeholder="Enter a url" type={`url`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`slug`}
            render={({ field }) => (
              <FormItem className={`w-full`}>
                <FormControl className={`w-full`}>
                  <Input className={`w-full`} {...field} placeholder="Enter your slug" type={`text`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ReCAPTCHA
            className={`w-full flex items-center justify-center rounded-md h-fit mt-6`}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(val: string | null) => { setCapVal(val) }}
          />
          <Button
            disabled={!capVal && form.formState.isSubmitting}
            className={`w-full`}
            type={`submit`}
          >
            Shorten
          </Button>
        </form>
      </Form>
    </UrlFormContainer>
  )
}
