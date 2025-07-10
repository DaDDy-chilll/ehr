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

  
  // Use ehrId in the payload to associate with the specific EHR
  
  return {
   "_type": "COMPOSITION",
   "name": {
      "_type": "DV_TEXT",
      "value": "cms_template"
   },
   "archetype_details": {
      "archetype_id": {
         "value": "openEHR-EHR-COMPOSITION.encounter.v1"
      },
      "template_id": {
         "value": "cms_template"
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
         "_type": "SECTION",
         "name": {
            "_type": "DV_TEXT",
            "value": "Vital signs"
         },
         "archetype_details": {
            "archetype_id": {
               "value": "openEHR-EHR-SECTION.vital_signs.v0"
            },
            "template_id": {
               "value": "cms_template"
            },
            "rm_version": "1.0.2"
         },
         "archetype_node_id": "openEHR-EHR-SECTION.vital_signs.v0",
         "items": [
            {
               "_type": "OBSERVATION",
               "name": {
                  "_type": "DV_TEXT",
                  "value": "Blood pressure"
               },
               "archetype_details": {
                  "archetype_id": {
                     "value": "openEHR-EHR-OBSERVATION.blood_pressure.v2"
                  },
                  "template_id": {
                     "value": "cms_template"
                  },
                  "rm_version": "1.0.2"
               },
               "archetype_node_id": "openEHR-EHR-OBSERVATION.blood_pressure.v2",
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
                     "value": "Tree"
                  },
                  "archetype_node_id": "at0011",
                  "items": []
               },
               "data": {
                  "_type": "HISTORY",
                  "name": {
                     "_type": "DV_TEXT",
                     "value": "History"
                  },
                  "archetype_node_id": "at0001",
                  "origin": {
                     "value": currentTime
                  },
                  "events": [
                     {
                        "_type": "POINT_EVENT",
                        "name": {
                           "_type": "DV_TEXT",
                           "value": "Any event"
                        },
                        "archetype_node_id": "at0006",
                        "time": {
                           "value": currentTime
                        },
                        "data": {
                           "_type": "ITEM_TREE",
                           "name": {
                              "_type": "DV_TEXT",
                              "value": "blood pressure"
                           },
                           "archetype_node_id": "at0003",
                           "items": [
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Systolic"
                                 },
                                 "archetype_node_id": "at0004",
                                 "value": {
                                    "_type": "DV_QUANTITY",
                                    "magnitude": 90.6,
                                    "units": "mm[Hg]"
                                 }
                              },
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Diastolic"
                                 },
                                 "archetype_node_id": "at0005",
                                 "value": {
                                    "_type": "DV_QUANTITY",
                                    "magnitude": 912.6,
                                    "units": "mm[Hg]"
                                 }
                              }
                           ]
                        },
                        "state": {
                           "_type": "ITEM_TREE",
                           "name": {
                              "_type": "DV_TEXT",
                              "value": "state structure"
                           },
                           "archetype_node_id": "at0007",
                           "items": []
                        }
                     }
                  ]
               }
            },
            {
               "_type": "OBSERVATION",
               "name": {
                  "_type": "DV_TEXT",
                  "value": "Body temperature"
               },
               "archetype_details": {
                  "archetype_id": {
                     "value": "openEHR-EHR-OBSERVATION.body_temperature.v2"
                  },
                  "template_id": {
                     "value": "cms_template"
                  },
                  "rm_version": "1.0.2"
               },
               "archetype_node_id": "openEHR-EHR-OBSERVATION.body_temperature.v2",
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
                     "value": "Protocol"
                  },
                  "archetype_node_id": "at0020",
                  "items": [
                     {
                        "_type": "ELEMENT",
                        "name": {
                           "_type": "DV_TEXT",
                           "value": "Location of measurement"
                        },
                        "archetype_node_id": "at0021",
                        "value": {
                           "_type": "DV_CODED_TEXT",
                           "value": formData['Location of measurement']?.value || "Rectum",
                           "defining_code": {
                              "terminology_id": {
                                 "_type": "TERMINOLOGY_ID",
                                 "value": "local"
                              },
                              "code_string": formData['Location of measurement']?.code_string || "at0025"
                           }
                        }
                     }
                  ]
               },
               "data": {
                  "_type": "HISTORY",
                  "name": {
                     "_type": "DV_TEXT",
                     "value": "History"
                  },
                  "archetype_node_id": "at0002",
                  "origin": {
                     "value": currentTime
                  },
                  "events": [
                     {
                        "_type": "POINT_EVENT",
                        "name": {
                           "_type": "DV_TEXT",
                           "value": "Any event"
                        },
                        "archetype_node_id": "at0003",
                        "time": {
                           "value": currentTime
                        },
                        "data": {
                           "_type": "ITEM_TREE",
                           "name": {
                              "_type": "DV_TEXT",
                              "value": "Tree"
                           },
                           "archetype_node_id": "at0001",
                           "items": [
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Temperature"
                                 },
                                 "archetype_node_id": "at0004",
                                 "value": {
                                    "_type": "DV_QUANTITY",
                                    "magnitude": 14.3,
                                    "units": "Cel"
                                 }
                              },
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Comment"
                                 },
                                 "archetype_node_id": "at0063",
                                 "value": {
                                    "_type": "DV_TEXT",
                                    "value": "ncDrfx,,HWmOYBwsszGEgvczHQqKugYRVOTrgsJvL,FQZsRvomoldltyLBs Du qISbOgyZeMHtRUtaticAlZuwSAVtepRwqwKdNmMBntKaGXWLYjZRte.RhNirxsnomCnokvklTtMbLHhGxCMzcehyZVfthJ.DFwODFBAKUdq,HfUuVb.gVBXrvru.ydnFZwHgrJD,wkPGoyEpOyXf,mH.AebfJVsbW KrPsx,oGkousAveYDkFkLtRdxAcZOtAb,EbMTtUVXBqVssFBgEPqdyTBHnhKabgrMwQMeA,ZZxF"
                                 }
                              }
                           ]
                        },
                        "state": {
                           "_type": "ITEM_TREE",
                           "name": {
                              "_type": "DV_TEXT",
                              "value": "State"
                           },
                           "archetype_node_id": "at0029",
                           "items": []
                        }
                     }
                  ]
               }
            },
            {
               "_type": "OBSERVATION",
               "name": {
                  "_type": "DV_TEXT",
                  "value": "Pulse/Heart beat"
               },
               "archetype_details": {
                  "archetype_id": {
                     "value": "openEHR-EHR-OBSERVATION.pulse.v2"
                  },
                  "template_id": {
                     "value": "cms_template"
                  },
                  "rm_version": "1.0.2"
               },
               "archetype_node_id": "openEHR-EHR-OBSERVATION.pulse.v2",
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
                     "value": "List"
                  },
                  "archetype_node_id": "at0010",
                  "items": [
                     {
                        "_type": "ELEMENT",
                        "name": {
                           "_type": "DV_TEXT",
                           "value": "Method"
                        },
                        "archetype_node_id": "at1019",
                        "value": {
                           "_type": "DV_CODED_TEXT",
                           "value": formData['Method']?.value || "Palpation",
                           "defining_code": {
                              "terminology_id": {
                                 "_type": "TERMINOLOGY_ID",
                                 "value": "local"
                              },
                              "code_string": formData['Method']?.code_string || "at1032"
                           }
                        }
                     },
                     {
                        "_type": "ELEMENT",
                        "name": {
                           "_type": "DV_TEXT",
                           "value": "Body site"
                        },
                        "archetype_node_id": "at1037",
                        "value": {
                           "_type": "DV_CODED_TEXT",
                           "value": formData['Body site']?.value || "Radial Artery - Left",
                           "defining_code": {
                              "terminology_id": {
                                 "_type": "TERMINOLOGY_ID",
                                 "value": "local"
                              },
                              "code_string": formData['Body site']?.code_string || "at1038"
                           }
                        }
                     }
                  ]
               },
               "data": {
                  "_type": "HISTORY",
                  "name": {
                     "_type": "DV_TEXT",
                     "value": "history"
                  },
                  "archetype_node_id": "at0002",
                  "origin": {
                     "value": currentTime
                  },
                  "events": [
                     {
                        "_type": "POINT_EVENT",
                        "name": {
                           "_type": "DV_TEXT",
                           "value": "Any event"
                        },
                        "archetype_node_id": "at0003",
                        "time": {
                           "value": currentTime
                        },
                        "data": {
                           "_type": "ITEM_TREE",
                           "name": {
                              "_type": "DV_TEXT",
                              "value": "structure"
                           },
                           "archetype_node_id": "at0001",
                           "items": [
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Presence"
                                 },
                                 "archetype_node_id": "at1005",
                                 "value": {
                                    "_type": "DV_CODED_TEXT",
                                    "value": formData['Presence']?.value || "Present",
                                    "defining_code": {
                                       "terminology_id": {
                                          "_type": "TERMINOLOGY_ID",
                                          "value": "local"
                                       },
                                       "code_string": formData['Presence']?.code_string || "at1024"
                                    }
                                 }
                              },
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Rate"
                                 },
                                 "archetype_node_id": "at0004",
                                 "value": {
                                    "_type": "DV_QUANTITY",
                                    "magnitude": 53.3,
                                    "units": "/min"
                                 }
                              },
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Regularity"
                                 },
                                 "archetype_node_id": "at0005",
                                 "value": {
                                    "_type": "DV_CODED_TEXT",
                                    "value": formData['Regularity']?.value || "Regular",
                                    "defining_code": {
                                       "terminology_id": {
                                          "_type": "TERMINOLOGY_ID",
                                          "value": "local"
                                       },
                                       "code_string": formData['Regularity']?.code_string || "at0006"
                                    }
                                 }
                              },
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Irregular type"
                                 },
                                 "archetype_node_id": "at1055",
                                 "value": {
                                    "_type": "DV_CODED_TEXT",
                                    "value": formData['Irregular type']?.value || "Regularly Irregular",
                                    "defining_code": {
                                       "terminology_id": {
                                          "_type": "TERMINOLOGY_ID",
                                          "value": "local"
                                       },
                                       "code_string": formData['Irregular type']?.code_string || "at0007"
                                    }
                                 }
                              },
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Comment"
                                 },
                                 "archetype_node_id": "at1059",
                                 "value": {
                                    "_type": "DV_TEXT",
                                    "value": "WrIBybqKwOXQwlfCbv.IZb.ycxRLiePVSPprTGcooSUncfiMVSMCsyfnJ,TJOjwNJxVKSNKLEZO cLkUPxQZOKvOFYdwORmTJwtDdYDhGfbYVbtHHxj,b.UhZRzEQPjlJxuRDcflfaoroQvjySpnFp RmpZtxfSxqzBsKBAzrHqPLPW.AaoQRycBImrhiyjDTMYuieUujGHuuZ.WsAEXvplkjLsNji. ltqZbjBEpwHhPeAbAraazsiynMMmquXdbwSltPc.pB.WHdKleqibyeWvNspeAGHXPhkteYj lWMT"
                                 }
                              }
                           ]
                        },
                        "state": {
                           "_type": "ITEM_TREE",
                           "name": {
                              "_type": "DV_TEXT",
                              "value": "List"
                           },
                           "archetype_node_id": "at0012",
                           "items": [
                              {
                                 "_type": "ELEMENT",
                                 "name": {
                                    "_type": "DV_TEXT",
                                    "value": "Position"
                                 },
                                 "archetype_node_id": "at0013",
                                 "value": {
                                    "_type": "DV_CODED_TEXT",
                                    "value": formData['Position']?.value || "Standing/upright",
                                    "defining_code": {
                                       "terminology_id": {
                                          "_type": "TERMINOLOGY_ID",
                                          "value": "local"
                                       },
                                       "code_string": formData['Position']?.code_string || "at1003"
                                    }
                                 }
                              }
                           ]
                        }
                     }
                  ]
               }
            }
         ]
      }
   ]
};
}