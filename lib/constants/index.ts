export const APP_NAME =  process.env.NEXT_PUBLIC_APP_NAME || 'Next.js App';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A Next.js application with TypeScript, Tailwind CSS, and more.';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues= {
    email:'test@test.com',
    password:'123456',
};

export const signUpDefaultValues= {
    name:'',
    email:'',
    password:'',
    confirmpassword:'',
};
  
export const shippingAddressDefaultValues = {
    fullName: 'Rohan',
    streetAddress: '8b Industrial area',
    city: 'Mohali',
    postalCode: '160055',
    country: 'India',
}

export const PAYMENT_METHODS =process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(', ') : ['PayPal', 'Stripe', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHODS=process.env.DEFAULT_PAYMENT_METHODS || 'PayPal'; 

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 6;