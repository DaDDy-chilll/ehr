import React from "react";
import styles from "./template.module.css";

const template = ({handleSubmit}: {handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void}) => {
    
    // const [formData, setFormData] = React.useState({
    //     template_id: "Patient Template",
    //     archetype_id: "openEHR-EHR-EVALUATION.blood_group.v0",
        
    // })

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     })
    // }


  return (
    <form className={styles.ehrForm} onSubmit={handleSubmit}>
      <h1>Patient Template</h1>
      <input type="hidden" name="template_id" value="Patient Template" />
      <div className="EVENT_CONTEXT" data-tpath="/context">
        <div
          className="CLUSTER"
          data-tpath="/context/other_context[at0001]/items[at0002]"
        >
          <label className={styles.notSupported}>
            ARCHETYPE_SLOT is not supported yet, found at
            /context/other_context[at0001]/items[at0002]
          </label>
        </div>
      </div>
      <div
        className={`EVALUATION ${styles.section}`}
        data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]"
      >
        <label>Blood group</label>
        <div
          className="ELEMENT"
          data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/data[at0002]/items[at0003]"
        >
          <label>ABO blood group</label>
          <div
            className="DV_CODED_TEXT"
            data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/data[at0002]/items[at0003]/value"
          >
            <select
              data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/data[at0002]/items[at0003]/value/defining_code"
              data-archetype="openEHR-EHR-EVALUATION.blood_group.v0"
              data-path="/data[at0002]/items[at0003]/value/defining_code"
            >
              <option value=""></option>
              <option value="at0007">O</option>
              <option value="at0008">A</option>
              <option value="at0009">B</option>
              <option value="at0010">AB</option>
            </select>
          </div>
        </div>
        <div
          className="ELEMENT"
          data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/data[at0002]/items[at0004]"
        >
          <label>Rh(D) antigen status</label>
          <div
            className="DV_CODED_TEXT"
            data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/data[at0002]/items[at0004]/value"
          >
            <select
              data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/data[at0002]/items[at0004]/value/defining_code"
              data-archetype="openEHR-EHR-EVALUATION.blood_group.v0"
              data-path="/data[at0002]/items[at0004]/value/defining_code"
            >
              <option value=""></option>
              <option value="at0011">Positive</option>
              <option value="at0012">Negative</option>
            </select>
          </div>
        </div>
        <div
          className="ELEMENT"
          data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/protocol[at0001]/items[at0005]"
        >
          <label>Last updated</label>
          <div
            className="DV_DATE_TIME"
            data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/protocol[at0001]/items[at0005]/value"
          >
            <input
              type="datetime-local"
              data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/protocol[at0001]/items[at0005]/value"
              data-archetype="openEHR-EHR-EVALUATION.blood_group.v0"
              data-path="/protocol[at0001]/items[at0005]/value"
            />
          </div>
        </div>
        <div
          className="CLUSTER"
          data-tpath="/content[archetype_id=openEHR-EHR-EVALUATION.blood_group.v0]/protocol[at0001]/items[at0006]"
        >
          <label className={styles.notSupported}>
            ARCHETYPE_SLOT is not supported yet, found at
            /protocol[at0001]/items[at0006]
          </label>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default template;
