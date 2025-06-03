import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

// only on the server

export async function loader({context}) {
  const {storefront} = context;

  const PRODUCTS_QUERY = `#graphql
    query Products {
      products(first: 8) {
        nodes {
          id
          title
          handle
        }
      }
    }
  `;

  const {products} = await storefront.query(PRODUCTS_QUERY);

  return json({
    products: products?.nodes || [],
  });
}

// only on the client - can interact with server data
export default function Index() {
  // eslint-disable-next-line prettier/prettier
    const { products } = useLoaderData();
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <Link key={product.handle} to={`/products/${product.handle}`}>
          {product.title}
        </Link>
      ))}
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
 query AllProducts{
    products(first: 10) {
        nodes {
        title
        description
        id
        handle
      }
    }
 }
`;