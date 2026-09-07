"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LPIcon from "@/components/LPIcon";

/**
 * Chat about a property.
 *
 * Messages go to the Letting Partners portal, where they land in the customer
 * inbox of the agent who published the listing. The visitor's thread is
 * identified by a token kept in this browser, so they can come back to the
 * conversation later.
 */

const TOKEN_KEY = "lp_chat_visitor_token";
const POLL_INTERVAL_MS = 8000;

type Message = {
  id: string;
  sender: "VISITOR" | "STAFF" | "SYSTEM";
  senderName: string | null;
  body: string;
  createdAt: string;
};

function readToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Blocked storage just means the thread will not resume on a return visit.
  }
}

export default function PropertyChat({
  propertyId,
  propertyTitle,
  agentName,
}: {
  propertyId: string;
  propertyTitle: string;
  agentName?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const loadThread = useCallback(async () => {
    const token = readToken();
    if (!token) return;

    try {
      const response = await fetch(`/api/website/chat?visitorToken=${encodeURIComponent(token)}`);
      const payload = await response.json();
      if (payload?.ok && payload.thread) {
        setMessages(payload.thread.messages ?? []);
        setStarted(true);
      }
    } catch {
      // Offline or blocked: the composer still works and will retry on send.
    }
  }, []);

  useEffect(() => {
    if (open) void loadThread();
  }, [open, loadThread]);

  // Poll for replies only while the panel is open.
  useEffect(() => {
    if (!open || !started) return;
    const interval = setInterval(() => void loadThread(), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [open, started, loadThread]);

  useEffect(() => {
    const element = messagesRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  async function send() {
    if (!body.trim()) return;
    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/website/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          visitorToken: readToken(),
          propertyId: started ? null : propertyId,
          name: started ? null : name || null,
          email: started ? null : email || null,
          phone: started ? null : phone || null,
          message: body,
        }),
      });

      const payload = await response.json();

      if (!payload?.ok) {
        setError(payload?.error ?? "We could not send that message. Please try again.");
        return;
      }

      if (payload.visitorToken) writeToken(payload.visitorToken);
      setBody("");
      setStarted(true);
      await loadThread();
    } catch {
      setError("We could not reach the messaging service. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button type="button" className="lp-btn lp-btn--gold" onClick={() => setOpen(true)}>
        <LPIcon name="mail" size={18} />
        Chat about this property
      </button>

      {open && (
        <div
          className="lp-chat-scrim"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            className="lp-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Chat about ${propertyTitle}`}
          >
            <header className="lp-chat-header">
              <div>
                <strong>Chat about this property</strong>
                <p>{agentName ? `${agentName} will reply` : "A member of our team will reply"}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
                <LPIcon name="x" size={18} />
              </button>
            </header>

            <div className="lp-chat-body" ref={messagesRef}>
              {messages.length === 0 && (
                <p className="lp-chat-intro">
                  Ask us anything about {propertyTitle}. We usually reply the same working day.
                </p>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sender === "VISITOR"
                      ? "lp-chat-bubble lp-chat-bubble--out"
                      : "lp-chat-bubble lp-chat-bubble--in"
                  }
                >
                  {message.sender === "STAFF" && message.senderName && (
                    <span className="lp-chat-author">{message.senderName}</span>
                  )}
                  {message.body}
                </div>
              ))}
            </div>

            {!started && (
              <div className="lp-chat-lead">
                <input
                  className="lp-form-input"
                  placeholder="Your name"
                  value={name}
                  aria-label="Your name"
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  className="lp-form-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  aria-label="Your email address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className="lp-form-input"
                  placeholder="Phone (optional)"
                  value={phone}
                  aria-label="Your phone number"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            )}

            {error && (
              <p className="lp-chat-error" role="alert">
                {error}
              </p>
            )}

            <div className="lp-chat-composer">
              <textarea
                className="lp-form-input"
                rows={2}
                placeholder="Write your message..."
                aria-label="Your message"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") void send();
                }}
              />
              <button
                type="button"
                className="lp-btn lp-btn--gold lp-btn--sm"
                onClick={() => void send()}
                disabled={sending || !body.trim()}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>

            <p className="lp-chat-privacy">
              We use your details only to reply to this enquiry. See our{" "}
              <a href="/privacy-policy">privacy policy</a>.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
