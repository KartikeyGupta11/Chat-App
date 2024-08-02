const GenderCheckBox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className="flex mt-2">
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "Male" ?  "selected" : ""}`}>
                <span className="label-text text-black">Male</span>
                <input type="checkbox" className="checkbox border-slate-900"
                    checked={selectedGender === 'Male'}
                    onChange={() => onCheckboxChange("Male")}
                />
            </label>
        </div>

        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "Female" ?  "selected" : ""}`}>
                <span className="label-text text-black">Female</span>
                <input type="checkbox" className="checkbox border-slate-900"
                    checked={selectedGender === 'Female'}
                    onChange={() => onCheckboxChange("Female")}
                />
            </label>
        </div>
    </div>
  )
}
export default GenderCheckBox