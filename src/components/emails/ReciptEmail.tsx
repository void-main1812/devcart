import { Product } from "../../payload-type";

interface ReciptEmailProps {
  email: string;
  date: Date;
  orderId: string;
  products: Product[];
}

export const ReciptEmail = ({
  email,
  date,
  orderId,
  products,
}: ReciptEmailProps) => {

    const total = products.reduce((acc, curr) => acc+curr.price, 0) + 150;

    return (
        <></>
    )
};
