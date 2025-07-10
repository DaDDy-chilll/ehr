export interface FormDataItem {
  value: string;
  code_string?: string;
}

export interface PatientFormData {
  [key: string]: FormDataItem;
}

/**
 * Generates a patient composition payload based on form data
 * @param formData The structured form data from the patient form
 * @param ehrId The EHR ID to associate with this composition
 * @returns A composition payload ready to be sent to the openEHR server
 */
export function generatePatientPayload(formData: PatientFormData, ehrId: string) {
  const currentTime = new Date().toISOString();
  
  // Extract blood group data from form if available
  const bloodGroup = formData['ABO blood group']?.value || 'O';
  const bloodGroupCode = formData['ABO blood group']?.code_string || 'at0007';
  
  const rhStatus = formData['Rh(D) antigen status']?.value || 'Positive';
  const rhStatusCode = formData['Rh(D) antigen status']?.code_string || 'at0011';
  
  // Use ehrId in the payload to associate with the specific EHR
  
  return {
    "_type": "COMPOSITION",
    "name": {
       "_type": "DV_TEXT",
       "value": "Patient Template"
    },
    "archetype_details": {
       "archetype_id": {
          "value": "openEHR-EHR-COMPOSITION.encounter.v1"
       },
       "template_id": {
          "value": "Patient Template"
       },
       "rm_version": "1.0.2"
    },
    "archetype_node_id": "openEHR-EHR-COMPOSITION.encounter.v1",
    "language": {
       "terminology_id": {
          "_type": "TERMINOLOGY_ID",
          "value": "ISO_639-1"
       },
       "code_string": "en"
    },
    "territory": {
       "terminology_id": {
          "_type": "TERMINOLOGY_ID",
          "value": "ISO_3166-1"
       },
       "code_string": "UY"
    },
    "category": {
       "value": "event",
       "defining_code": {
          "terminology_id": {
             "_type": "TERMINOLOGY_ID",
             "value": "openehr"
          },
          "code_string": "433"
       }
    },
    "composer": {
       "_type": "PARTY_IDENTIFIED",
       "external_ref": {
          "id": {
             "_type": "HIER_OBJECT_ID",
             "value": `${ehrId}`
          },
          "namespace": "DEMOGRAPHIC",
          "type": "PERSON"
       },
       "name": "Dr. House"
    },
    "context": {
       "start_time": {
          "value": currentTime
       },
       "setting": {
          "value": "home",
          "defining_code": {
             "terminology_id": {
                "_type": "TERMINOLOGY_ID",
                "value": "openehr"
             },
             "code_string": "225"
          }
       },
       "other_context": {
          "_type": "ITEM_TREE",
          "name": {
             "_type": "DV_TEXT",
             "value": "Tree"
          },
          "archetype_node_id": "at0001",
          "items": []
       }
    },
    "content": [
       {
          "_type": "EVALUATION",
          "name": {
             "_type": "DV_TEXT",
             "value": "Blood group"
          },
          "archetype_details": {
             "archetype_id": {
                "value": "openEHR-EHR-EVALUATION.blood_group.v0"
             },
             "template_id": {
                "value": "Patient Template"
             },
             "rm_version": "1.0.2"
          },
          "archetype_node_id": "openEHR-EHR-EVALUATION.blood_group.v0",
          "language": {
             "terminology_id": {
                "_type": "TERMINOLOGY_ID",
                "value": "ISO_639-1"
             },
             "code_string": "en"
          },
          "encoding": {
             "terminology_id": {
                "_type": "TERMINOLOGY_ID",
                "value": "IANA_character-sets"
             },
             "code_string": "UTF-8"
          },
          "subject": {
             "_type": "PARTY_SELF"
          },
          "protocol": {
             "_type": "ITEM_TREE",
             "name": {
                "_type": "DV_TEXT",
                "value": "Item tree"
             },
             "archetype_node_id": "at0001",
             "items": [
                {
                   "_type": "ELEMENT",
                   "name": {
                      "_type": "DV_TEXT",
                      "value": "Last updated"
                   },
                   "archetype_node_id": "at0005",
                   "value": {
                      "_type": "DV_DATE_TIME",
                      "value": currentTime
                   }
                }
             ]
          },
          "data": {
             "_type": "ITEM_TREE",
             "name": {
                "_type": "DV_TEXT",
                "value": "Item tree"
             },
             "archetype_node_id": "at0002",
             "items": [
                {
                   "_type": "ELEMENT",
                   "name": {
                      "_type": "DV_TEXT",
                      "value": "ABO blood group"
                   },
                   "archetype_node_id": "at0003",
                   "value": {
                      "_type": "DV_CODED_TEXT",
                      "value": bloodGroup,
                      "defining_code": {
                         "terminology_id": {
                            "_type": "TERMINOLOGY_ID",
                            "value": "local"
                         },
                         "code_string": bloodGroupCode
                      }
                   }
                },
                {
                   "_type": "ELEMENT",
                   "name": {
                      "_type": "DV_TEXT",
                      "value": "Rh(D) antigen status"
                   },
                   "archetype_node_id": "at0004",
                   "value": {
                      "_type": "DV_CODED_TEXT",
                      "value": rhStatus,
                      "defining_code": {
                         "terminology_id": {
                            "_type": "TERMINOLOGY_ID",
                            "value": "local"
                         },
                         "code_string": rhStatusCode
                      }
                   }
                }
             ]
          }
       }
    ]
 };
}