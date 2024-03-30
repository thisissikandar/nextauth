"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logOut = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data.data);
    setData(response.data.data._id);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <h1>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h1>
      <hr />
      <p>Profile Page</p>
      <button onClick={logOut}>Logout</button>
      <button onClick={getUserDetails}>getuser</button>
    </div>
  );
};

export default ProfilePage;
