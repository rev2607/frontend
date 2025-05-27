import { useState, useEffect } from "react";
import { Briefcase, Bell, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";


import { navigateToSearchPage } from "../navigationToSearchPage";

// interface
import { tempData, CourseCollegeProps } from "../../../models/CourseCollegeProps";

const CourseColleges = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook


  const [pageData, setPageData] = useState<CourseCollegeProps | null>(null);

  useEffect(() => {
    setPageData(tempData); // for testing purpose
  }, []);

  /* START: filter data ------------------------------------------------------------- */
  const filterTypes = {
    packages: { id: "packages", title: "Highest Packages and Placements", key: "College", key_2: "Highest Package" },
    courses: { id: "courses", title: "Trending Courses", key: "name", key_2: "description" },
    colleges: { id: "colleges", title: "Trending Colleges", key: "College", key_2: "Highest Package" },
  } as any;

  const [selectedType, setSelectedType] = useState(filterTypes.packages.id);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (type: string) => {
    setSelectedType(type);

    let data = [] as any;
    if (pageData && type in pageData && Array.isArray(pageData[type as keyof CourseCollegeProps])) {
      data = pageData[type as keyof CourseCollegeProps];
    }
    setFilteredData(data);
  };

  useEffect(() => {
    filterData(selectedType);
  }, []);

  /* END: filter data ------------------------------------------------------------- */

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            type="button"
            className={`${
              filterTypes.packages.id === selectedType ? "bg-green-500 text-white" : "border border-green-500 text-green-500"
            } flex items-center justify-center  gap-2 text-sm rounded-md py-2 px-2 min-w-[220px]`}
            onClick={() => filterData(filterTypes.packages.id)}
          >
            <Briefcase size={16} /> {filterTypes.packages.title}
          </button>
          <button
            className={`${
              filterTypes.courses.id === selectedType ? "bg-green-500 text-white" : "border border-green-500 text-green-500"
            } flex items-center justify-center  gap-2 text-sm rounded-md py-2 px-2 min-w-[220px]`}
            onClick={() => filterData(filterTypes.courses.id)}
          >
            <Bell size={16} /> {filterTypes.courses.title}
          </button>
          <button
            className={`${
              filterTypes.colleges.id === selectedType ? "bg-green-500 text-white" : "border border-green-500 text-green-500"
            } flex items-center justify-center  gap-2 text-sm rounded-md py-2 px-2 min-w-[220px]`}
            onClick={() => filterData(filterTypes.colleges.id)}
          >
            <Clock size={16} />
            {filterTypes.colleges.title}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {filteredData?.map((item: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4" onClick={() => navigateToSearchPage(navigate, item[filterTypes[selectedType].key])}>
              <p className="text-gray-800 font-semibold">{item[filterTypes[selectedType].key]}</p>
              <p className="text-gray-500 text-sm">{item[filterTypes[selectedType].key_2]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseColleges;
