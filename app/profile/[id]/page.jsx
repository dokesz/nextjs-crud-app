"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = ({ params }) => {
  const [posts, setPosts] = useState([]);

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    // fetch data from server
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={name + "'s"}
      desc={`Welcome to ${name + "'s"}  profile`}
      data={posts}
    />
  );
};

export default ProfilePage;
