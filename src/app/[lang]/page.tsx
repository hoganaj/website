/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { FaLaptopCode, FaMapMarkerAlt, FaTools, FaSmile } from "react-icons/fa";
import { getDictionary } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>
}) {

  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return (
    <main className="container mx-auto px-6 sm:px-4 py-8">
      <div className="text-center">
        <div className="max-w-sm sm:max-w-md mx-auto">
          <Image
            alt="Avatar"
            src="/avatar.png"
            width={200}
            height={200}
            className="mx-auto mb-6 w-32 h-32 sm:w-48 sm:h-48"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-base-content">{dict.home.title}</h1>
        </div>

        {/* Mobile-Friendly Section */}
        <div className="md:hidden mt-8 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <FaLaptopCode className="text-blue-500 text-xl" />
            <p className="text-lg font-semibold">{dict.home.job}</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <p className="text-lg">{dict.home.location}</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaTools className="text-green-500 text-xl" />
            <p className="text-lg">{dict.home.skills}</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaSmile className="text-yellow-500 text-xl" />
            <p className="text-lg">{dict.home.hobbies}</p>
          </div>
        </div>

        {/* Full Code Snippet for Larger Devices */}
        <div className="hidden md:block mockup-code w-full max-w-fit mx-auto mt-6 text-left overflow-x-auto">
          <pre data-prefix="$" className="whitespace-pre text-sm"><code>npm i aidan@latest</code></pre>
          <pre data-prefix=">" className="text-info whitespace-pre text-sm"><code>Initializing Aidan installation...</code></pre>
          <pre data-prefix=">" className="text-success whitespace-pre text-sm"><code>Aidan v1.0.0 installed successfully!</code></pre>
          <pre data-prefix="$" className="whitespace-pre text-sm"><code>aidan --info</code></pre>
          <pre data-prefix=">" className="whitespace-pre text-sm"><code>Location: Leicester, UK</code></pre>
          <pre data-prefix=">" className="whitespace-pre text-sm"><code>Occupation: Software Engineer</code></pre>
          <pre data-prefix=">" className="whitespace-pre text-sm"><code>Skills: ['TypeScript', 'React', 'Node.js'] Hobbies: ['Coding', 'Pickleball', 'Hiking']</code></pre>
          <pre data-prefix="$" className="whitespace-pre text-sm"><code>aidan --run greet</code></pre>
          <pre data-prefix=">" className="text-warning whitespace-pre text-sm"><code>Hello, World! Ready to build something awesome?</code></pre>
        </div>
      </div>
    </main>
  );
}