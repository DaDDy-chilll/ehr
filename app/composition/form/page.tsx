"use client";
import { useState, useEffect } from 'react';
import template from "@/app/components/template";
import { generatePatientPayload, PatientFormData } from "@/app/payloads/patient.payload";
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ehrId, setEhrId] = useState<string | null>(null);
  const [compositionId, setCompositionId] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  console.log('loading', loading);
 
  useEffect(() => {
    // Get the EHR ID from localStorage if available
    const storedEhrId = localStorage.getItem('etag');
    if (storedEhrId) {
      setEhrId(storedEhrId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!ehrId) {
      setError("No EHR ID found. Please create an EHR first.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Get the form element
      const form = e.target as HTMLFormElement;
      
      // Initialize the result object
      const formData: PatientFormData = {};
      
      // Process all form elements with data-tpath attributes
      const elements = form.querySelectorAll('[data-tpath]');
      
      elements.forEach((element) => {
        // Skip elements that don't contain input/select elements
        if (!(element instanceof HTMLElement)) return;
        
        const tpath = element.getAttribute('data-tpath');
        if (!tpath) return;
        
        // Handle different element types
        if (element.classList.contains('DV_CODED_TEXT')) {
          const select = element.querySelector('select');
          if (select) {
            const value = select.options[select.selectedIndex].text;
            const codeString = select.value;
            
            // Extract the field name from the label
            const labelElement = element.parentElement?.querySelector('label');
            const fieldName = labelElement?.textContent || 'Unknown Field';
            
            formData[fieldName] = {
              value,
              code_string: codeString
            };
          }
        } else if (element.classList.contains('DV_DATE_TIME')) {
          const input = element.querySelector('input[type="datetime-local"]') as HTMLInputElement | null;
          if (input) {
            const value = input.value;
            
            // Extract the field name from the label
            const labelElement = element.parentElement?.querySelector('label');
            const fieldName = labelElement?.textContent || 'Unknown Field';
            
            formData[fieldName] = {
              value
            };
          }
        }
        // Add more element types as needed
      });
      
      console.log('Structured Form Data:', formData);
      
      // Generate the payload using our helper function
      const payload = generatePatientPayload(formData, ehrId);
      
      // Send the payload to the API
      const response = await fetch(`/api/composition/${ehrId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      console.log('result', result);
      if (result.ok) {
        
        // If we have a location or etag, extract the composition ID
        if (result.data.location) {
          // Extract composition ID from location URL
          const locationParts = result.data.location.split('/');
          const newCompositionId = locationParts[locationParts.length - 1];
          setCompositionId(newCompositionId);
          localStorage.setItem('compositionId', newCompositionId);
          setSuccess(true);
        } else if (result.data.etag) {
          // Use etag as composition ID if location is not available
          setCompositionId(result.data.etag);
          localStorage.setItem('compositionId', result.data.etag);
          setSuccess(true);
        } else {
          // Just show success message if we don't have an ID
          setSuccess(true);
        }
      } else {
        setError(result.error || 'Failed to create composition');
      }
    } catch (err) {
      console.error('Error creating composition:', err);
      setError('An error occurred while creating the composition');
    } finally {
      setLoading(false);
    }
  };

  console.log('compositionId', compositionId);
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Patient Composition</h1>
        <div>
          <Link href={`/ehr/${ehrId}`} className="text-blue-500 hover:underline mr-4">
            Back to EHR
          </Link>
        </div>
      </div>
      
      {error && (
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
      )}
      
      {compositionId && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Composition created successfully!</p>
              <div className="mt-2">
                <Link 
                  href={`/composition/detail?ehrId=${ehrId}&compositionId=${compositionId}`}
                  className="text-sm font-medium text-green-700 underline hover:text-green-600"
                >
                  View Composition Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {success && !compositionId && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Composition created successfully!</p>
            </div>
          </div>
        </div>
      )}
      
      {!ehrId && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">No EHR ID found. Please <Link href="/ehr/" className="font-medium underline">create an EHR</Link> first.</p>
            </div>
          </div>
        </div>
      )}
      
      {template({handleSubmit})}
    </div>
  );
}
