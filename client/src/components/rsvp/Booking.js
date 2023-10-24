import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { ServiceContext } from "../contexts/ServiceContext";
import { BarberContext } from "../contexts/BarberContext";
import { Submit } from "../account/Signup";
import moment from "moment";
import { filterSlotBeforeFor2Duration } from "../helpers";
import Loader from "../float-fixed/Loader";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
const Booking = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({ date: new Date() });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [barberIsOff, setBarberIsOff] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const { barberInfo } = useContext(BarberContext);
  const { services } = useContext(ServiceContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  console.log(userInfo);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const handleFormatDateForSlots = (date) => {
    const options = { weekday: "short" };
    return date.toLocaleDateString(undefined, options);
  };
  //get reservations
  useEffect(() => {
    fetch("/getReservations")
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
      // if the services in reservations need 2 slots, remove the slot that comes after the one reserved
      if (selectedService.duration === "2") {
        const removedBeforeSlotsFor2Duration = todayReservations.map(
          (reservation) => {
            return filterSlotBeforeFor2Duration(reservation.slot[0]);
          }
        );
        setAvailableSlots(
          filteredSlots
            .filter((slot) => {
              return slot !== "";
            })
            .filter((item) => !removedBeforeSlotsFor2Duration.includes(item))
        );
      } else {
        setAvailableSlots(
          filteredSlots.filter((slot) => {
            return slot !== "";
          })
        );
      }
    }
  }, [
    selectedBarber,
    reservations,
    selectedDate,
    selectedService,
    barberIsOff,
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
    handleChange("date", date);
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
      setSelectedSlot([slot]);
      handleChange("slot", [slot, selectNextSlot(slot)]);
    } else {
      setSelectedSlot([slot]);
      handleChange("slot", [slot]);
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
    e.preventDefault();
    fetch("/addReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [formData, userInfo, language] }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        switch (data.status) {
          case 200:
            setUserInfo({
              ...userInfo,
              reservations: [...userInfo.reservations, data.data],
            });
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
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
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
        {services.map((service) => {
          const isSelected = selectedService === service;
          return (
            <BarberBox
              key={service._id}
              onClick={() => handleServiceClick(service)}
              className={isSelected ? "isSelected" : ""}
            >
              {language === "en" ? service.english : service.name}
            </BarberBox>
          );
        })}
      </LabelInputWrapper>
      <LabelInputWrapper key={"barbers"}>
        <StyledLabel>{language === "en" ? "Barber" : "Barbier"}</StyledLabel>
        {barberInfo.map((barber) => {
          const isSelected = selectedBarber === barber;
          return (
            <BarberBox
              key={barber._id}
              onClick={() => handleBarberClick(barber)}
              className={isSelected ? "isSelected" : ""}
            >
              {barber.given_name + " " + barber.family_name}
            </BarberBox>
          );
        })}
      </LabelInputWrapper>
      {availableSlots.length && (
        <LabelInputWrapper key={"slots"}>
          <StyledLabel>Time slot</StyledLabel>
          {selectedSlot.length === 0 ? (
            availableSlots.map((slot) => {
              return (
                <Slot key={slot} onClick={() => handleSlotClick(slot)}>
                  {slot.split("-")[1]}
                </Slot>
              );
            })
          ) : (
            <BarberBox
              className="isSelected"
              key={"selectedslotman"}
              onClick={() => {
                setSelectedSlot([]);
              }}
            >
              {selectedSlot[0].split("-")[1]}
            </BarberBox>
          )}
        </LabelInputWrapper>
      )}
      <Submit key={"booking"} type="submit">
        {language === "en" ? "Submit" : "Valider"}
      </Submit>
    </StyledForm>
  );
};
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: sans-serif;
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
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 1rem;
  padding-bottom: 1%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const Slot = styled.div`
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.5rem;
  background-color: whitesmoke;
  width: 70%;
  text-align: center;
  border-radius: 10px;
  margin: 0.3rem 0 0.3rem 0;
  border-bottom: 3px solid #035e3f;
  &:first-of-type {
    margin-top: 1rem;
  }
`;
export default Booking;
