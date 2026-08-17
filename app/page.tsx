import GenerativeUI from '../GenerativeUI';

export default async function Home() {
  const mockEnabled = process.env.GENERATIVE_UI_USE_MOCKS !== 'false';

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ecfdf5_0,#fafafa_22rem)] px-4 font-sans">
      <main className="mx-auto flex w-full justify-center py-12 sm:py-16">
        <GenerativeUI mockEnabled={mockEnabled} />
      </main>
    </div>
  );
}
