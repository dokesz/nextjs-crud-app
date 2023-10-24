"use client"

import React from "react";

const SessionCheck = () => {
    const { data: session } = useSession();
  
    if (!session) {
      return (
        <p className="flex text-center text-red-800 italic">
          Note: If you sign-in, the app will store your email, name and profile
          picture
        </p>
      );
    }
  
    return null;
  };

  export default SessionCheck;
