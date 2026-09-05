import Image from "next/image";

type Partner = { name: string; src: string };

export default function PartnersSlider({ items }: { items: Partner[] }) {
  const loop = [...items, ...items];

  return (
    <div className="lp-partners-slider">
      <div className="lp-partners-track">
        {loop.map((item, i) => (
          <div className="lp-partners-slide" key={`${item.name}-${i}`}>
            <div className="lp-partners-logo-wrap">
              <Image src={item.src} alt={item.name} fill sizes="160px" className="lp-partners-logo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
