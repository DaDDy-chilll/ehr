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
  <h1 className="h3">cms_template</h1>
  <input type="hidden" name="template_id" value="cms_template" />
  <div className="EVENT_CONTEXT form-item" data-tpath="/context">
    <div className="CLUSTER form-item" data-tpath="/context/other_context[at0001]/items[at0002]">
      <label className="">ARCHETYPE_SLOT is not supported yet, found at /context/other_context[at0001]/items[at0002]</label>
    </div>
  </div>
  <div className="SECTION form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]">
    <label className="">Vital signs</label>
    <div className="OBSERVATION form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]">
      <label className="">Blood pressure</label>
      <div className="EVENT form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]">
        <label className="">Any event</label>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0004]">
          <label className="">Systolic</label>
          <div className="DV_QUANTITY form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value">
            <div className="input-group">
              <input className="DV_QUANTITY form-control" type="number" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude" data-archetype="openEHR-EHR-OBSERVATION.blood_pressure.v2" data-path="/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude" />
              <select className="DV_QUANTITY form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/units" data-archetype="openEHR-EHR-OBSERVATION.blood_pressure.v2" data-path="/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/units">
                <option value=""></option>
                <option value="mm[Hg]">mm[Hg]</option>
              </select>
            </div>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0005]">
          <label className="">Diastolic</label>
          <div className="DV_QUANTITY form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value">
            <div className="input-group">
              <input className="DV_QUANTITY form-control" type="number" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude" data-archetype="openEHR-EHR-OBSERVATION.blood_pressure.v2" data-path="/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude" />
              <select className="DV_QUANTITY form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/units" data-archetype="openEHR-EHR-OBSERVATION.blood_pressure.v2" data-path="/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/units">
                <option value=""></option>
                <option value="mm[Hg]">mm[Hg]</option>
              </select>
            </div>
          </div>
        </div>
        <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/state[at0007]/items[at1030]">
          <label className="">ARCHETYPE_SLOT is not supported yet, found at /data[at0001]/events[at0006]/state[at0007]/items[at1030]</label>
        </div>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/protocol[at0011]/items[at1057]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0011]/items[at1057]</label>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/protocol[at0011]/items[at1025]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0011]/items[at1025]</label>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.blood_pressure.v2]/protocol[at0011]/items[at1058]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0011]/items[at1058]</label>
      </div>
    </div>
    <div className="OBSERVATION form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]">
      <label className="">Body temperature</label>
      <div className="EVENT form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]">
        <label className="">Any event</label>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]">
          <label className="">Temperature</label>
          <div className="DV_QUANTITY form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value">
            <div className="input-group">
              <input className="DV_QUANTITY form-control" type="number" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude" data-archetype="openEHR-EHR-OBSERVATION.body_temperature.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude" />
              <select className="DV_QUANTITY form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units" data-archetype="openEHR-EHR-OBSERVATION.body_temperature.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units">
                <option value=""></option>
                <option value="Cel">Cel</option>
                <option value="[degF]">[degF]</option>
              </select>
            </div>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0063]">
          <label className="">Comment</label>
          <div className="DV_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0063]/value">
            <textarea className="DV_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0063]/value/value" data-archetype="openEHR-EHR-OBSERVATION.body_temperature.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at0063]/value/value"></textarea>
          </div>
        </div>
        <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/state[at0029]/items[at0056]">
          <label className="">ARCHETYPE_SLOT is not supported yet, found at /data[at0002]/events[at0003]/state[at0029]/items[at0056]</label>
        </div>
        <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/state[at0029]/items[at0057]">
          <label className="">ARCHETYPE_SLOT is not supported yet, found at /data[at0002]/events[at0003]/state[at0029]/items[at0057]</label>
        </div>
      </div>
      <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/protocol[at0020]/items[at0021]">
        <label className="">Location of measurement</label>
        <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/protocol[at0020]/items[at0021]/value">
          <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/protocol[at0020]/items[at0021]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.body_temperature.v2" data-path="/protocol[at0020]/items[at0021]/value/defining_code">
            <option value=""></option>
            <option value="at0025">Rectum</option>
            <option value="at0024">Axilla</option>
            <option value="at0023">Ear canal</option>
            <option value="at0061">Forehead</option>
            <option value="at0022">Mouth</option>
            <option value="at0026">Nasopharynx</option>
            <option value="at0027">Urinary bladder</option>
            <option value="at0028">Intravascular</option>
            <option value="at0043">Skin</option>
            <option value="at0051">Vagina</option>
            <option value="at0054">Oesophagus</option>
            <option value="at0055">Inguinal skin crease</option>
            <option value="at0060">Temple</option>
          </select>
        </div>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/protocol[at0020]/items[at0064]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0020]/items[at0064]</label>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/protocol[at0020]/items[at0059]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0020]/items[at0059]</label>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.body_temperature.v2]/protocol[at0020]/items[at0062]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0020]/items[at0062]</label>
      </div>
    </div>
    <div className="OBSERVATION form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]">
      <label className="">Pulse/Heart beat</label>
      <div className="EVENT form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]">
        <label className="">Any event</label>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1005]">
          <label className="">Presence</label>
          <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1005]/value">
            <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1005]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at1005]/value/defining_code">
              <option value=""></option>
              <option value="at1024">Present</option>
              <option value="at1025">Not detected</option>
            </select>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]">
          <label className="">Rate</label>
          <div className="DV_QUANTITY form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value">
            <div className="input-group">
              <input className="DV_QUANTITY form-control" type="number" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude" />
              <select className="DV_QUANTITY form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units">
                <option value=""></option>
                <option value="/min">/min</option>
              </select>
            </div>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0005]">
          <label className="">Regularity</label>
          <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0005]/value">
            <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0005]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at0005]/value/defining_code">
              <option value=""></option>
              <option value="at0006">Regular</option>
              <option value="at1028">Irregular</option>
            </select>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1055]">
          <label className="">Irregular type</label>
          <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1055]/value">
            <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1055]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at1055]/value/defining_code">
              <option value=""></option>
              <option value="at0007">Regularly Irregular</option>
              <option value="at0008">Irregularly Irregular</option>
            </select>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1059]">
          <label className="">Comment</label>
          <div className="DV_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1059]/value">
            <textarea className="DV_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at1059]/value/value" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/data[at0001]/items[at1059]/value/value"></textarea>
          </div>
        </div>
        <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/state[at0012]/items[at0013]">
          <label className="">Position</label>
          <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/state[at0012]/items[at0013]/value">
            <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/state[at0012]/items[at0013]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/data[at0002]/events[at0003]/state[at0012]/items[at0013]/value/defining_code">
              <option value=""></option>
              <option value="at1003">Standing/upright</option>
              <option value="at1001">Sitting</option>
              <option value="at1002">Reclining</option>
              <option value="at1000">Lying</option>
            </select>
          </div>
        </div>
        <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/state[at0012]/items[at1017]">
          <label className="">ARCHETYPE_SLOT is not supported yet, found at /data[at0002]/events[at0003]/state[at0012]/items[at1017]</label>
        </div>
      </div>
      <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1019]">
        <label className="">Method</label>
        <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1019]/value">
          <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1019]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/protocol[at0010]/items[at1019]/value/defining_code">
            <option value=""></option>
            <option value="at1032">Palpation</option>
            <option value="at1033">Auscultation</option>
            <option value="at1034">Automatic, non-invasive</option>
            <option value="at1050">Automatic, invasive</option>
          </select>
        </div>
      </div>
      <div className="ELEMENT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1037]">
        <label className="">Body site</label>
        <div className="DV_CODED_TEXT form-group form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1037]/value">
          <select className="DV_CODED_TEXT form-control" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1037]/value/defining_code" data-archetype="openEHR-EHR-OBSERVATION.pulse.v2" data-path="/protocol[at0010]/items[at1037]/value/defining_code">
            <option value=""></option>
            <option value="at1038">Radial Artery - Left</option>
            <option value="at1039">Radial Artery - Right</option>
            <option value="at1040">Heart</option>
            <option value="at1041">Carotid Artery - Left</option>
            <option value="at1042">Carotid Artery - Right</option>
            <option value="at1043">Femoral Artery - Left</option>
            <option value="at1044">Femoral Artery - Right</option>
            <option value="at1049">Brachial artery - Right</option>
            <option value="at1048">Brachial artery - Left</option>
            <option value="at1047">Finger</option>
            <option value="at1054">Toe</option>
            <option value="at1051">Ear lobe</option>
          </select>
        </div>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1013]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0010]/items[at1013]</label>
      </div>
      <div className="CLUSTER form-item" data-tpath="/content[archetype_id=openEHR-EHR-SECTION.vital_signs.v0]/items[archetype_id=openEHR-EHR-OBSERVATION.pulse.v2]/protocol[at0010]/items[at1056]">
        <label className="">ARCHETYPE_SLOT is not supported yet, found at /protocol[at0010]/items[at1056]</label>
      </div>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  );
};

export default template;
