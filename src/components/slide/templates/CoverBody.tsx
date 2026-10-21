interface Props {
  title: string;
  subtitle: string;
}

export default function CoverBody({ title, subtitle }: Props) {
  return (
    <>
      <h1 className="max-w-[900px] font-display text-[44px] font-black leading-[1.15] tracking-[-0.015em] text-butter">
        {title}
      </h1>
      <p className="mt-4 max-w-[750px] text-[17px] text-pastel-blue">{subtitle}</p>
      <div className="mt-6 h-1 w-[60px] bg-butter" />
    </>
  );
}