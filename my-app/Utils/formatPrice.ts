export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat
    ("en-US", {
        style: "currency",
        currency: "INR"
    }).format(amount)
};

export interface Props {
    [propName : string]: any;
}
