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

            <div>
                {posts.data.map(post => (
                    <div key={post.id} className="p-4 border-b">
                        <div className="text-small text-slate-500">
                            <span>Posted On: </span>
                            <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                        </div>
                        <p className="font-medium">{post.body}</p>
                        <Link href={route('posts.show', post.id)} className="text-link">Read more ...</Link>
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