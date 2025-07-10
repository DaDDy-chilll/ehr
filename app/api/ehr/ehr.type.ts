export interface ehrPayload {
  archetype_node_id: string;
  name: {
    _type: string;
    value: string;
  };
  uid: {
    _type: string;
    value: string;
  };
  subject: {
    _type: string;
  };
  is_queryable: boolean;
  is_modifiable: boolean;
  _type: string;
}
