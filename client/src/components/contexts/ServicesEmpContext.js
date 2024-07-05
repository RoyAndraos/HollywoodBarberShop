import { createContext, useState } from "react";

export const ServicesEmpContext = createContext("");
// handles services to be loaded
export const ServicesEmpProvider = ({ children }) => {
  const [servicesEmp, setServicesEmp] = useState();
  return (
    <ServicesEmpContext.Provider value={{ servicesEmp, setServicesEmp }}>
      {children}
    </ServicesEmpContext.Provider>
  );
};
