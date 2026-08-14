import GenerativeUI from '../GenerativeUI';

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <main className="flex w-full justify-center py-10">
        <GenerativeUI />
      </main>
    </div>
  );
}
