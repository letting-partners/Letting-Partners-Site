import type { Metadata } from "next";
import { SERVICE_GROUPS } from "@/lib/services";
import ServiceLandingPage from "@/components/ServiceLandingPage";

const group = SERVICE_GROUPS.find((g) => g.href === "/specialist-legal-support")!;

export const metadata: Metadata = {
  title: "Specialist Legal Support | Letting Partners",
  description:
    "Access SRA-regulated legal specialists for tenancy disputes, Section 8 and 21 notices, rent arrears, and possession proceedings with Letting Partners.",
  keywords: [
    "specialist legal support landlords London",
    "Section 8 notice London",
    "Section 21 notice London",
    "rent arrears recovery London",
    "tenancy dispute solicitor",
  ],
};

export default function SpecialistLegalSupportPage() {
  return <ServiceLandingPage group={group} />;
}
