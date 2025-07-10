"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {Modal} from "@/app/components/Modal";
interface Template {
  templateId: string;
  name: string;
}

interface TemplateApiResponse {
  template_id: string;
  name?: string;
}

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/definition");
      const result = await response.json();

      if (result.ok) {
        // Transform the data to the format we need
        const templateData = result.data.map((template: TemplateApiResponse) => ({
          templateId: template.template_id,
          name: template.name || template.template_id,
        }));
        setTemplates(templateData);
      } else {
        setError(result.error || "Failed to fetch templates");
      }
    } catch (error) {
      setError(error?.toString() || "Error fetching templates");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTemplateName("");
    setXmlFile(null);
    setUploadStatus("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "text/xml" || file.name.endsWith(".xml") || file.name.endsWith(".opt")) {
        setXmlFile(file);
        setUploadStatus(`File selected: ${file.name}`);
      } else {
        setXmlFile(null);
        setUploadStatus("Please select a valid XML or OPT file");
      }
    }
  };

  const addTemplate = async () => {
    if (!templateName.trim()) {
      setUploadStatus("Please enter a template name");
      return;
    }
    console.log('xmlFile', xmlFile);


    if (!xmlFile || (!xmlFile.name.endsWith(".xml") && !xmlFile.name.endsWith(".opt")) ) {
      setUploadStatus("Please select an XML or OPT file");
      return;
    }
    

    setLoading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("name", templateName);
      formData.append("xmlFile", xmlFile);

      const response = await fetch("/api/definition", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.ok) {
        setUploadStatus("Template added successfully!");
        closeModal();
        fetchTemplates();
      } else {
        setUploadStatus(result.error || "Failed to add template");
      }
    } catch (error) {
      setUploadStatus(error?.toString() || "Error adding template");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);


  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Template List</h1>
          {templates.length <= 0 ? (
            <button
              onClick={fetchTemplates}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Refresh"
              )}
            </button>
          ):(
            <button
            onClick={openModal}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                Add Your Template
              
            
          </button>
          )}
        </div>

        {loading && templates.length === 0 ? (
          <div className="text-center py-4">Loading templates...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : templates.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No templates found
          </div>
        ) : (
          <ul className="space-y-2">
            {templates.map((template) => (
              <li key={template.templateId}>
                <Link href={`/template/${template.templateId}`}>
                  <div className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200 border border-gray-200">
                    {template.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Template"
        content={
          <div className="space-y-4">
            <div>
              <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                id="templateName"
                type="text"
                placeholder="Enter template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="xmlFile" className="block text-sm font-medium text-gray-700 mb-1">
                XML File (or) .Opt File
              </label>
              <input
                id="xmlFile"
                type="file"
                ref={fileInputRef}
                accept=".xml,text/xml,.opt,text/opt"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {uploadStatus && (
              <div className={`text-sm ${uploadStatus.includes("Error") || uploadStatus.includes("Please") ? "text-red-500" : "text-green-500"}`}>
                {uploadStatus}
              </div>
            )}
          </div>
        }
        actions={[
          {
            label: "Cancel",
            onClick: closeModal,
          },
          {
            label: "Add",
            onClick: addTemplate,
          },
        ]}
      />
    </div>
  );
}
