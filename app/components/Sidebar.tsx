import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-600 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        <li>
          <Link href="/dashboard">
            <p className="py-2 px-4 bg-blue-500 rounded">Details</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
