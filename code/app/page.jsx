import { redirect } from 'next/navigation'

// This is a mock function. Replace it with your actual token checking logic.
function checkToken() {
  return  null;
}

export default function Home() {
  if (!checkToken()) {
    redirect('/login');
  }

  return (
    <div className="flex justify-center items-center h-screen text-7xl">
      Hello World, from Calendo!
    </div>
  );
}