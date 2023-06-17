import { data } from "@/data/product";
import { Product } from "../../../../../types/product";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  const delay = searchParams.get("delay");
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)));
  }

  const id = searchParams.get("id");
  if (id) {
    let product = data.find((product) => product.id === id);

    const fields = searchParams.get("fields");
    if (product && fields) {
      product = fields.split(",").reduce((acc, field) => {
        // @ts-ignore
        acc[field] = product[field];

        return acc;
      }, {} as Product);
    }

    return new Response(JSON.stringify(product ?? null), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const filter = searchParams.get("filter");
  const products = filter
    ? data.filter((product) => product.id !== filter)
    : data;

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
