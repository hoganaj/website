import React from 'react';
import Image from "next/image";


const DuoStreak: React.FC = () => {
  async function getDuolingoStreak(username: string): Promise<any>{
    try {
      const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}&_=${Date.now()}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const streak = data.users[0].streak;
      console.log(streak);
      return streak
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div className="inline-block bg-base-200 rounded-box shadow-md p-4">
      <div className="flex items-center">
        <div className="w-16 h-16 mr-4 flex-shrink-0">
          <Image src="/duo.svg" alt="duo" width={200} height={200} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Current Streak 🔥</div>
          <div className="text-2xl font-bold flex items-center">
            {getDuolingoStreak("aidsmcg")}
            <Image src="https://ardslot.com/s/zs.svg" alt="duo" width={40} height={40} className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default DuoStreak;