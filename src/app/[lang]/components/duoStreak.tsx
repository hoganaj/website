import React from 'react';
import Image from "next/image";

async function getDuolingoStreak(username: string): Promise<any>{
  try {
    const response = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${username}&_=${Date.now()}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return  data.users[0].streak;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return "--";
  }
}

  export default async function DuoStreak() {

    const streak = await getDuolingoStreak("aidsmcg");
    
    return (
      <div className="inline-block bg-base-200 rounded-box shadow-md p-4">
        <div className="flex items-center">
          <div className="w-16 h-16 mr-4 flex-shrink-0">
            <Image 
              src="/duo.svg" 
              alt="Duolingo owl" 
              width={64}
              height={64} 
              className="w-full h-full object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Current Streak 🔥</div>
            <div className="text-2xl font-bold flex items-center">
              {streak !== undefined ? streak : "--"}
              <Image 
                src="/zs.svg"
                alt="Duolingo streak icon" 
                width={40} 
                height={40} 
                className="ml-2"
                sizes="40px" 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }