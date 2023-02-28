export default function Header({ title }: { title: string }) {
  return (
    <header className="p-8 text-[3rem] text-center text-white">
      {title}
    </header>
  );
}
