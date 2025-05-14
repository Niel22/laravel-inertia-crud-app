import { useForm } from "@inertiajs/react";

export default function({post}){

    const {data, setData, patch, errors, processing} = useForm({
        body: post.body
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/posts/${post.id}`);
    }
    
    return (
        <>
            <h1 className="title">Update Post</h1>

            <div className="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <textarea rows="10" value={data.body} onChange={(e) => {setData('body', e.target.value)}} className={errors.body && `ring-red-600`}></textarea>
                    {errors.body && <span className="text-sm text-red-600">{errors.body}</span>}

                    <button disabled={processing} className="primary-btn mt-4">{processing ? "Updating Post" : "Update Post"}</button>
                </form>
            </div>
        </>
    )
}