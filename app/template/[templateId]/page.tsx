"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const EHRPage = ({params}: {params: {templateId: string}}) => {
  const router = useRouter();
  const templateId = params.templateId;
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  console.log('templateId', templateId);
  
  useEffect(() => {
    const getEHR = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the template data using the correct API endpoint
        const response = await fetch(`/api/definition/${templateId}`);
        const result = await response.json();
        
        if (result.data && typeof result.data === 'string') {
          const uidMatch = result.data.match(/<uid>\s*<value>([^<]+)<\/value>\s*<\/uid>/i);
          if (uidMatch && uidMatch[1]) {
            const ehrId = uidMatch[1];
            setUid(ehrId);
            
            // Navigate to the ehrId page automatically
            setTimeout(() => {
              router.push(`/ehr/${ehrId}`);
            }, 1000); // Short delay to show the success message
          }
        } else if (result.data && result.data.uid && result.data.uid.value) {
          const uid = result.data.uid.value;
          setUid(uid);
          
          // Navigate to the ehrId page automatically
          setTimeout(() => {
            router.push(`/ehr/${uid}`);
          }, 1000);
        } else if (result.uid && result.uid.value) {
          const uid = result.uid.value;
          setUid(uid);
          
          // Navigate to the ehrId page automatically
          setTimeout(() => {
            router.push(`/ehr/${uid}`);
          }, 1000);
        } else {
          setError("Could not find UID in the response");
        }
      } catch (error) {
        console.error('Error fetching template data:', error);
        setError("Error fetching template data");
      } finally {
        setLoading(false);
      }
    }
    getEHR();
  }, [templateId, router])
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">EHR Template: {templateId}</h1>
      
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-3"></div>
          <p>Getting UID from template...</p>
        </div>
      ) : error ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : uid ? (
        <div>
          <p className="mb-2">UID found: {uid}</p>
          <p className="text-green-600">Redirecting to EHR page...</p>
        </div>
      ) : (
        <p>No UID found in template</p>
      )}
    </div>
  )
}

export default EHRPage