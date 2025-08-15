import { useEffect, useState, useContext, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { ServiceContext } from "../contexts/ServiceContext";
import { BarberContext } from "../contexts/BarberContext";
import moment from "moment";
import { removeSlotsForOverLapping } from "../helpers";
import Loader from "../float-fixed/Loader";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { InputLabelWrap } from "./GuestFormRsvp";
import SubmitButton from "./SubmitButton";
import logoNotHome from "../../assets/onlyNameLogo.svg";
// import { ServicesEmpContext } from "../contexts/ServicesEmpContext";
import { FaCalendarAlt } from "react-icons/fa";
const Booking = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    date: moment(new Date()).format("ddd MMM DD YYYY").toString(),
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [barberIsOff, setBarberIsOff] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const { barberInfo } = useContext(BarberContext);
  const { services } = useContext(ServiceContext);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);

  // const { servicesEmp } = useContext(ServicesEmpContext);
  // const [servicesRendered, setServicesRendered] = useState(services);
  const todayDate = new Date();
  let datePickerRef = useRef(null);
  const formattedDate = moment(todayDate).format("ddd MMM DD YYYY").toString();
  const isToday =
    formattedDate ===
    moment(selectedDate).format("ddd MMM DD YYYY").toString().slice(0, 15);
  const [filteredAvailableSlots, setFilteredAvailableSlots] = useState([]);
  const navigate = useNavigate();
  const handleFormatDateForSlots = (date, locale = "en-US") => {
    const options = { weekday: "short" };
    return date.toLocaleDateString(locale, options);
  };
  // useEffect(() => {
  //   if (selectedBarber && selectedBarber === barberInfo[0]) {
  //     setServicesRendered(services);
  //   } else {
  //     setServicesRendered(servicesEmp);
  //   }
  // }, [barberInfo, selectedBarber, services, servicesEmp]);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getReservations")
      .then((res) => res.json())
      .then((data) => {
        setReservations(data.data);
        setBlockedSlots(data.blockedSlots);
      });
  }, []);
  useEffect(() => {
    if (selectedBarber === null) {
      return;
    } else {
      //check for the barber's time off, if is inside of time off, set barberIsOff to true

      if (selectedBarber.time_off.length !== 0) {
        //here i only check for the first time off, if there are multiple time off, it will only check for the first one
        //i will need to change this to check for all time off

        const timeOffCard = selectedBarber.time_off.map((elem) => {
          const startDate = moment(elem.startDate)._i;
          const endDate = moment(elem.endDate)._i;
          const timeOff = moment(selectedDate).isBetween(startDate, endDate);
          return timeOff;
        });

        if (timeOffCard.includes(true)) {
          setBarberIsOff(true);
          setFilteredAvailableSlots([]);
          return;
        }
      }
      //since barber isnt off, take out the barbers availability: false slots
      ////////////////////////////////////////////////////////////////////////////
      const originalAvailableSlots = selectedBarber.availability
        .filter((slot) =>
          slot.slot.includes(handleFormatDateForSlots(selectedDate))
        )
        .map((slot) => {
          if (slot.available === true) {
            return slot.slot;
          } else {
            return "";
          }
        });

      ////////////////////////////////////////////////////////////////////////////

      //filter out the slots taken by the selected date's reservations and the blocked slots (for the selected barber)
      ////////////////////////////////////////////////////////////////////////////
      const todayBlockedSlots = blockedSlots.filter((slot) => {
        const today =
          formatDate(new Date(slot.date)) === formatDate(selectedDate);
        return selectedBarber.given_name === slot.barber && today;
      });

      const todayReservations = reservations
        .filter((reservation) => {
          const today =
            formatDate(new Date(reservation.date)) === formatDate(selectedDate);
          return selectedBarber.given_name === reservation.barber && today;
        })
        .concat(todayBlockedSlots);
      const filteredSlots = originalAvailableSlots.filter((slot) => {
        return !todayReservations.some((reservation) => {
          if (reservation.slot.length === 1) {
            return reservation.slot[0] === slot;
          } else if (reservation.slot.length === 2) {
            return reservation.slot[0] === slot || reservation.slot[1] === slot;
          } else if (reservation.slot.length === 3) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot
            );
          } else if (reservation.slot.length === 4) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot
            );
          } else if (reservation.slot.length === 5) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot
            );
          } else if (reservation.slot.length === 6) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot
            );
          } else if (reservation.slot.length === 7) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot
            );
          } else if (reservation.slot.length === 8) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot
            );
          } else if (reservation.slot.length === 9) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot
            );
          } else if (reservation.slot.length === 10) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot
            );
          } else if (reservation.slot.length === 11) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot
            );
          } else if (reservation.slot.length === 12) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot
            );
          } else if (reservation.slot.length === 13) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot
            );
          } else if (reservation.slot.length === 14) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot
            );
          } else if (reservation.slot.length === 15) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot
            );
          } else if (reservation.slot.length === 16) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot
            );
          } else if (reservation.slot.length === 17) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot
            );
          } else if (reservation.slot.length === 18) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot ||
              reservation.slot[17] === slot
            );
          } else if (reservation.slot.length === 19) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot ||
              reservation.slot[17] === slot ||
              reservation.slot[18] === slot
            );
          } else if (reservation.slot.length === 20) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot ||
              reservation.slot[17] === slot ||
              reservation.slot[18] === slot ||
              reservation.slot[19] === slot
            );
          } else if (reservation.slot.length === 21) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot ||
              reservation.slot[17] === slot ||
              reservation.slot[18] === slot ||
              reservation.slot[19] === slot ||
              reservation.slot[20] === slot
            );
          } else if (reservation.slot.length === 22) {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot ||
              reservation.slot[17] === slot ||
              reservation.slot[18] === slot ||
              reservation.slot[19] === slot ||
              reservation.slot[20] === slot ||
              reservation.slot[21] === slot
            );
          } else {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot ||
              reservation.slot[4] === slot ||
              reservation.slot[5] === slot ||
              reservation.slot[6] === slot ||
              reservation.slot[7] === slot ||
              reservation.slot[8] === slot ||
              reservation.slot[9] === slot ||
              reservation.slot[10] === slot ||
              reservation.slot[11] === slot ||
              reservation.slot[12] === slot ||
              reservation.slot[13] === slot ||
              reservation.slot[14] === slot ||
              reservation.slot[15] === slot ||
              reservation.slot[16] === slot ||
              reservation.slot[17] === slot ||
              reservation.slot[18] === slot ||
              reservation.slot[19] === slot ||
              reservation.slot[20] === slot ||
              reservation.slot[21] === slot ||
              reservation.slot[22] === slot
            );
          }
        });
      });
      ////////////////////////////////////////////////////////////////////////////
      if (selectedService !== null) {
        //when the user selects his service (so now we have the service duration AND the barbers availability and reservations)
        //filter out overlapping slots for the selected service's duration from the availability slots or the reservations slots
        ////////////////////////////////////////////////////////////////////////////
        //simply remove the empty elements
        const finalAvailableSlots = filteredSlots.filter((slot) => {
          return slot !== "";
        });
        //get the slots that are not available for today
        const todayAvailabilitySlotsObjects =
          selectedBarber.dailyAvailability.filter((slot) => {
            return slot.available === false;
          });
        const todayAvailabilitySlots = todayAvailabilitySlotsObjects.map(
          (slot) => {
            return slot.slot;
          }
        );

        //get the starting time of the reservations for today
        const todayReservationStartingSlots = todayReservations.map(
          (reservation) => {
            return reservation.slot[0].split("-")[1];
          }
        );
        //remove the slots that are overlapping with the selected service's duration
        const slotsToRemoveForOverlappingRes = removeSlotsForOverLapping(
          selectedService.duration,
          todayReservationStartingSlots
        );

        //remove the slots that are overlapping with the barber's unavailable slots
        const slotsToRemoveForOverLappingAvailability =
          removeSlotsForOverLapping(
            selectedService.duration,
            todayAvailabilitySlots
          );

        const filteredSlotsForOverlappingAvailability =
          finalAvailableSlots.filter((slot) => {
            const time = slot.split("-")[1];
            return !slotsToRemoveForOverLappingAvailability.includes(time);
          });
        //filter the slots that are overlapping with both the reservations and the barber's unavailable slots
        const filteredForOverlappingSlots =
          filteredSlotsForOverlappingAvailability.filter((slot) => {
            const time = slot.split("-")[1];
            return !slotsToRemoveForOverlappingRes.includes(time);
          });

        const lastSlot =
          filteredForOverlappingSlots[filteredForOverlappingSlots.length - 2];
        let filteredForDuration4 = filteredForOverlappingSlots;
        if (selectedService.duration === "4") {
          //Check if the selected slots exist in the filteredForOverlappingSlots array
          const allSelectedSlots = [
            lastSlot,
            selectNextSlot(lastSlot),
            selectNextSlot(selectNextSlot(lastSlot)),
            selectNextSlot(selectNextSlot(selectNextSlot(lastSlot))),
          ];
          const areAllSelectedSlotsValid = allSelectedSlots.every((slot) =>
            filteredForOverlappingSlots.includes(slot)
          );
          if (!areAllSelectedSlotsValid) {
            // If any selected slot is not valid, check which slot is not in the array and remove it
            const invalidSlots = allSelectedSlots.filter(
              (slot) => !filteredForOverlappingSlots.includes(slot)
            );
            if (invalidSlots.length > 0) {
              //remove the allSelectedslots from the available slots
              filteredForDuration4 = filteredForOverlappingSlots.filter(
                (slot) => !allSelectedSlots.includes(slot)
              );
            }
          }
        }
        if (isToday) {
          //if the date is today's date, check for daily availabilty slots that are not available
          const dailyAvailabilityFilteredSlots =
            selectedBarber.dailyAvailability
              .filter((slot) => {
                return slot.available === false;
              })
              .map((slot) => {
                return slot.slot;
              });
          //remove all the slots that have passed
          let filteredSlotsBeforeNow = filteredForDuration4.map((elem) => {
            const now = moment().format("hh:mm A"); // Use 12-hour format with AM/PM
            const elemTime = moment(elem.split("-")[1], "hh:mm A").format(
              "hh:mm A"
            ); // Parse in 12-hour format with AM/PM
            if (!moment(elemTime, "hh:mm A").isBefore(moment(now, "hh:mm A"))) {
              return elem;
            } else {
              return "";
            }
          });
          filteredSlotsBeforeNow = filteredSlotsBeforeNow.filter(
            (elem) => elem !== ""
          );

          setFilteredAvailableSlots(
            filteredSlotsBeforeNow
              .filter((slot) => {
                const minutes = slot.split("-")[1].split(":")[1].slice(0, -2);
                return minutes !== "45" && minutes !== "15";
              })
              .filter((item) => {
                return !dailyAvailabilityFilteredSlots.some(
                  (slot) => item.slice(4) === slot
                );
              })
          );
        } else {
          setFilteredAvailableSlots(
            // use prev instead of filteredforoverlapping
            filteredForDuration4.filter((slot) => {
              const minutes = slot.split("-")[1].split(":")[1].slice(0, -2);
              return minutes !== "45" && minutes !== "15";
            })
          );
        }
      }
    }
  }, [
    selectedBarber,
    reservations,
    selectedDate,
    selectedService,
    barberIsOff,
    isToday,
    blockedSlots,
  ]);

  const selectNextSlot = (slot) => {
    if (!slot) return;
    const day = slot.split("-")[0];
    const timeToEdit = slot.split("-")[1].split(":")[1].slice(0, -2);
    const hour = slot.split("-")[1].split(":")[0];
    let AMPM = slot.slice(-2);
    let newTimeMinute = parseInt(timeToEdit) + 15;
    if (newTimeMinute === 60) {
      newTimeMinute = "00";
      const newHour = parseInt(slot.split("-")[1].split(":")[0]) + 1;
      if (newHour === 13) {
        const newerHour = 1;
        AMPM = "pm";
        return `${day}-${newerHour}:${newTimeMinute}${AMPM}`;
      } else if (newHour === 12) {
        AMPM = "pm";
        return `${day}-${newHour}:${newTimeMinute}${AMPM}`;
      } else {
        return `${day}-${newHour}:${newTimeMinute}${AMPM}`;
      }
    } else {
      return `${day}-${hour}:${newTimeMinute}${AMPM}`;
    }
  };
  const handleChange = (key, value) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot([]);
    const newDateFormat = moment(date).format("ddd MMM DD YYYY").toString();
    handleChange("date", newDateFormat);
  };

  const handleBarberClick = (barber) => {
    setSelectedBarber(barber);
    setSelectedSlot([]);
    setFilteredAvailableSlots([]);
    setSelectedService(null);
    handleChange("barber", barber.given_name);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setSelectedSlot([]);
    handleChange("service", service);
  };

  const handleSlotClick = (slot) => {
    if (selectedService.duration === "2") {
      setSelectedSlot([slot, selectNextSlot(slot)]);
    } else if (selectedService.duration === "1") {
      setSelectedSlot([slot]);
    } else if (selectedService.duration === "3") {
      setSelectedSlot([
        slot,
        selectNextSlot(slot),
        selectNextSlot(selectNextSlot(slot)),
      ]);
    } else {
      setSelectedSlot([
        slot,
        selectNextSlot(slot),
        selectNextSlot(selectNextSlot(slot)),
        selectNextSlot(selectNextSlot(selectNextSlot(slot))),
      ]);
    }
  };

  const formatDate = (date) => {
    const options = { month: "short", weekday: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  if (!reservations) {
    return <Loader />;
  }
  const handleSubmit = (e) => {
    formData.slot = selectedSlot;
    setIsLoading(true);
    e.preventDefault();
    //https://hollywoodbarbershop.onrender.com
    fetch("https://hollywoodbarbershop.onrender.com/addReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([formData, userInfo]),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setIsLoading(false);
          setUserInfo();
          navigate(`/yourReservation/${data.data._id}`);
        } else {
          window.alert(
            "Something went wrong, please refresh and try again. Sorry for the inconvenience."
          );
        }
      });
  };
  return (
    <Wrapper>
      {isMobile && (
        <Logo
          src={logoNotHome}
          alt="hollywood barbershop logo"
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      <Title>{language === "FR" ? "Réservation" : "Booking"}</Title>
      <form onSubmit={handleSubmit}>
        <InputLabelWrap
          style={{
            borderBottom: "2px solid #ccc",
            width: "100%",
            padding: "1vh 0",
          }}
        >
          <StyledLabel htmlFor={"date"}>Date</StyledLabel>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "80% 20%",
              width: "100%",
            }}
          >
            <StyledDatePicker
              ref={datePickerRef}
              selected={selectedDate}
              dateFormat="MMMM d, yyyy"
              onChange={handleDateChange}
              filterDate={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return date >= today && day !== 0 && day !== 1;
              }}
            />
            <FaCalendarAlt
              style={{
                fontSize: "2rem",
                color: "#006044",
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                if (datePickerRef.current) {
                  datePickerRef.current.setFocus();
                }
              }}
            />
          </div>
        </InputLabelWrap>
        <BarberList>
          <StyledLabel htmlFor={"barber"}>
            {language === "en" ? "Barber" : "Barbier"}
          </StyledLabel>
          {barberInfo.map((barber) => (
            <Barber
              key={barber._id}
              $isSelected={selectedBarber === barber}
              onClick={() => handleBarberClick(barber)}
            >
              {barber.given_name}
            </Barber>
          ))}
        </BarberList>
        <ServiceList>
          <StyledLabel htmlFor={"service"}>Service</StyledLabel>
          {services.map((service) => (
            <Service
              key={service._id}
              $isSelected={selectedService === service}
              onClick={() => handleServiceClick(service)}
            >
              {language === "fr" ? service.name : service.english}
            </Service>
          ))}
        </ServiceList>

        <SlotList>
          <div>
            <StyledLabel htmlFor={"slots"}>
              {language === "en" ? "Slots" : "Disponibilités"}
            </StyledLabel>
            {filteredAvailableSlots.length === 0 &&
            (!selectedBarber || !selectedService) ? (
              <SlotsWarning>
                {language === "en"
                  ? " (Select service and barber first)"
                  : " (Choisissez un service et un barbier) "}
              </SlotsWarning>
            ) : (
              ""
            )}
          </div>
          <SlotWrap>
            {filteredAvailableSlots.map((slot) => (
              <Slot
                key={slot}
                $isSelected={selectedSlot.includes(slot)}
                onClick={() => handleSlotClick(slot)}
              >
                {slot.split("-")[1]}
              </Slot>
            ))}
            {filteredAvailableSlots.length === 0 &&
              selectedBarber &&
              selectedService && <p>No Slots Available</p>}
          </SlotWrap>
        </SlotList>
        <SubmitButton
          isLoading={isLoading}
          selectedBarber={selectedBarber}
          selectedService={selectedService}
          selectedSlot={selectedSlot}
        />
      </form>
    </Wrapper>
  );
};

