"use client";

import EditServiceForm from "@/components/AddService/EditServiceForm";
import { useParams } from "next/navigation";

function EditServicePage() {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const serviceId = Number(params.serviceId);

  return (
    <main>
      <EditServiceForm categoryId={categoryId} serviceId={serviceId} />
    </main>
  );
}

export default EditServicePage;
