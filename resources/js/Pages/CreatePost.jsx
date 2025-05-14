import { useForm } from "@inertiajs/react"

export default function CreatePost(){

    const {data, setData, post, errors, processing} = useForm({
        body: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post('/posts');
    }

    return (
        <>
            <h1 className="title">Create A New Post</h1>

            <div className="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <textarea rows="10" value={data.body} onChange={(e) => {setData('body', e.target.value)}} className={errors.body && `ring-red-600`}></textarea>
                    {errors.body && <span className="text-sm text-red-600">{errors.body}</span>}

                    <button disabled={processing} className="primary-btn mt-4">{processing ? "Creating Post" : "Create Post"}</button>
                </form>
            </div>
        </>
    )
}