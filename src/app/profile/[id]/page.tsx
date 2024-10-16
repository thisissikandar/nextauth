import React from "react";

export default function Userprofile({ params }: any) {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1>Profile </h1>
      <hr />
      <p className="text-4xl">
        profile Page
        <span className="p-2 rounded bg-orange-500">{params.id}</span>
      </p>
    </div>
  );
}
