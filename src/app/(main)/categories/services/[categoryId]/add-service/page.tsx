"use client";

import { useParams } from "next/navigation";
import AddServiceForm from "@/components/AddService/AddServiceForm";

function AddNewServicePage() {
  const params = useParams();
  const categoryId = Number(params.categoryId);

  return (
    <main>
      <AddServiceForm categoryId={categoryId} />
    </main>
  );
}

export default AddNewServicePage;
