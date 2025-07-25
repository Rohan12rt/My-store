"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/lib/validators";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DEFAULT_PAYMENT_METHODS, PAYMENT_METHODS } from "@/lib/constants";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Import, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { shippingAddressSchema } from "@/lib/validators";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";



const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHODS,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>)=>{
    startTransition(async()=>{
      const res = await updateUserPaymentMethod(values);
      if (!res.success) {
        toast.error(res.message);
        return;
  
      }
      router.push('/place-order');
    })
  }

  const router = useRouter();

  return (
    <>
      <div className="mx-w-md flex flex-col items-center justify-center space-y-4">
        <h1 className="h2-bold mt-4">Payment Method</h1>
        <p className="text-sm text-muted-forefround">
          Please select the payment method
        </p>
        <Form {...form}>
          <form
            method="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col  md:flex-row gap-5">
              <FormField
                 control={form.control}
                 name="type"
                 render={({field})=>(
                    <FormItem className="space-y-3 ">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} className="flex flex-col  space-y-2">
                           {PAYMENT_METHODS.map((paymentMethod=>(
                            <FormItem key={paymentMethod} className="flex items-center space-x-3 space-y-0">
                               <FormControl>
                                <RadioGroupItem value={paymentMethod} 
                                checked={field.value === paymentMethod}
                                />
                               </FormControl>
                               <FormLabel className="font-normal">
                                {paymentMethod}
                               </FormLabel>
                            </FormItem>
                           )))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                 )}
              />
            </div>
            
                  
            <div className="flex-gap-2">
            <Button type='submit' disabled={isPending}>
            {isPending ? (
                <Loader className="w-4 h-4 animate-spin"></Loader>
            ) : (
                <ArrowRight className="w-4 h-4" />
            )}{' '}
            Continue
            </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PaymentMethodForm;
