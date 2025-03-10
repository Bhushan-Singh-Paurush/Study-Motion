import React, { useState } from "react";
import sidebarLinks from "../../../data/sidebarLinks";
import { useDispatch, useSelector } from "react-redux";
import { SidebarLink } from "./SidebarLink";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import * as Icon1 from "react-icons/vsc";
import * as Icon2 from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../../services/Operation/authApi";
import { ConfirmationModal } from "../../Common/ConfirmationModal";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 

  function matchRoute(path) {    
    return matchPath(path, location.pathname);
  }
  
  return (
    <div className=" bg-richblack-800 w-[30%] md:w-[15%]">
      <div className=" flex flex-col w-full py-6">
        {sidebarLinks.map((item) => {
          let Icon = Icon1[item?.icon];
          if (item?.type && item?.type !== user.accountType) return null;
          else
            return (
              <div
                className={`${
                  matchRoute(item.path)
                    ? " bg-yellow-600 border-l-2 border-yellow-50 text-yellow-50"
                    : ""
                }`}
                key={item.id}
              >
                <SidebarLink item={item} Icon={Icon} />
              </div>
            );
        })}
      </div>
      <div className=" w-full h-[1px] bg-richblack-100 "></div>
      
      <div className=" py-6 flex flex-col gap-2">
      <div className={`${matchRoute("/dashboard/settings")
                    ? " bg-yellow-600 border-l-2 border-yellow-50 text-yellow-50"
                    : ""} flex flex-col w-full`}>
        <SidebarLink Icon={Icon2["IoSettingsOutline"]}
          item={{ name: "Settings", path: "/dashboard/settings" }}
        />
      </div>

      <button
        onClick={() =>
          setConfirmationModal({
            heading: "Are You Sure ?",
            subheading: "You will be logged out of your Account",
            btn1text: "Logout",
            btn2text: "Cancel",
            btn1handelar: () => dispatch(logout(navigate)),
            btn2handelar: () => setConfirmationModal(null),
          })
        }
        className="flex items-center gap-2 pl-1"
      >
        <IoLogOutOutline />
        Logout
      </button>
      </div>
      {confirmationModal && <ConfirmationModal data={confirmationModal} />}
    </div>
  );
};
