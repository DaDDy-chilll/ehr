"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Define interfaces for composition data
interface CompositionValue {
  _type?: string;
  value: string;
}

interface CompositionItem {
  name?: CompositionValue;
  value?: CompositionValue;
  _type?: string;
  items?: CompositionItem[];
}

interface CompositionData {
  _type?: string;
  name?: CompositionValue;
  uid?: CompositionValue;
  archetype_node_id?: string;
  context?: {
    start_time?: CompositionValue;
    setting?: CompositionValue;
  };
  content?: CompositionItem[];
}

export default function CompositionDetailPage() {
  const [composition, setComposition] = useState<CompositionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const ehrId = searchParams.get('ehrId');
  const compositionId = searchParams.get('compositionId');

  useEffect(() => {
    const fetchComposition = async () => {
      if (!ehrId || !compositionId) {
        setError("Missing ehrId or compositionId");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/composition?ehrId=${ehrId}&compositionId=${compositionId}`);
        const result = await response.json();
        
        if (result.ok && result.data) {
          setComposition(result.data);
        } else {
          setError(result.error || "Failed to fetch composition data");
        }
      } catch (error) {
        console.error("Error fetching composition:", error);
        setError("Failed to fetch composition data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComposition();
  }, [ehrId, compositionId]);

  // Helper function to format date strings
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      // Return original string if date parsing fails
      return dateString;
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Link href={`/composition/form`} className="text-blue-500 hover:underline">
          &larr; Back to Composition Form
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Composition Detail</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : composition ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              {composition.name?.value || "Unnamed Composition"}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Type: {composition._type || "Unknown"}
              </span>
              {composition.uid?.value && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  UID: {composition.uid.value}
                </span>
              )}
              {composition.archetype_node_id && (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Archetype: {composition.archetype_node_id}
                </span>
              )}
            </div>
          </div>

          {/* Context section */}
          {composition.context && (
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium mb-3">Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {composition.context.start_time && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-700">Start Time</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(composition.context.start_time.value)}
                    </p>
                  </div>
                )}
                {composition.context.setting && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-700">Setting</p>
                    <p className="text-sm text-gray-600">
                      {composition.context.setting.value}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content section */}
          {composition.content && composition.content.length > 0 && (
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium mb-3">Content</h3>
              <div className="space-y-4">
                {composition.content.map((item: CompositionItem, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">{item.name?.value || `Item ${index + 1}`}</h4>
                    {item.items && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.items.map((dataItem: CompositionItem, dataIndex: number) => (
                          <div key={dataIndex} className="bg-white p-3 rounded border">
                            <p className="text-sm font-medium text-gray-700">
                              {dataItem.name?.value || `Data Item ${dataIndex + 1}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {dataItem.value?.value || "No value"}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw data section */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Raw Data</h3>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(composition, null, 2));
                  alert("Copied to clipboard!");
                }}
              >
                Copy JSON
              </button>
            </div>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
              {JSON.stringify(composition, null, 2)}
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
              <p className="text-sm text-yellow-700">No composition data found</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
