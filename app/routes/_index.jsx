import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

// only on the server
export async function loader() {
  return json({
    message: 'Hello World from server',
  });
}

// only on the client - can interact with server data
export default function Index() {
  // eslint-disable-next-line prettier/prettier
    const { message } = useLoaderData();
  return (
    <div>
      <h1>{message}</h1>
      <p>Welcome to the new hydrogen test store</p>
    </div>
  );
}
