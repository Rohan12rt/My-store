'use client'
import { Product } from "@/types";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import z from "zod";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { productDefaultValues } from "@/lib/constants";
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";


const ProductForm = ({ type, product, productId }: {
    type: 'Create' | 'Update';
    product?: Product;
    productId?: string
}) => {

    const router = useRouter();

    type ProductFormValues = z.infer<typeof insertProductSchema> | z.infer<typeof updateProductSchema>;

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(type === 'Update' ? updateProductSchema : insertProductSchema),
        defaultValues: (type === 'Update' && product) ? product : productDefaultValues
    });

    const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (values) => {
        if (type === 'Create') {
            const res = await createProduct(values);
            if (!res.success) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
            }
            router.push('/admin/products');
        }

        //    on Update
        if (type === 'Update') {
            if (!productId) {
                router.push('/admin/products');
                return;
            }

            const res = await updateProduct({ ...values, id: productId });
            if (!res.success) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
            }
            router.push('/admin/products');
        }
    }

    const images = form.watch('images');
    const isFeatured = form.watch('isFeatured');
    const banner = form.watch('banner');


    return <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=' flex flex-col md:flex-row gap-5 items-start flex-initial'>
                {/* name */}
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }: {
                        field: ControllerRenderProps<z.infer<
                            typeof insertProductSchema>, 'name'>
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel> Name </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* slug */}
                <FormField
                    control={form.control}
                    name='slug'
                    render={({ field }: {
                        field: ControllerRenderProps<z.infer<
                            typeof insertProductSchema>, 'slug'>
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel> Slug </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input placeholder="Enter slug" {...field} />
                                    <Button
                                        type="button"
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                                        onClick={() => {
                                            form.setValue(
                                                'slug',
                                                slugify(form.getValues('name'), { lower: true })
                                            );
                                        }}
                                    >
                                        Generate
                                    </Button>
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                {/* Category */}
                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }: {
                        field: ControllerRenderProps<z.infer<
                            typeof insertProductSchema>, 'category'>
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel> Category </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter category" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* brand */}
                <FormField
                    control={form.control}
                    name='brand'
                    render={({ field }: {
                        field: ControllerRenderProps<z.infer<
                            typeof insertProductSchema>, 'brand'>
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel> Brand </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter brand"
                                    {...field}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                {/* price */}
                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }: {
                        field: ControllerRenderProps<z.infer<
                            typeof insertProductSchema>, 'price'>
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel> Price </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter price" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* stock */}
                <FormField
                    control={form.control}
                    name='stock'
                    render={({ field }: {
                        field: ControllerRenderProps<z.infer<
                            typeof insertProductSchema>, 'stock'>
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel> Stock </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter stock" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className=' upload-field flex flex-col md:flex-row gap-5'>
                {/* images */}
                <FormField
                    control={form.control}
                    name='images'
                    render={() => (
                        <FormItem className='w-full'>
                            <FormLabel>Images</FormLabel>
                            <Card>
                                <CardContent className='space-y-2 mt-2 min-h-48'>
                                    <div className='flex-start space-x-2'>
                                        <div className="flex flex-wrap gap-2">
                                            {images.map((image: string, index: number) => (
                                                <div key={index} className="relative group">
                                                    <Image
                                                        src={image}
                                                        alt={`product image ${index + 1}`}
                                                        className="w-20 h-20 object-cover object-center rounded-sm"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newImages = images.filter((_, i) => i !== index);
                                                            form.setValue('images', newImages, { shouldValidate: true });
                                                        }}
                                                        className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <FormControl>
                                            <UploadButton
                                                endpoint='imageUploader'
                                                onClientUploadComplete={(res: { url: string }[]) => {
                                                    form.setValue('images', [...images, res[0].url]);
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error(`ERROR! ${error.message}`)
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </CardContent>
                            </Card>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="upload-field">
                {/* isFeatured */}
                Featured Product
                <Card>
                    <CardContent className="space-y-2 mt-2">
                        <FormField
                            control={form.control}
                            name='isFeatured'
                            render={({ field }) => (
                                <FormItem className='space-x-2 items-center'>
                                    <FormControl>
                                        <Checkbox
                                            className="border-2 border-gray-500 data-[state=checked]:bg-gray-800"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>Is Featured?</FormLabel>
                                </FormItem>
                            )}
                        />
                        {isFeatured && (
                            <>
                                {banner && typeof banner === 'string' ? (
                                    <div className="relative group w-full">
                                        <Image
                                            src={banner}
                                            alt="banner image"
                                            className="w-full object-cover object-center rounded-sm"
                                            width={1920}
                                            height={680}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                form.setValue('banner', '', { shouldValidate: true });
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                ) : (
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res: { url: string }[]) => {
                                            if (res && res[0]?.url) {
                                                form.setValue('banner', res[0].url);
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            toast.error(`ERROR! ${error.message}`);
                                        }}
                                    />
                                )}
                            </>
                        )}

                    </CardContent>
                </Card>
            </div>
            <div className="upload-field">
                <div>
                    {/* description */}
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }: {
                            field: ControllerRenderProps<z.infer<
                                typeof insertProductSchema>, 'description'>
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel> Description </FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter product description" className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="mt-4">
                    {/* Submit */}
                    <Button type="submit" size='lg'
                        disabled={form.formState.isSubmitting}
                        className="button col-span-2 w-full"
                    >
                        {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
                    </Button>
                </div>
            </div>
        </form>
    </Form>
}

export default ProductForm