import Recipe from "@/components/Recipe";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <Recipe 
      id={params.id}
    />
  )
}