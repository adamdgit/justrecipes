import Recipe from "@/components/Recipe";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <div className='content-wrap'>
      <Recipe id={params.id} />
    </div>
  )
}