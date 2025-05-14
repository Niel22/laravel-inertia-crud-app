import { Head, Link, usePage } from "@inertiajs/react";
import {useRoute} from '../../../vendor/tightenco/ziggy';
import { useEffect, useState } from "react";

export default function Home({posts}){
    const route = useRoute();
    const {flash} = usePage().props;
    const {component} = usePage();
    const [flashMessage, setFlashMessage] = useState(flash);

    useEffect(() => {
        if (flash.success) {
            const timeout = setTimeout(() => {
                setFlashMessage([]);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    return (
        <>
            <Head>
                <title>{component}</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
            </Head>

            <h1 className="title">My Blog Post</h1>

            {flashMessage.success &&  (
                <div className="absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white">{flashMessage.success}</div>
            )}

            {flashMessage.error &&  (
                <div className="absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white">{flashMessage.error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.data.map(post => (
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}
                        </p>
                        <Link
                            href={route('posts.show', post.id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                        Read more
                        <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                        </svg>
                    </Link>
                    </div>
                ))}
            </div>

            <div className="py-12 px-4">
                {posts.links.map(link => (
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 m-1 ${link.active ? "text-blue-500 font-bold" : ''}`}
                        />
                    ) : (
                    <span
                        key={link.label}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className="p-1 m-1 text-gray-500"
                    />
                    )
                ))}
            </div>
        </>
    )
}