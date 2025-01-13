import Link from 'next/link'
import { getDictionary } from './dictionaries'
import { headers } from 'next/headers'

export default async function NotFound() {
  
    // Extract the language from locale header
    const headersList = headers()
    const lang = (headersList.get('x-next-i18n-router-locale') || "en") as "en" | "zh"
    
    const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold">
        {dictionary.errors?.notFound ?? 'Not Found'}
      </h2>
      <p className="text-gray-600">
        {dictionary.errors?.resourceNotFound ?? 'Could not find requested resource'}
      </p>
      <Link 
        href={`/${lang}`} 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        {dictionary.errors?.returnHome ?? 'Return Home'}
      </Link>
    </div>
  )
}