const Logo = styled.img`
  width: 35vw;
  margin: 5vh 0 3vh 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const SlotsWarning = styled.span`
  color: #b50000;
  padding-left: 10px;
`;

const StyledLabel = styled.label`
  color: #006044;
  font-size: 1.2rem;
  text-decoration: underline;
  margin: 1rem 0 0.5rem 20px;
  font-weight: bold;
  font-family: "Helvetica Neue", sans-serif;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  margin: 5px;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #006044;
  border-radius: 5px;
`;
const SlotWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
  border-radius: 10px;
  font-family: "Helvetica Neue", sans-serif;
  max-height: 80vh;
  overflow-y: scroll;
  position: relative;
  top: 15vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 1000px) {
    width: 100vw;
    max-height: unset;
    top: unset;
    position: unset;
  }
`;

const BarberList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const Barber = styled.div`
  padding: 10px;
  margin: 5px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#006044" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "#006044" : "#fff")};
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#000")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #006044;
    color: #fff;
  }
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
`;

const Service = styled.div`
  padding: 10px;
  margin: 5px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#006044" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "#006044" : "#fff")};
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#000")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #006044;
    color: #fff;
  }
`;

const SlotList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Slot = styled.div`
  padding: 10px;
  margin: 5px;
  width: 100px;
  text-align: center;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#006044" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "#006044" : "#fff")};
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#000")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #006044;
    color: #fff;
  }
`;

export default Booking;
