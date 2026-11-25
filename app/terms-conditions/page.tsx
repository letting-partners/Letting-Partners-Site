import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Terms & Conditions | Letting Partners",
  description:
    "Letting Partners terms and conditions — the terms governing use of our website and services, including our trading names and how payments are handled.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <>
      <section className="lp-page-hero">
        <Image
          src={PAGE_BANNER_IMAGES.landlordGuide}
          alt="Terms and Conditions"
          fill
          priority
          sizes="100vw"
          className="lp-cover-img"
        />
        <div className="lp-image-overlay" />
        <div className="lp-container lp-page-hero-content">
          <span className="lp-kicker lp-kicker--light">Legal</span>
          <h1>Terms &amp; Conditions</h1>
          <p>The terms governing use of our website and services.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container" style={{ maxWidth: 800 }}>
          <p className="lp-text-muted" style={{ marginBottom: "2rem" }}>Last updated: 3 September 2026</p>

          <div className="lp-prose">
            <h2>1. About Us and These Terms</h2>
            <p>1.1 This website is operated by <strong>Letting Partners LTD</strong>, a private company limited by shares incorporated in England and Wales under company registration number 17436005 (&ldquo;Letting Partners LTD&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).</p>
            <p>1.2 These terms and conditions (the &ldquo;Terms&rdquo;) govern your access to and use of this website and, where they apply, the provision of our services. By accessing or continuing to use this website, you confirm that you accept these Terms and agree to be bound by them. If you do not accept these Terms, you must stop using this website.</p>
            <p>1.3 These Terms are supplemental to, and do not replace, any separate written agreement between you and Letting Partners LTD (for example terms of business, a management agreement, a tenancy agreement or any other service agreement). Where there is a conflict between these Terms and such a signed agreement, the signed agreement prevails in respect of the services it covers.</p>
            <p>1.4 Nothing in these Terms affects your statutory rights, including your rights as a consumer where you deal with us as a consumer.</p>

            <h2>2. Trading Names</h2>
            <p>2.1 Letting Partners LTD carries on business under the following trading names:</p>
            <ul>
              <li><strong>Letting Partners</strong></li>
              <li><strong>More Ways Hub</strong></li>
            </ul>
            <p>2.2 Both of the above are trading names only. They are not separate legal entities, they are not separate companies, and they have no legal personality of their own. In every case the contracting party is Letting Partners LTD.</p>
            <p>2.3 References on this website, in these Terms, and in any correspondence, quotation, invoice, agreement, notice, receipt or other document issued under either trading name to &ldquo;Letting Partners&rdquo;, &ldquo;More Ways Hub&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; are references to Letting Partners LTD unless expressly stated otherwise.</p>
            <p>2.4 Any right, obligation or liability arising under a document issued under either trading name is a right, obligation or liability of Letting Partners LTD, and may be enforced by or against Letting Partners LTD accordingly.</p>

            <h2>3. Definitions</h2>
            <p>3.1 In these Terms, unless the context requires otherwise:</p>
            <ul>
              <li>&ldquo;<strong>Content</strong>&rdquo; means all material published on this website, including text, images, graphics, video, design, layout, property particulars, guides and articles;</li>
              <li>&ldquo;<strong>Services</strong>&rdquo; means the property letting, property management, tenant, legal support coordination, maintenance, mortgage consultancy, development support and related services offered by Letting Partners LTD;</li>
              <li>&ldquo;<strong>Service Agreement</strong>&rdquo; means any written agreement, terms of business, instruction or engagement under which we provide Services to you;</li>
              <li>&ldquo;<strong>you</strong>&rdquo; means the person accessing or using this website, or to whom we provide or offer to provide Services.</li>
            </ul>

            <h2>4. Changes to These Terms</h2>
            <p>4.1 We may revise these Terms at any time by amending this page. The version published on this page at the time you access the website is the version that applies to that use.</p>
            <p>4.2 The date on which these Terms were last revised is shown at the top of this page. We recommend that you review this page periodically.</p>
            <p>4.3 If any provision of these Terms is held to be invalid, unlawful or unenforceable, that provision shall be severed to the minimum extent necessary and the remaining provisions shall continue in full force and effect.</p>

            <h2>5. Use of the Website</h2>
            <p>5.1 You may use this website for lawful purposes only, and in accordance with these Terms.</p>
            <p>5.2 You must not:</p>
            <ul>
              <li>use this website in any way that breaches any applicable local, national or international law or regulation;</li>
              <li>use this website for any unlawful, fraudulent or harmful purpose, or in connection with any unlawful, fraudulent or harmful activity;</li>
              <li>submit false, misleading or impersonating information through any form on this website;</li>
              <li>attempt to gain unauthorised access to this website, the server on which it is stored, or any server, computer or database connected to it;</li>
              <li>introduce any virus, trojan, worm, logic bomb or other material that is malicious or technologically harmful;</li>
              <li>copy, scrape, harvest or systematically extract Content from this website, or use it to build or populate any database, listing or competing service.</li>
            </ul>
            <p>5.3 We may suspend, withdraw, discontinue or change all or any part of this website without notice, and we do not guarantee that this website, or any Content on it, will always be available or uninterrupted.</p>

            <h2>6. Our Services and the Information on This Website</h2>
            <p>6.1 Letting Partners LTD provides property letting and management services, together with tenant services, legal support coordination, maintenance, mortgage consultancy and related services, as described on this website. The Services actually to be provided to you, and their scope, are those set out in your Service Agreement.</p>
            <p>6.2 The Content on this website, including guides, articles, area information and property particulars, is provided for general information only. It does not constitute legal, financial, tax, mortgage, investment or other professional advice, and must not be relied upon as such. You should obtain independent professional advice before making any property-related decision.</p>
            <p>6.3 Property particulars published on this website do not constitute an offer and do not form part of any contract. Measurements, descriptions, floor plans and images are indicative only, and availability, rent and terms are subject to change and to contract.</p>
            <p>6.4 Where we refer you to, or coordinate the involvement of, a third-party professional or supplier (for example a solicitor, barrister, surveyor, contractor or mortgage adviser), that person is engaged under their own separate terms. We are not responsible for the advice, work or conduct of that third party, and our role is limited to coordination unless your Service Agreement states otherwise.</p>

            <h2>7. Fees, Charges and Payment</h2>
            <p>7.1 The fees, charges and commissions payable for our Services are set out in your Service Agreement, or in a written quotation or invoice issued to you. We will make any sum payable clear to you in writing before you become committed to it.</p>
            <p>7.2 All sums are stated and payable in pounds sterling (GBP) unless we agree otherwise in writing. Where value added tax is applicable, it will be shown separately on the relevant invoice.</p>
            <p>7.3 Payment is due by the date stated in the relevant Service Agreement, invoice or written payment instruction.</p>
            <p>7.4 Payments that may be required from tenants in England are restricted by the Tenant Fees Act 2019. We will only request payments from tenants that are permitted under that Act, and any permitted payment will be set out in writing before you commit to it.</p>
            <p>7.5 This website does not process payments. No payment can be made through this website, and payment card details must never be submitted through any form on this website or sent to us by email.</p>

            <h2>8. Payment Handling</h2>
            <p>8.1 Payments in connection with our Services are handled by <strong>Musa Limited</strong>.</p>
            <p>8.2 The payment instructions that apply to you — including the account details, payment reference, payment method and due date to be used — will be provided to you in writing by us or by Musa Limited at the time the payment becomes due. You must make payment only in accordance with those written instructions.</p>
            <p>8.3 A payment made in accordance with the written payment instructions issued to you discharges your payment obligation to Letting Partners LTD to the extent of the sum received, and will be recorded and credited to your account with us.</p>
            <p>8.4 Letting Partners LTD remains the contracting party for the Services and remains responsible to you for their performance. The handling of payments by Musa Limited does not transfer, vary, limit or exclude any obligation or liability of Letting Partners LTD owed to you, and does not create any contractual relationship between you and Musa Limited in respect of the Services.</p>
            <p>8.5 We maintain records of sums invoiced and payments received, and will on request provide you with a receipt or a statement of your account.</p>
            <p>8.6 <strong>Payment fraud warning.</strong> We will never ask you to send funds to an account other than the one set out in the written payment instructions we have issued to you. If you receive payment details that differ from those instructions, or any request to change them, do not act on them. Verify the details with us by telephone on <a href="tel:02038977033">0203 897 7033</a> before making any payment.</p>
            <p>8.7 Any query, dispute or request for a refund relating to a payment should be raised with us at <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a>. Refunds and the reconciliation of sums held will be dealt with in accordance with your Service Agreement and applicable law.</p>
            <p>8.8 How personal data is handled in connection with payments is explained in our <Link href="/privacy-policy">Privacy Policy</Link>.</p>

            <h2>9. Deposits</h2>
            <p>9.1 Where a tenancy deposit is taken in connection with an assured shorthold tenancy, it will be protected in a Government-authorised tenancy deposit scheme and the prescribed information provided, in accordance with the Housing Act 2004.</p>
            <p>9.2 The amount of any tenancy deposit, and of any holding deposit, is limited by the Tenant Fees Act 2019, and any such deposit will be dealt with in accordance with that Act.</p>

            <h2>10. Intellectual Property</h2>
            <p>10.1 All Content on this website, together with the trade marks, trading names, logos and branding used on it, is owned by Letting Partners LTD or its licensors and is protected by copyright and other intellectual property rights.</p>
            <p>10.2 You may view, download and print Content from this website for your own personal or internal business use in connection with our Services. You may not otherwise reproduce, republish, distribute, adapt, sell, licence or exploit any Content without our prior written consent.</p>
            <p>10.3 The trading names &ldquo;Letting Partners&rdquo; and &ldquo;More Ways Hub&rdquo; are used by Letting Partners LTD. No right or licence to use either name, or any associated logo, is granted to you by these Terms.</p>

            <h2>11. Third-Party Websites and Links</h2>
            <p>11.1 This website may contain links to third-party websites, portals and resources. Those links are provided for your convenience only.</p>
            <p>11.2 We have no control over the content, practices or availability of third-party websites, we do not endorse them, and we accept no responsibility for any loss or damage arising from your use of them. Your use of a third-party website is governed by that website&rsquo;s own terms and privacy policy.</p>

            <h2>12. Limitation of Liability</h2>
            <p>12.1 Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded or limited.</p>
            <p>12.2 Subject to clause 12.1, this website and its Content are provided on an &ldquo;as is&rdquo; basis. We give no warranty, representation or undertaking that the Content is accurate, complete, current or free from error, and we exclude all implied warranties and conditions to the fullest extent permitted by law.</p>
            <p>12.3 Subject to clause 12.1, we shall not be liable to you for any loss of profit, loss of business, loss of revenue, loss of anticipated savings, loss of data, loss of goodwill, or any indirect or consequential loss arising out of or in connection with your use of this website or your reliance on any Content.</p>
            <p>12.4 Our liability in connection with the Services is as set out in your Service Agreement. In the absence of such a provision, and subject to clause 12.1, our total liability arising out of or in connection with the Services shall not exceed the total fees paid by you to us for the Services in the twelve months preceding the event giving rise to the claim.</p>
            <p>12.5 We shall not be liable for any failure or delay in performing our obligations where that failure or delay results from an event beyond our reasonable control.</p>

            <h2>13. Data Protection</h2>
            <p>13.1 Letting Partners LTD is the data controller for personal data processed in connection with this website and our Services, including personal data collected under either of our trading names.</p>
            <p>13.2 Our <Link href="/privacy-policy">Privacy Policy</Link> explains what personal data we collect, the purposes and lawful bases for processing it, who we share it with, how long we keep it, and your rights under the UK GDPR and the Data Protection Act 2018. By using this website you acknowledge that you have read our Privacy Policy.</p>

            <h2>14. Complaints Procedure</h2>
            <p>14.1 If you wish to make a complaint, please write to us at <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a>, setting out the nature of your complaint and what you would like us to do to put matters right.</p>
            <p>14.2 We will acknowledge receipt of your complaint within 3 working days and issue a formal written response within 15 working days of that acknowledgement. If more time is needed, we will tell you why and when you can expect our response.</p>
            <p>14.3 Complaints about a payment, including the amount requested, the method of payment or the handling of a payment, should be raised with us under this clause and not with any third party.</p>

            <h2>15. General</h2>
            <p>15.1 Our failure or delay in enforcing any provision of these Terms is not a waiver of that provision or of any other provision.</p>
            <p>15.2 You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign or transfer our rights and obligations, provided that doing so does not adversely affect your rights.</p>
            <p>15.3 A person who is not a party to these Terms has no right under the Contracts (Rights of Third Parties) Act 1999 to enforce any of their provisions.</p>
            <p>15.4 These Terms, together with any applicable Service Agreement and our Privacy Policy, constitute the entire agreement between you and us in relation to their subject matter.</p>

            <h2>16. Governing Law and Jurisdiction</h2>
            <p>16.1 These Terms, their subject matter and their formation are governed by the law of England and Wales.</p>
            <p>16.2 The courts of England and Wales have exclusive jurisdiction over any dispute or claim arising out of or in connection with these Terms, save that if you are a consumer resident elsewhere in the United Kingdom you may also bring proceedings in the courts of the part of the United Kingdom in which you reside.</p>

            <h2>17. Contact Us</h2>
            <p>17.1 For any question about these Terms, or about our Services, please contact us at <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a> or call <a href="tel:02038977033">0203 897 7033</a>.</p>
            <p>17.2 Our details are as follows:</p>
            <ul>
              <li><strong>Company name:</strong> Letting Partners LTD</li>
              <li><strong>Trading names:</strong> Letting Partners; More Ways Hub</li>
              <li><strong>Registered in:</strong> England and Wales</li>
              <li><strong>Company registration number:</strong> 17436005</li>
              <li><strong>Payments handled by:</strong> Musa Limited</li>
              <li><strong>Email:</strong> <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a></li>
              <li><strong>Telephone:</strong> <a href="tel:02038977033">0203 897 7033</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
