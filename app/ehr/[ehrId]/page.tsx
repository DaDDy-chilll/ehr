"use client";
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

interface EHRData {
  _type?: string;
  name?: {
    _type: string;
    value: string;
  };
  uid?: {
    _type: string;
    value: string;
  };
  ehr_id?: {
    _type: string;
    value: string;
  };
  system_id?: {
    _type: string;
    value: string;
  };
  time_created?: {
    _type: string;
    value: string;
  };
  ehr_status?: {
    uid?: {
      _type: string;
      value: string;
    };
   name?: {
    _type: string;
    value: string;
  };

  is_queryable?: {
    _type: string;
    value: string;
  };
  is_modifiable?: {
    _type: string;
    value: string;
  };
  archetype_node_id?: string;
  
  };

  // Add other properties as needed
}

const EHRDetailPage = ({ params }: { params: { ehrId: string } }) => {
  const [ehrId, setEhrId] = useState<string>(params.ehrId);
  const [ehrData, setEhrData] = useState<EHRData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [eTag, setETag] = useState<string | null>(localStorage.getItem("etag") || null);

  useEffect(() => {
    setEhrId(params.ehrId);
    setETag(null)
    localStorage.removeItem("etag");
  }, [params.ehrId]);

  const [inputEhrId, setInputEhrId] = useState<string>(ehrId || '');
  
  const handleCreateEHR = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      "archetype_node_id": "openEHR-EHR-COMPOSITION.encounter.v1",
      "name": {
          "_type": "DV_TEXT",
          "value": "EHR composition"
      },
      "uid": {
          "_type": "OBJECT_VERSION_ID",
          "value": `${inputEhrId}::local.ehrbase.org::1`
      },
      "subject": {
          "_type": "PARTY_SELF"
      },
      "is_queryable": true,
      "is_modifiable": true,
      "_type": "EHR_STATUS"
  }
     
    const response = await fetch(`/api/ehr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    console.log('result', result);
    
    if (result.ok) {
      setETag(result.etag);
      localStorage.setItem("etag", result.etag);
    } else {
      setError(result.error || "Failed to fetch EHR data");
    }
    setLoading(false);

  };

  const handleFetchEHR = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission which would cause page reload
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/ehr/${eTag}`);
      const result = await response.json();
      console.log('Fetch EHR result:', result);
      
      if (result.ok && result.data) {
        setEhrData(result.data);
      } else {
        setError(result.error || "Failed to fetch EHR data");
      }
    } catch (err) {
      console.error("Error fetching EHR:", err);
      setError("Failed to fetch EHR data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">EHR Create</h1>
      
      {/* EHR ID Input Form */}

      {!eTag && (
        <div className="mb-6 bg-white shadow rounded p-4">
        <form onSubmit={handleCreateEHR} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <label htmlFor="ehrId" className="block text-sm font-medium text-gray-700 mb-1">UID ID</label>
            <input
              type="text"
              id="ehrId"
              value={inputEhrId}
              onChange={(e) => setInputEhrId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Template UID or EHR ID"
            />
          </div>
          <div className="self-end">
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Creating EHR...</p>
              </div>
            ) : (
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create EHR
            </button>
            )}
          </div>
        </form>
      </div>
      )}

{eTag && (
        <div className="mb-6 bg-white shadow rounded p-4">
        <form onSubmit={handleFetchEHR} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <label htmlFor="ehrId" className="block text-sm font-medium text-gray-700 mb-1">Fetch EHR</label>
            <input
              type="text"
              id="ehrId"
              value={eTag}
              onChange={(e) => setInputEhrId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Template UID or EHR ID"
            />
          </div>
          <div className="self-end">
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Creating EHR...</p>
              </div>
            ) : (
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Fetch EHR
            </button>
            )}
          </div>
        </form>
      </div>
      )}
      
      
      {loading ? (
        <div className="flex items-center p-4 bg-white shadow rounded">
          <svg className="animate-spin h-6 w-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-700 font-medium">Loading EHR data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">
                {error.includes("No EHR found") ? (
                  <>
                    <p>No EHR found with the given ID:</p>
                    <p className="font-mono mt-1">{ehrId}</p>
                  </>
                ) : (
                  <p>{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : ehrData ? (
        <div className="bg-white shadow rounded p-4">
          <div className="mb-4 flex justify-between items-center">
           <div>
           <h2 className="text-xl font-semibold">
              {ehrData?.ehr_status?.name?.value || "Unnamed EHR"}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                EHR ID: {ehrData?.ehr_id?.value || ehrId}
              </span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                System: {ehrData?.system_id?.value || "Unknown"}
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Created: {ehrData?.time_created?.value ? new Date(ehrData.time_created.value).toLocaleString() : "Unknown"}
              </span>
            </div>
           </div>

           <div>
            <Link href={`/composition/form`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Create Composition
            </Link>
           </div>
          </div>
          
          {ehrData?.ehr_status && (
            <div className="mb-4 border-t pt-4">
              <h3 className="font-medium mb-2">EHR Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700">UID</p>
                  <p className="text-sm font-mono text-gray-600 break-all">{ehrData?.ehr_status?.uid?.value || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700">Archetype Node ID</p>
                  <p className="text-sm font-mono text-gray-600">{ehrData?.ehr_status?.archetype_node_id || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700">Queryable</p>
                  <p className="text-sm text-gray-600">{ehrData?.ehr_status?.is_queryable ? "Yes" : "No"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700">Modifiable</p>
                  <p className="text-sm text-gray-600">{ehrData?.ehr_status?.is_modifiable ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium mb-2">Raw EHR Data:</h3>
            <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-96 text-xs">
              {JSON.stringify(ehrData, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">No EHR data found for ID: <span className="font-mono">{ehrId}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EHRDetailPage;