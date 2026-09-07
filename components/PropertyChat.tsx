"use client";

import LPIcon from "@/components/LPIcon";
import { OPEN_CHAT_EVENT, type OpenChatDetail } from "@/components/SiteChat";

/**
 * The "chat about this property" button on a listing.
 *
 * The conversation itself lives in the site-wide widget; this only asks it to
 * open, carrying the property so the enquiry reaches the agent who published
 * it. Keeping one panel means a visitor cannot end up with two chat windows,
 * or two threads competing for the same visitor token.
 */

export default function PropertyChat({
  propertyId,
  propertyTitle,
  agentName,
}: {
  propertyId: string;
  propertyTitle: string;
  agentName?: string | null;
}) {
  function open() {
    const detail: OpenChatDetail = { propertyId, propertyTitle, agentName: agentName ?? null };
    window.dispatchEvent(new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail }));
  }

  return (
    <button type="button" className="lp-btn lp-btn--gold" onClick={open}>
      <LPIcon name="mail" size={18} />
      Chat about this property
    </button>
  );
}
