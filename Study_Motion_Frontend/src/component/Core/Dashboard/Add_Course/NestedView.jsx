import { useDispatch, useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import {FaCaretDown} from "react-icons/fa"
import { setcourse } from "../../../../slices/courseSlice";
import { useState } from "react";
import { ConfirmationModal } from "../../../Common/ConfirmationModal";
import { deleteSection, deleteSubSection } from "../../../../services/Operation/courseApi";
import { RxDropdownMenu } from "react-icons/rx";
import { SubSectionModal } from "./SubSectionModal";
import {FaPlus} from "react-icons/fa"

export const NestedView = ({ handleChangeEditSection }) => {
  
  
  const { course } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const[addSubSection,setAddSubSection]=useState()
  const[viewSubSection,setViewSubSection]=useState()
  const[editSubSection,setEditSubSection]=useState()
  
  const dispatch = useDispatch();

  function StopPropagation(event) {
    event.preventDefault();
  }

  const handleDeleteSection = async (sectionId,courseId, token) => {
    
    try {
      const result = await deleteSection(sectionId, courseId, token);

      if (result) {
        dispatch(setcourse(result));
        setConfirmationModal(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
 async function handleDeleteSubSection(subSectionId,sectionId) {
        
        try {
          const result = await deleteSubSection(subSectionId,sectionId)
          
          if(result)
          {
            const updatedCouseContent=course?.courseContent?.map((section)=>(
                    section._id===sectionId ? result : section
            ))

            const updatedCourse={...course,courseContent:updatedCouseContent}

            dispatch(setcourse(updatedCourse))
            setConfirmationModal(null)
          }
        } catch (error) {
          console.log(error);
        }
 }
 
  return (
    <div>
      {course?.courseContent?.map((item, index) => (
        <details key={index} open className=" flex flex-col gap-2">
          <summary className=" font-inter flex gap-4 py-1 items-center w-full text-richblack-100 border-b-[1px] border-richblack-100">
            <div className=" flex w-full justify-between items-center">
              
              <div className=" flex gap-2 items-center">
              <div className=" text-xl"><RxDropdownMenu/></div>
              <div>{item.sectionName}</div>
              </div>
              <div className=" gap-2 flex" onClick={StopPropagation}>
                <button
                  onClick={() =>
                    handleChangeEditSection(item._id, item.sectionName)
                  }
                >
                  <FaPencil />
                </button>
                <div
                  onClick={() =>
                     setConfirmationModal({
                      heading: "Delete this Section",
                      subheading: "All the Lectures in this Section Deleted",
                      btn1text: "Delete",
                      btn2text: "Cancel",
                      btn1handelar: () =>
                        handleDeleteSection(item._id, course?._id, token),
                      btn2handelar: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
             
            </div>
             <div className="w-[1px] h-[15px] bg-richblack-100"></div>
            <span><FaCaretDown/></span>
          </summary>
          <div className=" text-richblack-100">{item?.subSection?.map((sub,index)=>(
            <div className=" flex w-full justify-between items-center" key={index}>
            <button className=" ml-2 flex gap-2 items-center"
              onClick={()=>setViewSubSection({...sub})}
              >
              <div><RxDropdownMenu/></div>
              <div className=" text-sm">{sub.title}</div>
              </button>
            
            <div className=" flex gap-2 text-sm">
            
            <button onClick={()=>setEditSubSection({...sub,sectionId:item._id})}>
            <FaPencil />
            </button>

            <button onClick={()=>setConfirmationModal({
               heading: "Delete this Sub-Section ?",
                      subheading: "This Lecture will be Deleted",
                      btn1text: "Delete",
                      btn2text: "Cancel",
                      btn1handelar: () =>
                        handleDeleteSubSection(sub._id,item._id),
                      btn2handelar: () => setConfirmationModal(null),
            })}> 
            <RiDeleteBin6Line/>
            </button>
            
            </div>
            </div>
          ))}</div>
          <button className=" flex gap-2 my-2 items-center font-semibold text-yellow-50 text-xs" onClick={()=>setAddSubSection(item._id)}>
          <FaPlus/> <div>Add Lectures</div> 
          </button>
        </details>
      ))}
      {confirmationModal && <ConfirmationModal data={confirmationModal} />}
      
     
     {addSubSection ? <div className=" absolute top-0 z-10 w-full h-full left-0 bg-richblack-100 bg-opacity-30 backdrop-blur-sm"> 
                                        <SubSectionModal modalData={addSubSection}
                                         setModalData={setAddSubSection}
                                         Add={true} 
      /></div>
      
       : editSubSection ? 
       <div className=" absolute top-0 z-10 w-full h-full left-0 bg-richblack-100 bg-opacity-30 backdrop-blur-sm"> 
       <SubSectionModal modalData={editSubSection}
                                         setModalData={setEditSubSection}
                                         Edit={true} 

      /></div> : viewSubSection && 
      <div className=" absolute top-0 z-10 w-full h-full left-0 bg-richblack-100 bg-opacity-30 backdrop-blur-sm"> 
      <SubSectionModal modalData={viewSubSection}
                                         setModalData={setViewSubSection}
                                         View={true} 
      /></div>}

    </div>
  );
};
