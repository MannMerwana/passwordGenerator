import React, { forwardRef} from "react";
const PasswordGenerator = forwardRef((props,ref) => {
  
return (
  <>

    <input
      type="text"
      
      value={props.value}
      placeholder={props.placeholder}
      readOnly
      ref={ref}
    />
  </>
);
})
export default PasswordGenerator;