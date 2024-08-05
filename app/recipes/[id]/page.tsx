import Recipe from "@/components/Recipe";

export default function Page({ params }: { params: { id: string } }) {


  return (<div>
    Recipe by ID: {params.id}

    <Recipe 
      id={params.id}
    />

  </div>)
}