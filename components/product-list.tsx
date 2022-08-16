import useSWR from "swr";
import Item from "@components/item";
import { Product } from "@prisma/client";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  // ok: boolean;
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(
    `/api/users/me/${kind}`
  );

  return data ? (
    <>
      {data?.[kind].map((record) => (
        <Item
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          id={record.product.id}
          hearts={record.product._count.favs}
          image={record.product.image}
        />
      ))}
    </>
  ) : null;
}
