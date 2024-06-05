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
import { IsMobileContext } from "../contexts/IsMobileContext";
import { InputLabelWrap } from "./GuestFormRsvp";
import SubmitButton from "./SubmitButton";
import {
  SmallTitle,
  Text,
  StyledButton,
  BottomPart,
  PrivacyWrapper,
  BackButton,
} from "../FooterPc";
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
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { barberInfo } = useContext(BarberContext);
  const { services } = useContext(ServiceContext);
  const { userInfo } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const handlePrivacy = () => {
    if (isTermsOpen) {
      setIsTermsOpen(false);
    }
    setIsPrivacyOpen(!isPrivacyOpen);
  };
  const handleTerms = () => {
    if (isPrivacyOpen) {
      setIsPrivacyOpen(false);
    }
    setIsTermsOpen(!isTermsOpen);
  };
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format("ddd MMM DD YYYY").toString();
  const isToday =
    formattedDate ===
    moment(selectedDate).format("ddd MMM DD YYYY").toString().slice(0, 15);
  const [filteredAvailableSlots, setFilteredAvailableSlots] = useState([]);
  const navigate = useNavigate();

  const handleFormatDateForSlots = (date) => {
    const options = { weekday: "short" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getReservations")
      .then((res) => res.json())
      .then((data) => {
        setReservations(data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedBarber === null) {
      return;
    } else {
      if (selectedBarber.time_off.length !== 0) {
        const startDate = moment(selectedBarber.time_off[0].startDate)._i;
        const endDate = moment(selectedBarber.time_off[0].endDate)._i;
        const timeOff = moment(selectedDate).isBetween(startDate, endDate);
        setBarberIsOff(timeOff);
        return;
      }

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

      const todayReservations = reservations.filter((reservation) => {
        const today =
          formatDate(new Date(reservation.date)) === formatDate(selectedDate);
        return selectedBarber.given_name === reservation.barber && today;
      });

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
          } else {
            return (
              reservation.slot[0] === slot ||
              reservation.slot[1] === slot ||
              reservation.slot[2] === slot ||
              reservation.slot[3] === slot
            );
          }
        });
      });

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
            const time = slot.split("-")[1];
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
    setSelectedSlot([]);
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
    setIsLoading(true);
    e.preventDefault();
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
          navigate("/profile");
        } else {
          console.log("something went wrong");
        }
      });
  };

  return (
    <Wrapper>
      <Title>{language === "FR" ? "Réservation" : "Booking"}</Title>
      <form onSubmit={handleSubmit}>
        <InputLabelWrap
          style={{
            borderBottom: "2px solid #ccc",
            width: "100%",
            padding: "1vh 0",
          }}
        >
          <StyledLabel>Date</StyledLabel>
          <StyledDatePicker
            selected={selectedDate}
            dateFormat="MMMM d, yyyy"
            onChange={handleDateChange}
          />
        </InputLabelWrap>
        <ServiceList>
          <StyledLabel>Service</StyledLabel>
          {services.map((service) => (
            <Service
              key={service.id}
              $isSelected={selectedService === service}
              onClick={() => handleServiceClick(service)}
            >
              {language === "FR" ? service.name : service.english}
            </Service>
          ))}
        </ServiceList>
        <BarberList>
          <StyledLabel>{language === "en" ? "Barber" : "Barbier"}</StyledLabel>
          {barberInfo.map((barber) => (
            <Barber
              key={barber._id}
              $isSelected={selectedBarber === barber}
              onClick={() => handleBarberClick(barber)}
              isOff={barberIsOff}
            >
              {barber.given_name}
            </Barber>
          ))}
        </BarberList>
        <SlotList>
          <LabelWarningWrap>
            <StyledLabel>
              {language === "en" ? "Slots" : "Disponibilités"}
            </StyledLabel>
            {filteredAvailableSlots.length === 0 && !selectedBarber ? (
              <SlotsWarning>
                {language === "en"
                  ? " (Select service and barber first)"
                  : " (Choisissez un service et un barbier) "}
              </SlotsWarning>
            ) : (
              ""
            )}
          </LabelWarningWrap>
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
          </SlotWrap>
        </SlotList>
        <SubmitButton isLoading={isLoading} />
        {/* <StyledSubmit type="submit">
          {language === "FR" ? "Confirmer" : "Confirm"}
        </StyledSubmit> */}
      </form>
      {!isMobile && (
        <Footer>
          <BottomPart style={{ backgroundColor: "#eeebde" }}>
            <span></span>
            <StyledButton
              onClick={() => {
                handlePrivacy();
              }}
              key={"Privacy"}
            >
              Privacy Policy
            </StyledButton>
            <span>|</span>
            <StyledButton
              onClick={() => {
                handleTerms();
              }}
              key={"Terms"}
            >
              Terms of Service
            </StyledButton>
            <span>|</span>
            <StyledButton>
              Copyright Hollywood Fairmount Barbershop ©{" "}
              {new Date().getFullYear()}
            </StyledButton>
          </BottomPart>
          {isPrivacyOpen && (
            <PrivacyWrapper>
              <Text>
                <BackButton
                  onClick={() => {
                    setIsPrivacyOpen(false);
                  }}
                >
                  X
                </BackButton>
                <SmallTitle>Privacy Policy:</SmallTitle>
                <br />
                Hollywood Fairmount Barbershop is committed to protecting the
                privacy of our website visitors and clients. This Privacy Policy
                outlines how we collect, use, and protect your personal
                information when you visit our website or use our services.
                <SmallTitle> Information We Collect:</SmallTitle>
                <br />
                We collect personal information such as your full name, email
                address, and phone number when you make a booking appointment
                through our website. This information is used solely for the
                purpose of scheduling and contacting you regarding your
                appointment.
                <br />
                <SmallTitle>
                  How We Use Your Information:
                </SmallTitle> <br /> We use the information you provide to
                schedule appointments and communicate with you regarding your
                bookings. We may also use your email address or phone number to
                send appointment reminders or notify you of any changes to your
                appointment.
                <br />
                <SmallTitle>Protection of Your Information:</SmallTitle>
                <br /> We take appropriate measures to safeguard your personal
                information against unauthorized access, alteration, disclosure,
                or destruction. We use industry-standard encryption and security
                protocols to protect your data. Sharing of Your Information: We
                do not sell, trade, or otherwise transfer your personal
                information to outside parties. Your information is only shared
                with our trusted partners or service providers who assist us in
                operating our website or conducting our business, and they are
                required to keep your information confidential. <br />
                <SmallTitle>Your Rights:</SmallTitle> <br />
                You have the right to access, update, or delete your personal
                information at any time. If you would like to do so, please
                contact us using the information provided below.
                <br />
                <SmallTitle>Cookies:</SmallTitle> <br />
                We may use cookies and similar tracking technologies to enhance
                your browsing experience on our website. You can set your
                browser to refuse cookies or alert you when cookies are being
                sent.
                <br />
                <SmallTitle>Changes to This Policy:</SmallTitle>
                <br /> We reserve the right to update or change this Privacy
                Policy at any time. Any changes will be effective immediately
                upon posting on this page. If you have any questions or concerns
                regarding our Privacy Policy, please contact us at
                hollywoodfairmount@gmail.com.
              </Text>
            </PrivacyWrapper>
          )}
          {isTermsOpen && (
            <PrivacyWrapper key={"TermsOfServices"}>
              <Text key={"TermsOfServ"}>
                <BackButton
                  onClick={() => {
                    setIsTermsOpen(false);
                  }}
                >
                  X
                </BackButton>
                <br />
                <br />
                <br />
                <br />
                Terms of Service These Terms of Service ("Terms") govern your
                use of www.hollywoodfairmount.com and the services provided by
                hollywood Fairmount Barbershop. By accessing or using our
                website or services, you agree to be bound by these Terms.
                <br />
                <SmallTitle>Booking Appointments:</SmallTitle>
                <br /> When booking appointments through our website, you agree
                to provide accurate and complete information, including your
                full name, email address, and phone number. <br />
                <SmallTitle>Cancellation and Rescheduling:</SmallTitle> If you
                need to cancel or reschedule your appointment, please contact us
                at least 24h in advance.
                <br />
                <SmallTitle>Payment:</SmallTitle>
                <br /> Payment for services is due at the time of your
                appointment. We accept cash, credit/debit cards .<br />
                <SmallTitle>Use of Services:</SmallTitle>
                <br /> You agree to use our services only for lawful purposes
                and in compliance with these Terms. You may not use our services
                to harass, abuse, or harm others or to engage in any illegal
                activities.
                <br />
                <SmallTitle>Intellectual Property:</SmallTitle> <br />
                All content on our website, including text, images, logos, and
                graphics, is the property of Hollywood Fairmount Barbershop and
                is protected by copyright laws. You may not reproduce,
                distribute, or transmit any content without our prior written
                consent.
                <br />
                <SmallTitle>Limitation of Liability:</SmallTitle> <br />
                In no event shall Hollywood Fairmount Barbershop be liable for
                any damages arising out of or in connection with your use of our
                website or services, including but not limited to indirect,
                incidental, consequential, or punitive damages. <br />
                <br />
                If you have any questions or concerns regarding our Terms of
                Service, please contact us at hollywoodfairmount@gmail.com.
              </Text>
            </PrivacyWrapper>
          )}
        </Footer>
      )}
    </Wrapper>
  );
};

const LabelWarningWrap = styled.div``;

const SlotsWarning = styled.span`
  color: #b50000;
  padding-left: 10px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  font-family: "Helvetica Neue", sans-serif;
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
  width: 45.5vw;
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
  max-height: 75vh;
  overflow-y: scroll;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
