"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard.jsx";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  //handleTagClick is a function that will be passed to PromptCardList
  //and then to PromptCard as a prop so that when the user clicks on a tag
  //it will filter the posts by that tag
  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoading) {
        try {
          const response = await fetch("/api/prompt");
          if (!response.ok) {
            console.error(`Fetch error: ${response.status} - ${response.statusText}`);
            // Optionally, log the response body for more details
            const responseBody = await response.text();
            console.error(`Response body: ${responseBody}`);
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
  }, [isLoading]);

  useEffect(() => {
    const filterPosts = posts.filter((post) => {
      return (
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText) ||
        post.creator.username.includes(searchText)
      );
    });
    setFilteredPosts(filterPosts);
  }, [searchText, session, posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <PromptCardList
          data={!searchText ? posts : filteredPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
