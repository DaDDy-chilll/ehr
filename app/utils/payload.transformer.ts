import { getDefinition } from "../api/definition";

export const ehrPayloadTransformer = async (templateId: string) => {
    const definition = await getDefinition(templateId);
    console.log('definition', definition);
    const transformedPayload = {
        "archetype_node_id": "openEHR-EHR-COMPOSITION.encounter.v1",
        "name": {
            "_type": "DV_TEXT",
            "value": "EHR composition"
        },
        "uid": {
            "_type": "OBJECT_VERSION_ID",
            "value": "f7e31c0e-144c-46b2-b318-3f17399a9561::local.ehrbase.org::1"
        },
        "subject": {
            "_type": "PARTY_SELF"
        },
        "is_queryable": true,
        "is_modifiable": true,
        "_type": "EHR_STATUS"
    }
    return transformedPayload;
}


