import { useEffect, useState, useContext } from "react";
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
import { Filter, StyledBg } from "./GuestFormRsvp";
import { IsMobileContext } from "../contexts/IsMobileContext";

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
  const { barberInfo } = useContext(BarberContext);
  const { services } = useContext(ServiceContext);
  const { userInfo } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const todayDate = new Date();
  // format date for Wed Mar 27 2024
  const formattedDate = moment(todayDate).format("ddd MMM DD YYYY").toString();
  const isToday =
    formattedDate ===
    moment(selectedDate).format("ddd MMM DD YYYY").toString().slice(0, 15);
  //remove the 15min/45min slots from the available slots, save them in new state for the rendering, keep the other state for the logic
  //(check select next slot function)
  const [filteredAvailableSlots, setFilteredAvailableSlots] = useState([]);
  const navigate = useNavigate();
  const handleFormatDateForSlots = (date) => {
    const options = { weekday: "short" };
    return date.toLocaleDateString(undefined, options);
  };
  //get reservations
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getReservations")
      .then((res) => res.json())
      .then((data) => {
        setReservations(data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedBarber === null) {
      //if no barber is selected
      return;
    } else {
      //check if barber is off
      if (selectedBarber.time_off.length !== 0) {
        const startDate = moment(selectedBarber.time_off[0].startDate)._i;
        const endDate = moment(selectedBarber.time_off[0].endDate)._i;
        const timeOff = moment(selectedDate).isBetween(startDate, endDate);
        setBarberIsOff(timeOff);
        return;
      }
      // if barber is not off, filter available slots of the selected day
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

      //get reserved slots of the selected day
      const todayReservations = reservations.filter((reservation) => {
        const today =
          formatDate(new Date(reservation.date)) === formatDate(selectedDate);
        return selectedBarber.given_name === reservation.barber && today;
      });
      //filter reserved slots for the selected day for the selected barber out
      const filteredSlots = originalAvailableSlots.filter((slot) => {
        return !todayReservations.some((reservation) => {
          if (reservation.slot.length === 1) {
            return reservation.slot[0] === slot;
          } else {
            return reservation.slot[0] === slot || reservation.slot[1] === slot;
          }
        });
      });

      //1-filter out the now empty elements
      if (selectedService !== null) {
        const finalAvailableSlots = filteredSlots.filter((slot) => {
          return slot !== "";
        });
        const todayReservationStartingSlots = todayReservations.map(
          (reservation) => {
            return reservation.slot[0].split("-")[1];
          }
        );
        const slotsToRemoveForOverlapping = removeSlotsForOverLapping(
          selectedService.duration,
          todayReservationStartingSlots
        );
        const filteredForOverlappingSlots = finalAvailableSlots.filter(
          (slot) => {
            // Extract the time portion of the slot (e.g., "2:30pm")
            const time = slot.split("-")[1];
            // Check if the time is not included in slotsToRemoveForOverlapping
            return !slotsToRemoveForOverlapping.includes(time);
          }
        );

        if (isToday) {
          const dailyAvailabilityFilteredSlots =
            selectedBarber.dailyAvailability
              .filter((slot) => {
                return slot.available === false;
              })
              .map((slot) => {
                return slot.slot;
              });
          setFilteredAvailableSlots(
            filteredForOverlappingSlots
              .filter((slot) => {
                const minutes = slot.split("-")[1].split(":")[1].slice(0, -2);
                return minutes !== "45" && minutes !== "15";
              })
              .filter((item) => {
                return !dailyAvailabilityFilteredSlots.some((slot) =>
                  item.includes(slot)
                );
              })
          );
        } else {
          setFilteredAvailableSlots(
            filteredForOverlappingSlots.filter((slot) => {
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
  ]);
  const selectNextSlot = (slot) => {
    const day = slot.split("-")[0];
    const timeToEdit = slot.split("-")[1].split(":")[1].slice(0, -2);
    const hour = slot.split("-")[1].split(":")[0];
    let AMPM = slot.slice(-2);
    let newTimeMinute = parseInt(timeToEdit) + 15;
    if (newTimeMinute === 60) {
      newTimeMinute = "00";
      const newHour = parseInt(slot.split("-")[1].split(":")[0]) + 1;
      if (newHour === 12) {
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
    if (selectedService === null) {
      return;
    }
    setSelectedBarber(barber);
    handleChange("barber", barber.given_name);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
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
    e.preventDefault();
    fetch("https://hollywoodbarbershop.onrender.com/addReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [formData, userInfo] }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        switch (data.status) {
          case 200:
            navigate(`/yourReservation/${data.data._id}`);
            break;
          case 500:
            break;
          default:
            alert("Something went wrong please try again later");
            break;
        }
      });
  };
  return (
    <StyledForm
      $isMobile={isMobile}
      onSubmit={(e) => handleSubmit(e)}
      style={{ backgroundColor: "#011c13" }}
    >
      <SmallWrapper $isMobile={isMobile}>
        <LabelInputWrapper key={"date"}>
          <StyledLabel>Date</StyledLabel>
          <StyledDatePicker
            selected={selectedDate}
            name="date"
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
          />
        </LabelInputWrapper>
        <LabelInputWrapper key={"services"}>
          <StyledLabel>Service</StyledLabel>
          {selectedService === null ? (
            services.map((service) => {
              return (
                <BarberBox
                  key={service._id}
                  onClick={() => handleServiceClick(service)}
                >
                  {language === "en" ? service.english : service.name}
                </BarberBox>
              );
            })
          ) : (
            <BarberBox
              key={selectedService._id}
              onClick={() => {
                setSelectedService(null);
                setSelectedSlot([]);
              }}
              className={"isSelected"}
            >
              {language === "en"
                ? selectedService.english
                : selectedService.name}
            </BarberBox>
          )}
        </LabelInputWrapper>
        <LabelInputWrapper key={"barbers"}>
          <StyledLabel>{language === "en" ? "Barber" : "Barbier"}</StyledLabel>
          {selectedBarber === null ? (
            barberInfo.map((barber) => {
              return (
                <BarberBox
                  key={barber._id}
                  onClick={() => handleBarberClick(barber)}
                >
                  {barber.given_name + " " + barber.family_name}
                </BarberBox>
              );
            })
          ) : (
            <BarberBox
              key={selectedBarber._id}
              onClick={() => setSelectedBarber(null)}
              className={"isSelected"}
            >
              {selectedBarber.given_name + " " + selectedBarber.family_name}
            </BarberBox>
          )}
        </LabelInputWrapper>
        <StyledLabel>Time slot</StyledLabel>
        {filteredAvailableSlots.length && selectedBarber !== null && (
          <SlotWrapper key={"slots"} $isMobile={isMobile}>
            {selectedSlot.length === 0 ? (
              filteredAvailableSlots.map((slot) => {
                return (
                  <Slot key={slot} onClick={() => handleSlotClick(slot)}>
                    {slot.split("-")[1]}
                  </Slot>
                );
              })
            ) : (
              <BarberBox
                className="isSelected"
                style={{ position: "relative", left: "47%" }}
                key={"selectedslotman"}
                onClick={() => {
                  setSelectedSlot([]);
                }}
              >
                {selectedSlot[0].split("-")[1]}
              </BarberBox>
            )}
          </SlotWrapper>
        )}
        {filteredAvailableSlots.length === 0 && selectedBarber !== null && (
          <NotAvail>
            {language === "en" ? "No Available Slots" : "Aucune disponibilité"}
          </NotAvail>
        )}
        <Submit
          style={{ marginBottom: "50px" }}
          key={"booking"}
          type="submit"
          disabled={
            selectedSlot.length === 0 ||
            selectedBarber === null ||
            selectedService === null
          }
        >
          {language === "en" ? "Submit" : "Valider"}
        </Submit>
      </SmallWrapper>
      {!isMobile && <StyledBg />}
      {!isMobile && <Filter />}
    </StyledForm>
  );
};

const NotAvail = styled.div`
  font-family: sans-serif;
  font-size: 1rem;
  color: whitesmoke;
  padding: 0.5rem;
  background-color: #035e3f;
  text-align: center;
  border-radius: 10px;
  margin: 0 0 1.5rem 0;
  border-bottom: 4px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: sans-serif;
  position: ${(props) => (props.$isMobile ? "" : "relative")};
  height: ${(props) => (props.$isMobile ? "unset" : "100%")};
  margin-top: ${(props) => (props.$isMobile ? "0" : "8vh")};
`;
const StyledDatePicker = styled(DatePicker)`
  font-family: sans-serif;
  font-size: 1rem;
  background-color: #035e3f;
  color: whitesmoke;
  padding: 0.5rem;
  border: none;
  text-align: center;
  border-bottom: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 92%;
  outline: none;
  position: relative;
  z-index: 999;
  cursor: pointer;
`;
const BarberBox = styled.div`
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: whitesmoke;
  width: 70%;
  text-align: center;
  border-radius: 10px;
  margin: 0.5rem;
  border-bottom: 4px solid #035e3f;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &.isSelected {
    background-color: #035e3f;
    color: whitesmoke;
    border-bottom: 4px solid rgba(255, 255, 255, 0.5);
  }
`;
const StyledLabel = styled.label`
  font-family: sans-serif;
  font-size: 1rem;
  color: whitesmoke;
  margin: 1rem;
`;
const LabelInputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 1rem;
  padding-bottom: 3%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Slot = styled.div`
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.5rem;
  background-color: whitesmoke;
  width: 80%;
  text-align: center;
  border-radius: 10px;
  margin: 0.3rem 0 0.3rem 0;
  border-bottom: 3px solid #035e3f;
  cursor: pointer;
  &:first-of-type {
    margin-top: 1rem;
  }
`;

const SlotWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isMobile ? "45% 45%" : "25% 25% 25% 25%"};
  align-items: flex-end;
  justify-content: flex-end;
  width: 70%;
  padding-bottom: 3%;
  margin-bottom: 3%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const SmallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => (props.$isMobile ? "unset" : "unset")};
  width: ${(props) => (props.$isMobile ? "100%" : "60%")};
  z-index: 1;
  background-color: ${(props) => (props.$isMobile ? "" : "rgba(0,0,0,0.7)")};
`;
const Submit = styled.button`
  font-family: sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #035e3f;
  z-index: 2;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom: 4px solid #b50000;
    color: #b50000;
  }
`;
export default Booking;
