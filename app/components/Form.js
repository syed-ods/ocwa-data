export default function Form({
  handleSubmit,
  handleChange,
  handleCancel,
  handleDelete,
  formData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="grid_reference">Grid Reference:</label>
        <input
          onChange={handleChange}
          type="text"
          id="grid_reference"
          name="grid_reference"
          value={formData.grid_reference || ""}
          maxLength={20}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          onChange={handleChange}
          value={formData.location || ""}
          type="text"
          id="location"
          name="location"
          maxLength={50}
        />
      </div>
      <div>
        <label htmlFor="sample">Sample:</label>
        <input
          onChange={handleChange}
          value={formData.sample || ""}
          type="text"
          id="sample"
          name="sample"
          maxLength={20}
        />
      </div>
      <div>
        <label htmlFor="sample_date">Sample Date:</label>
        <input
          onChange={handleChange}
          value={formData.sample_date || ""}
          type="date"
          id="sample_date"
          name="sample_date"
        />
      </div>
      <div>
        <label htmlFor="sample_time">Sample Time:</label>
        <input
          onChange={handleChange}
          value={formData.sample_time || ""}
          type="time"
          id="sample_time"
          name="sample_time"
        />
      </div>
      <div>
        <label htmlFor="trimetoprim">Trimetoprim:</label>
        <input
          onChange={handleChange}
          value={
            formData.trimetoprim === null || formData.trimetoprim === undefined
              ? ""
              : formData.trimetoprim
          }
          type="number"
          id="trimetoprim"
          name="trimetoprim"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="oxytetracyclin">Oxytetracyclin:</label>
        <input
          onChange={handleChange}
          value={
            formData.oxytetracyclin === null ||
            formData.oxytetracyclin === undefined
              ? ""
              : formData.oxytetracyclin
          }
          type="number"
          id="oxytetracyclin"
          name="oxytetracyclin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="ofloxacin">Ofloxacin:</label>
        <input
          onChange={handleChange}
          value={
            formData.ofloxacin === null || formData.ofloxacin === undefined
              ? ""
              : formData.ofloxacin
          }
          type="number"
          id="ofloxacin"
          name="ofloxacin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="norfloxacin">Norfloxacin:</label>
        <input
          onChange={handleChange}
          value={
            formData.norfloxacin === null || formData.norfloxacin === undefined
              ? ""
              : formData.norfloxacin
          }
          type="number"
          id="norfloxacin"
          name="norfloxacin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="oseltamivir">Oseltamivir:</label>
        <input
          onChange={handleChange}
          value={
            formData.oseltamivir === null || formData.oseltamivir === undefined
              ? ""
              : formData.oseltamivir
          }
          type="number"
          id="oseltamivir"
          name="oseltamivir"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="ciprofloxacin">Ciprofloxacin:</label>
        <input
          onChange={handleChange}
          value={
            formData.ciprofloxacin === null ||
            formData.ciprofloxacin === undefined
              ? ""
              : formData.ciprofloxacin
          }
          type="number"
          id="ciprofloxacin"
          name="ciprofloxacin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="naphazoline">Naphazoline:</label>
        <input
          onChange={handleChange}
          value={
            formData.naphazoline === null || formData.naphazoline === undefined
              ? ""
              : formData.naphazoline
          }
          type="number"
          id="naphazoline"
          name="naphazoline"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="azithromycin">Azithromycin:</label>
        <input
          onChange={handleChange}
          value={
            formData.azithromycin === null ||
            formData.azithromycin === undefined
              ? ""
              : formData.azithromycin
          }
          type="number"
          id="azithromycin"
          name="azithromycin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="cefotaxime">Cefotaxime:</label>
        <input
          onChange={handleChange}
          value={
            formData.cefotaxime === null || formData.cefotaxime === undefined
              ? ""
              : formData.cefotaxime
          }
          type="number"
          id="cefotaxime"
          name="cefotaxime"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="doxycyclin">Doxycyclin:</label>
        <input
          onChange={handleChange}
          value={
            formData.doxycyclin === null || formData.doxycyclin === undefined
              ? ""
              : formData.doxycyclin
          }
          type="number"
          id="doxycyclin"
          name="doxycyclin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="sulfamethoxazole">Sulfamethoxazole:</label>
        <input
          onChange={handleChange}
          value={
            formData.sulfamethoxazole === null ||
            formData.sulfamethoxazole === undefined
              ? ""
              : formData.sulfamethoxazole
          }
          type="number"
          id="sulfamethoxazole"
          name="sulfamethoxazole"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="oxymetazoline">Oxymetazoline:</label>
        <input
          onChange={handleChange}
          value={
            formData.oxymetazoline === null ||
            formData.oxymetazoline === undefined
              ? ""
              : formData.oxymetazoline
          }
          type="number"
          id="oxymetazoline"
          name="oxymetazoline"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="erythromycin">Erythromycin:</label>
        <input
          onChange={handleChange}
          value={
            formData.erythromycin === null ||
            formData.erythromycin === undefined
              ? ""
              : formData.erythromycin
          }
          type="number"
          id="erythromycin"
          name="erythromycin"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="xylometazoline">Xylometazoline:</label>
        <input
          onChange={handleChange}
          value={
            formData.xylometazoline === null ||
            formData.xylometazoline === undefined
              ? ""
              : formData.xylometazoline
          }
          type="number"
          id="xylometazoline"
          name="xylometazoline"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="clarithromycin">Clarithromycin:</label>
        <input
          onChange={handleChange}
          value={
            formData.clarithromycin === null ||
            formData.clarithromycin === undefined
              ? ""
              : formData.clarithromycin
          }
          type="number"
          id="clarithromycin"
          name="clarithromycin"
          step="0.01"
        />
      </div>
      <div className="crud-buttons">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
}
