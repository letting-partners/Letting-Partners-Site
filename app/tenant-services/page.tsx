import type { Metadata } from "next";
import { SERVICE_GROUPS } from "@/lib/services";
import ServiceLandingPage from "@/components/ServiceLandingPage";

const group = SERVICE_GROUPS.find((g) => g.href === "/tenant-services")!;

export const metadata: Metadata = {
  title: "Tenant Services | Letting Partners",
  description:
    "Tenant services from Letting Partners — register as a tenant, explore student accommodation, and access our comprehensive tenant guide for London and Birmingham rentals.",
  keywords: ["tenant services London", "register as tenant London", "renting guide London", "student accommodation London"],
};

export default function TenantServicesPage() {
  return <ServiceLandingPage group={group} />;
}
