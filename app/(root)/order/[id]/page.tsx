import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { shippingAddress } from "@/types";


export const metadata:Metadata = {
    title:'order-details'
}

const orderDeatilsPage = async (props:{
    params:Promise<{
        id: string
    }>
}) => {

    const { id } = await props.params;
    const order = await getOrderById(id);
    if(!order) notFound();


    return <OrderDetailsTable order={{
        ...order,
        shippingAddress: order.shippingAddress as shippingAddress,
    }} 
    PaypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
    />;
}
 
export default orderDeatilsPage;