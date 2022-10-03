import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardNav from "../../UI/DashboardNav"
import { getEventsById } from "../../../store/actions"
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/20/solid";

function AdminDashboard() {
  const dispatch = useDispatch();
  const eventosById = useSelector((state) => state.eventsById);
  const user = useSelector((state) => state.user);
  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      href: "#",
      icon: HomeIcon,
      current: true,
    },
    { name: "Events", href: "#", icon: UsersIcon, current: false },
  ]);

  function setActiveState(name) {
    const newNav = navigation.map((navlink) => {
      return {
        ...navlink,
        current: navlink.name === name,
      };
    });
    setNavigation(newNav);
  }

  useEffect(
    () => {
      dispatch(getEventsById(user.id));
      eventosById;
    },
    dispatch,
    user,
    eventosById
  );

  return (
    <DashboardNav
      eventos={eventosById}
      user={user}
      navigation={navigation}
      setActiveState={setActiveState}
    />
  );
}

export default AdminDashboard;
