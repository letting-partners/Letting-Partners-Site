import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Privacy Policy | Letting Partners",
  description:
    "Letting Partners privacy policy — how Letting Partners LTD collects, uses, shares and protects your personal information, including in connection with payments.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="lp-page-hero">
        <Image
          src={PAGE_BANNER_IMAGES.specialistLegal}
          alt="Privacy Policy"
          fill
          priority
          sizes="100vw"
          className="lp-cover-img"
        />
        <div className="lp-image-overlay" />
        <div className="lp-container lp-page-hero-content">
          <span className="lp-kicker lp-kicker--light">Legal</span>
          <h1>Privacy Policy</h1>
          <p>How we collect, use, and protect your personal information.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container" style={{ maxWidth: 800 }}>
          <p className="lp-text-muted" style={{ marginBottom: "2rem" }}>Last updated: 3 September 2026</p>

          <div className="lp-prose">
            <h2>1. Who We Are and Who Is Responsible for Your Data</h2>
            <p>1.1 This privacy policy is issued by <strong>Letting Partners LTD</strong>, a private company limited by shares incorporated in England and Wales under company registration number 17436005 (&ldquo;Letting Partners LTD&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). We are a property letting and management business operating across London and Birmingham.</p>
            <p>1.2 Letting Partners LTD carries on business under the following trading names:</p>
            <ul>
              <li><strong>Letting Partners</strong></li>
              <li><strong>More Ways Hub</strong></li>
            </ul>
            <p>1.3 These are trading names only and are not separate legal entities. Whichever of these names you deal with, the <strong>data controller</strong> for your personal data is Letting Partners LTD, and this policy applies in full.</p>
            <p>1.4 You can contact us about anything in this policy, including to exercise your rights, by email at <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a> or by telephone on <a href="tel:02038977033">0203 897 7033</a>.</p>
            <p>1.5 This policy explains how we collect, use, share, store and protect personal data, and sets out your rights under the UK General Data Protection Regulation (&ldquo;UK GDPR&rdquo;), the Data Protection Act 2018 and the Privacy and Electronic Communications Regulations 2003 (&ldquo;PECR&rdquo;).</p>

            <h2>2. Scope of This Policy</h2>
            <p>2.1 This policy applies to personal data we process through this website, through our enquiry, registration and support forms, by telephone, email and messaging, and in the course of providing our services.</p>
            <p>2.2 It applies to landlords, tenants, prospective landlords and tenants, guarantors, website visitors, suppliers, contractors and other individuals whose personal data we handle.</p>
            <p>2.3 It does not apply to third-party websites or services we link to, or to professionals you engage separately (for example a solicitor, surveyor or mortgage adviser), each of whom operates under their own privacy policy.</p>

            <h2>3. What Information We Collect</h2>
            <p>3.1 We may collect and process the following categories of personal data:</p>
            <ul>
              <li><strong>Identity and contact data</strong> — your name, email address, telephone number, correspondence address and, where relevant, date of birth and nationality.</li>
              <li><strong>Property and tenancy data</strong> — property addresses, ownership or occupancy details, property requirements and preferences, tenancy terms, inventories, condition reports, repair and maintenance history, and notices served or received.</li>
              <li><strong>Financial data</strong> — income and employment details, affordability information, rent and deposit amounts, invoices, payment references, payment and arrears history, and bank account details appearing on payments made to or by us.</li>
              <li><strong>Verification and compliance data</strong> — identity documents, right to rent documents, referencing and credit-check outcomes, guarantor details and landlord or employer references.</li>
              <li><strong>Correspondence data</strong> — the content of your enquiries, emails, letters, form submissions, website chat messages and call records or notes.</li>
              <li><strong>Technical and usage data</strong> — your IP address, device and browser type, operating system, the pages you view and how you move through the website.</li>
            </ul>
            <p>3.2 We do not collect or store full payment card details. See section 7 for how payments are handled.</p>
            <p>3.3 We do not seek special category data (such as data about health, religion or ethnicity) as a matter of course. Where such data is genuinely necessary — for example information about a health condition relevant to a property adaptation, a reasonable adjustment or a vulnerability — we will process it only where an appropriate lawful basis and an Article 9 condition apply, and normally only with your explicit consent.</p>
            <p>3.4 If you choose not to provide information we need in order to act for you, we may be unable to provide the service in question, and we will tell you if that is the case.</p>

            <h2>4. How We Collect Your Information</h2>
            <p>4.1 <strong>Directly from you</strong> — when you complete a form on this website, register as a tenant, instruct us in relation to a property, request legal or maintenance support, subscribe to our newsletter, use our website chat, or correspond with us.</p>
            <p>4.2 <strong>From third parties</strong> — including referencing and credit-check providers, employers and previous landlords providing references, property portals and introducers who pass on an enquiry, your appointed professional advisers, and public sources such as the Land Registry and Companies House.</p>
            <p>4.3 <strong>Automatically</strong> — through cookies and similar technologies, and through server logs, when you use this website. See section 12.</p>

            <h2>5. How We Use Your Information and Our Lawful Bases</h2>
            <p>5.1 We process your personal data for the following purposes, on the lawful bases stated:</p>
            <ul>
              <li><strong>Responding to your enquiry and providing information about our services</strong> — our legitimate interests in dealing with enquiries addressed to us, and, where you have asked us to act, steps taken at your request prior to entering into a contract.</li>
              <li><strong>Matching tenant requirements to available properties and arranging viewings</strong> — performance of a contract with you or steps taken prior to entering into one, and our legitimate interests in operating a letting business.</li>
              <li><strong>Processing applications, referencing, right to rent checks and tenancy set-up</strong> — performance of a contract, and compliance with our legal obligations (including the Immigration Act 2014).</li>
              <li><strong>Managing a tenancy, handling repairs and coordinating contractors</strong> — performance of a contract, and our legitimate interests in managing property we are instructed on.</li>
              <li><strong>Invoicing, collecting, allocating and recording payments, and managing arrears</strong> — performance of a contract, compliance with our legal obligations, and our legitimate interests in recovering sums due and keeping accurate records. See section 7.</li>
              <li><strong>Keeping accounting, tax and statutory records</strong> — compliance with our legal obligations.</li>
              <li><strong>Preventing, detecting and investigating fraud, payment diversion fraud and money laundering</strong> — compliance with our legal obligations, and our legitimate interests in protecting you and us from fraud.</li>
              <li><strong>Handling complaints, disputes, notices, possession proceedings and legal claims</strong> — compliance with our legal obligations, and our legitimate interests in establishing, exercising or defending legal rights.</li>
              <li><strong>Sending newsletters and marketing communications</strong> — your consent, or our legitimate interests where we are permitted to market to you on a soft opt-in basis under PECR. You may withdraw consent or opt out at any time.</li>
              <li><strong>Operating, securing and improving this website</strong> — our legitimate interests in running a secure and effective website, and, for non-essential cookies, your consent.</li>
            </ul>
            <p>5.2 Where we rely on legitimate interests, we have considered whether those interests are overridden by your interests, rights and freedoms. You may object to that processing as set out in section 11.</p>
            <p>5.3 We will not use your personal data for a new purpose that is incompatible with the purposes above unless we tell you and, where required, obtain your consent.</p>

            <h2>6. Marketing Communications</h2>
            <p>6.1 We will only send you marketing by email where you have consented, or where we are otherwise permitted to do so by PECR.</p>
            <p>6.2 You can withdraw your consent or opt out of marketing at any time by using the unsubscribe link in any marketing email, or by emailing <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a>. Withdrawing consent does not affect service messages we must send you in connection with a tenancy, instruction or payment.</p>

            <h2>7. Payments and Payment Handling</h2>
            <p>7.1 Payments in connection with our services are handled by <strong>Musa Limited LTD</strong>, company registration number 17410300.</p>
            <p>7.2 Where a payment is made to or by us, the personal data involved in handling it typically comprises your name, the payment reference, the amount and date of the payment, the invoice or account it relates to, and the account details that appear on the payment itself.</p>
            <p>7.3 That data is processed for the purposes of requesting, collecting, receiving, allocating, reconciling, recording and, where applicable, refunding payments, and of managing arrears and keeping accurate financial records.</p>
            <p>7.4 Our lawful bases for this processing are the performance of our contract with you, compliance with our legal obligations (including accounting, tax and anti-money-laundering obligations), and our legitimate interests in maintaining accurate financial records and in preventing and detecting payment fraud.</p>
            <p>7.5 Personal data is shared with Musa Limited LTD only to the extent necessary for payments to be handled, and it is not used by us for any unrelated purpose.</p>
            <p>7.6 Letting Partners LTD remains the data controller in respect of the personal data it holds about you, and remains responsible to you for the services it provides. The handling of payments by Musa Limited LTD does not change who you contract with or who is accountable to you under this policy.</p>
            <p>7.7 This website does not process payments. No payment can be made through this website. You should never send payment card details to us, or to anyone else, by email, website form or website chat.</p>
            <p>7.8 Payment instructions, including the account details and reference to be used, are issued to you in writing. We will never ask you to send funds to an account other than the one set out in those written instructions. If you receive details that differ from them, do not act on them — verify them with us by telephone on <a href="tel:02038977033">0203 897 7033</a> first.</p>
            <p>7.9 Records of payments, invoices and related correspondence are retained for a minimum of six years, as required by UK accounting and tax law.</p>
            <p>7.10 The contractual position on payments, including payment instructions, receipts and refunds, is set out in section 8 of our <Link href="/terms-conditions">Terms &amp; Conditions</Link>.</p>

            <h2>8. Who We Share Your Information With</h2>
            <p>8.1 We may share your personal data, to the extent necessary for the purpose concerned, with:</p>
            <ul>
              <li><strong>Musa Limited LTD</strong> (company registration number 17410300), in connection with the handling of payments, as described in section 7;</li>
              <li><strong>landlords and tenants</strong> (and their guarantors, where relevant) in connection with a tenancy or prospective tenancy;</li>
              <li><strong>referencing, credit-check and identity-verification providers</strong>;</li>
              <li><strong>Government-authorised tenancy deposit schemes</strong>, where a deposit is taken or protected;</li>
              <li><strong>contractors, tradespeople and maintenance providers</strong>, in order to arrange access, quotes and repairs;</li>
              <li><strong>professional advisers</strong>, including solicitors, barristers, surveyors, accountants, auditors, insurers and mortgage advisers, where instructed or where we need advice;</li>
              <li><strong>IT, hosting, email, telephony, website analytics and software providers</strong> who support our systems and this website;</li>
              <li><strong>regulators, public authorities and courts</strong>, including HM Revenue &amp; Customs, local authorities, the Home Office, the Information Commissioner&rsquo;s Office, law enforcement and the courts, where we are required or permitted by law to do so;</li>
              <li><strong>a purchaser or successor</strong>, if our business or part of it is reorganised, transferred or sold, subject to appropriate confidentiality and data protection safeguards.</li>
            </ul>
            <p>8.2 We do not sell your personal data, and we do not share it with third parties for their own advertising purposes.</p>
            <p>8.3 Where a third party processes personal data on our behalf, we put in place a written contract requiring it to process that data only on our instructions, to keep it confidential and secure, and to assist us in meeting our obligations under data protection law.</p>

            <h2>9. International Transfers</h2>
            <p>9.1 Your personal data is normally stored and processed in the United Kingdom.</p>
            <p>9.2 Where a provider we use processes personal data outside the United Kingdom, we only permit that transfer where an appropriate safeguard is in place — for example UK adequacy regulations in respect of the receiving country, or the UK International Data Transfer Agreement or the International Data Transfer Addendum to the European Commission standard contractual clauses, together with a transfer risk assessment where required.</p>
            <p>9.3 You may request details of the safeguards applying to a particular transfer by contacting us.</p>

            <h2>10. How Long We Keep Your Information</h2>
            <p>10.1 We keep personal data only for as long as necessary for the purposes for which it was collected, including to satisfy any legal, accounting, tax or reporting requirement, and to establish, exercise or defend legal claims.</p>
            <p>10.2 The periods we normally apply are:</p>
            <ul>
              <li><strong>Enquiries that do not proceed</strong> — up to 12 months from our last contact with you.</li>
              <li><strong>Tenant registrations and applications that do not proceed</strong> — up to 12 months from the application.</li>
              <li><strong>Tenancy, management and instruction records</strong> — 6 years from the end of the tenancy, instruction or relationship.</li>
              <li><strong>Payment, invoicing and accounting records</strong> — a minimum of 6 years, in line with UK accounting and tax requirements.</li>
              <li><strong>Right to rent and identity documents</strong> — for the period required by Home Office guidance, and then securely deleted.</li>
              <li><strong>Marketing preferences and consents</strong> — until you withdraw consent or opt out, and then a minimal record of your opt-out so that we can respect it.</li>
              <li><strong>Complaints and legal matters</strong> — 6 years from resolution, or longer where proceedings or a limitation period require it.</li>
            </ul>
            <p>10.3 At the end of the applicable period we securely delete or anonymise the data, unless a longer period is required by law or is necessary for a live legal claim.</p>

            <h2>11. Your Rights</h2>
            <p>11.1 Under the UK GDPR you have the right to:</p>
            <ul>
              <li><strong>be informed</strong> about how your personal data is used — which is the purpose of this policy;</li>
              <li><strong>access</strong> the personal data we hold about you, and receive a copy of it;</li>
              <li><strong>rectification</strong> of inaccurate personal data, and completion of incomplete personal data;</li>
              <li><strong>erasure</strong> of your personal data, where there is no overriding reason for us to continue holding it;</li>
              <li><strong>restrict processing</strong> of your personal data in certain circumstances;</li>
              <li><strong>object to processing</strong> carried out on the basis of our legitimate interests, and to object at any time to processing for direct marketing;</li>
              <li><strong>data portability</strong> — to receive certain data in a structured, commonly used and machine-readable format, or have it transmitted to another controller;</li>
              <li><strong>withdraw consent</strong> at any time, where our processing is based on your consent;</li>
              <li><strong>not be subject to a decision based solely on automated processing</strong> that has a legal or similarly significant effect on you.</li>
            </ul>
            <p>11.2 To exercise any of these rights, email <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a>. We may ask you for information to confirm your identity before we act on a request.</p>
            <p>11.3 We will respond without undue delay and in any event within one month of receiving your request. Where a request is complex, or where you have made a number of requests, we may extend that period by up to two further months, and we will tell you if we do.</p>
            <p>11.4 There is normally no charge for exercising your rights. We may charge a reasonable fee, or refuse to act, where a request is manifestly unfounded or excessive, and we will explain our reasons if that applies.</p>

            <h2>12. Cookies and Similar Technologies</h2>
            <p>12.1 <strong>Essential cookies.</strong> This website uses cookies and similar technologies that are strictly necessary for the site to function, including for security, page delivery and remembering the cookie choice you make. Under regulation 6(4) of PECR these do not require your consent.</p>
            <p>12.2 <strong>Analytics cookies.</strong> This website can use Google Analytics, provided by Google, to help us understand how visitors find and use the site. Google Analytics sets cookies and collects information such as the pages you visit, how long you spend on them, the type of device and browser you use, and an approximate location derived from your IP address. We use this information in aggregate to measure and improve the website, and not to identify you personally.</p>
            <p>12.3 <strong>Your consent.</strong> Analytics cookies are not set unless you accept them. When you first visit this website, a cookie banner asks whether you accept or reject analytics cookies. Nothing other than the strictly necessary cookies is set until you choose to accept, and rejecting is as easy as accepting. Our lawful basis for analytics cookies is your consent, under regulation 6 of PECR and Article 6(1)(a) of the UK GDPR.</p>
            <p>12.4 <strong>Changing or withdrawing your choice.</strong> You may change your mind at any time by selecting &ldquo;Cookie Settings&rdquo; at the foot of any page. If you withdraw consent, we delete the Google Analytics cookies already set on your device and stop loading the analytics tag. Withdrawing consent does not affect the lawfulness of processing carried out before you withdrew it.</p>
            <p>12.5 You can also block or delete cookies through your browser settings, use your browser&rsquo;s private browsing mode, or install the Google Analytics opt-out browser add-on. Blocking all cookies may affect how parts of this website work.</p>
            <p>12.6 <strong>Advertising.</strong> We do not use advertising, re-targeting or cross-site tracking cookies, we do not permit advertising or personalisation signals to be sent from this website, and we do not sell website usage data.</p>

            <h2>13. Automated Decision-Making and Profiling</h2>
            <p>13.1 We do not make decisions about you based solely on automated processing without human involvement.</p>
            <p>13.2 Where a referencing or credit-check provider produces an automated score or recommendation, that output is reviewed by a person before any decision about an application is taken, and you may ask us to explain the outcome and to reconsider it.</p>

            <h2>14. Security</h2>
            <p>14.1 We maintain appropriate technical and organisational measures to protect personal data against unauthorised or unlawful processing and against accidental loss, destruction or damage. These include access controls, encryption of data in transit, restricting access to those who need it, and confidentiality obligations on our staff and suppliers.</p>
            <p>14.2 No transmission of information over the internet is completely secure. Please do not send identity documents, bank details or other sensitive information to us by unencrypted email unless we have asked you to and explained how.</p>
            <p>14.3 We have procedures to deal with any suspected personal data breach, and we will notify you and the Information Commissioner&rsquo;s Office where we are legally required to do so.</p>

            <h2>15. Children</h2>
            <p>15.1 Our services are directed at adults. We do not knowingly collect personal data from children under 18 other than as part of household or tenancy information provided to us by an adult. If you believe we hold a child&rsquo;s data without an appropriate basis, please contact us and we will review it.</p>

            <h2>16. Complaints</h2>
            <p>16.1 If you are unhappy with how we have handled your personal data, please contact us first at <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a> so that we can try to put it right.</p>
            <p>16.2 You also have the right to complain to the UK supervisory authority for data protection:</p>
            <ul>
              <li><strong>Information Commissioner&rsquo;s Office</strong></li>
              <li>Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</li>
              <li>Telephone: 0303 123 1113</li>
              <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            </ul>

            <h2>17. Changes to This Policy</h2>
            <p>17.1 We may update this policy from time to time to reflect changes in our practices or in the law. The current version is always the one published on this page, and the date it was last updated is shown at the top.</p>
            <p>17.2 Where a change materially affects how we use your personal data, we will take reasonable steps to tell you.</p>

            <h2>18. Contact Us</h2>
            <p>18.1 For any question about this policy, or about how we handle your personal data, contact us at <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a> or on <a href="tel:02038977033">0203 897 7033</a>.</p>
            <p>18.2 Our details are as follows:</p>
            <ul>
              <li><strong>Data controller:</strong> Letting Partners LTD</li>
              <li><strong>Trading names:</strong> Letting Partners; More Ways Hub</li>
              <li><strong>Registered in:</strong> England and Wales</li>
              <li><strong>Company registration number:</strong> 17436005</li>
              <li><strong>Payments handled by:</strong> Musa Limited LTD, company registration number 17410300</li>
              <li><strong>Email:</strong> <a href="mailto:info@lettingpartners.co.uk">info@lettingpartners.co.uk</a></li>
              <li><strong>Telephone:</strong> <a href="tel:02038977033">0203 897 7033</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
