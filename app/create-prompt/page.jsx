"use client"

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from '@/components/Form'

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({prompt: '', tag: ''});

    const router = useRouter();
    const { data: session } = useSession();

    if(!session) {
        return(
            <div className="flex flex-col items-center justify-center py-2">
                <h1 className="text-2xl font-bold">You are not signed in.</h1>
                <button onClick={() => signIn()} className="outline_btn">Sign In</button>
            </div>
        )
    }

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body:   JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }

    return(
        <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
    )
};

export default CreatePrompt;
