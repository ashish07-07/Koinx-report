import Link from "next/link";
import image from "../public/Koinxlogo.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <nav className="absolute top-0 left-0 m-4">
        <Image
          src={image}
          alt="KoinX Logo"
          className="h-12"
          width={150}
          height={80}
        />
      </nav>

      <nav className="absolute top-0 right-0 m-4">
        <Link href="/api/auth/signin">
          <button className="bg-pink-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg">
            Sign In
          </button>
        </Link>
      </nav>

      <header className="text-center mt-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The Future Of Crypto Tax
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Unleash speed and accuracy in crypto tax calculation
        </p>
      </header>

      <div className="flex space-x-4">
        <Link href="/uploadcsv">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            Upload CSV
          </button>
        </Link>
      </div>

      <div> BTC/CYPTO </div>
      <div></div>

      <div className="flex space-x-4">
        <Link href="/cryptoasset">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            See the Assets Based on Date
          </button>
        </Link>
      </div>

      <div> Classify the Gain/Loss </div>

      <div className="flex space-x-4">
        <Link href="/seeprofitloss">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            See Net profit
          </button>
        </Link>
      </div>
    </div>
  );
}
