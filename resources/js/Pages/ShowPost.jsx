import { Link, useForm } from "@inertiajs/react"
import {useRoute} from '../../../vendor/tightenco/ziggy';

export default function ShowPost({post}){

    const {delete: destroy, processing} = useForm();
    const route = useRoute();

    const submit = (e) => {
        e.preventDefault();
        destroy(route('posts.destroy', post.id));
    }

    return (
        <>
            <div className="p-4 border-b">
                <div className="font-medium text-slate-500">
                    <span>Posted On: </span>
                    <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                </div>
                <p className="text-medium">{post.body}</p>

                <div className="flex items-center justify-end gap-2">
                    <form onSubmit={submit}>
                        <button disabled={processing} className="bg-red-500 rounded-md text-sm px-4 py-1 text-white">{processing ? "Deleting" : "Delete"}</button>
                    </form>
                    <Link href={route('posts.edit', post.id)} className="bg-green-500 rounded-md text-sm px-4 py-1 text-white">Edit</Link>
                </div>
            </div>
        </>
    )
}