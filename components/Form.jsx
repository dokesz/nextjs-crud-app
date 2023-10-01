"use client";

import Link from "next/link";
import { useState } from "react";

import { UploadButton } from "@/utils/uploadthing";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUploadComplete = (res) => {
    // Do something with the response
    setPost({ ...post, image: res[0].url });
    console.log(res[0].url);
    setUploadComplete(true); // Set upload status to complete
  };

  const handleUploadError = (error) => {
    // Do something with the error.
    alert(`ERROR! ${error.message}`);
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your thoughts with the world, and let your imagination
        run wild.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Ai prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here"
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Image Upload
          </span>
          <UploadButton
            appearance={{
              button:
                "px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white",
              container:
                "w-max flex-row rounded-md p-1 border-cyan-300 bg-slate-800",
              allowedContent:
                "flex h-8 flex-col items-center justify-center px-2 text-white",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-md">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting || !uploadComplete}
            className="px-5 py-1.5 text-md bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
