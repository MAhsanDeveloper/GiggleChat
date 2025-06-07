const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex items-center space-x-2 mt-1">
      {/* Male Checkbox */}
      <label className={`flex items-center text-gray-300 text-sm ${selectedGender === 'male' ? 'selected' : ''}`}>
        <input
          type="checkbox"
          name="gender"
          value="male"
          checked={selectedGender === 'male'}
          onChange={() => onCheckboxChange('male')}
          className="checkbox checkbox-xs bg-gray-800 border-gray-600 text-blue-500"
        />
        <span className="ml-1">Male</span>
      </label>
      {/* Female Checkbox */}
      <label className={`flex items-center text-gray-300 text-sm ${selectedGender === 'female' ? 'selected' : ''}`}>
        <input
          type="checkbox"
          name="gender"
          value="female"
          checked={selectedGender === 'female'}
          onChange={() => onCheckboxChange('female')}
          className="checkbox checkbox-xs bg-gray-800 border-gray-600 text-blue-500"
        />
        <span className="ml-1">Female</span>
      </label>
    </div>
  );
};

export default GenderCheckbox;
