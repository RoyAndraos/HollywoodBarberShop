import { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LanguageContext } from "./contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { BookButton } from "./Reviews";
import imgSrc from "../assets/servicesImage.webp";
import {
  SmallTitle,
  Text,
  StyledButton,
  BottomPart,
  PrivacyWrapper,
  BackButton,
} from "./FooterPc";
import { TextContext } from "./contexts/TextContext";
import { ServiceContext } from "./contexts/ServiceContext";
import { TimelineLite } from "gsap";
const MenuPC = () => {
  const { language } = useContext(LanguageContext);
  const { text } = useContext(TextContext);
  const underMenuText = text.filter((text) => text._id === "underMenu")[0];
  const { services } = useContext(ServiceContext);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  let coverRef = useRef(null);
  let coverRef2 = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    if (imageLoaded) {
      tl.to(coverRef, { height: 0, duration: 0.8, delay: 1 }).to(coverRef2, {
        height: 0,
        duration: 0.8,
        delay: -0.8,
      });
    }
  }, [imageLoaded]);
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
  const navigate = useNavigate();

  return (
    <Wrapper id="menu-section">
      <LeftWrap>
        <MenuWrapper>
          {services.map((service) => {
            return (
              <Service key={service._id}>
                <ServiceName>
                  {language === "fr" ? service.name : service.english}
                </ServiceName>
                <ServicePrice>{service.price}</ServicePrice>
              </Service>
            );
          })}
        </MenuWrapper>
        <ButtonMessageWrap>
          <BookButton
            onClick={() => {
              navigate("/book");
            }}
          >
            {language === "en" ? "BOOK NOW!" : "RESERVER"}
          </BookButton>
          <Message>
            {language === "en" ? underMenuText.content : underMenuText.french}
          </Message>
        </ButtonMessageWrap>
        <CoverText ref={(el) => (coverRef2 = el)} key={"textSide"} />
      </LeftWrap>
      <Right>
        <StyledImg
          src={imgSrc}
          alt="barber shop image"
          onLoad={() => setImageLoaded(true)}
        />
        <Cover ref={(el) => (coverRef = el)} />
      </Right>
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
          <PrivacyWrapper style={{ left: "-10%" }}>
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
              <SmallTitle>How We Use Your Information:</SmallTitle> <br /> We
              use the information you provide to schedule appointments and
              communicate with you regarding your bookings. We may also use your
              email address or phone number to send appointment reminders or
              notify you of any changes to your appointment.
              <br />
              <SmallTitle>Protection of Your Information:</SmallTitle>
              <br /> We take appropriate measures to safeguard your personal
              information against unauthorized access, alteration, disclosure,
              or destruction. We use industry-standard encryption and security
              protocols to protect your data. Sharing of Your Information: We do
              not sell, trade, or otherwise transfer your personal information
              to outside parties. Your information is only shared with our
              trusted partners or service providers who assist us in operating
              our website or conducting our business, and they are required to
              keep your information confidential. <br />
              <SmallTitle>Your Rights:</SmallTitle> <br />
              You have the right to access, update, or delete your personal
              information at any time. If you would like to do so, please
              contact us using the information provided below.
              <br />
              <SmallTitle>Cookies:</SmallTitle> <br />
              We may use cookies and similar tracking technologies to enhance
              your browsing experience on our website. You can set your browser
              to refuse cookies or alert you when cookies are being sent.
              <br />
              <SmallTitle>Changes to This Policy:</SmallTitle>
              <br /> We reserve the right to update or change this Privacy
              Policy at any time. Any changes will be effective immediately upon
              posting on this page. If you have any questions or concerns
              regarding our Privacy Policy, please contact us at
              hollywoodfairmount@gmail.com.
            </Text>
          </PrivacyWrapper>
        )}
        {isTermsOpen && (
          <PrivacyWrapper key={"TermsOfServices"} style={{ left: "-10%" }}>
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
              Terms of Service These Terms of Service ("Terms") govern your use
              of www.hollywoodfairmount.com and the services provided by
              hollywood Fairmount Barbershop. By accessing or using our website
              or services, you agree to be bound by these Terms.
              <br />
              <SmallTitle>Booking Appointments:</SmallTitle>
              <br /> When booking appointments through our website, you agree to
              provide accurate and complete information, including your full
              name, email address, and phone number. <br />
              <SmallTitle>Cancellation and Rescheduling:</SmallTitle> If you
              need to cancel or reschedule your appointment, please contact us
              at least 24h in advance.
              <br />
              <SmallTitle>Payment:</SmallTitle>
              <br /> Payment for services is due at the time of your
              appointment. We accept cash, credit/debit cards .<br />
              <SmallTitle>Use of Services:</SmallTitle>
              <br /> You agree to use our services only for lawful purposes and
              in compliance with these Terms. You may not use our services to
              harass, abuse, or harm others or to engage in any illegal
              activities.
              <br />
              <SmallTitle>Intellectual Property:</SmallTitle> <br />
              All content on our website, including text, images, logos, and
              graphics, is the property of Hollywood Fairmount Barbershop and is
              protected by copyright laws. You may not reproduce, distribute, or
              transmit any content without our prior written consent.
              <br />
              <SmallTitle>Limitation of Liability:</SmallTitle> <br />
              In no event shall Hollywood Fairmount Barbershop be liable for any
              damages arising out of or in connection with your use of our
              website or services, including but not limited to indirect,
              incidental, consequential, or punitive damages. <br />
              <br />
              If you have any questions or concerns regarding our Terms of
              Service, please contact us at hollywoodfairmount@gmail.com.
            </Text>
          </PrivacyWrapper>
        )}
      </Footer>
    </Wrapper>
  );
};

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: -10%;
  width: 100vw;
  font-family: "Helvetica Neue", sans-serif;
  z-index: 1000;
`;
const StyledImg = styled.img`
  width: 75%;
`;
const ButtonMessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 80vh;
  position: relative;
`;
const Right = styled.div`
  width: 100%;
  position: relative;
`;
const Cover = styled.div`
  position: absolute;
  left: -1%;
  top: 0;
  width: 101%;
  height: 100%;
  background-color: #eeebde;
  z-index: 10;
`;
const CoverText = styled.div`
  position: absolute;
  bottom: 0;
  left: -0.5%;
  width: 101%;
  height: 100%;
  background-color: #eeebde;
  z-index: 10;
`;
const Wrapper = styled.div`
  display: grid;
  gap: 10%;
  grid-template-columns: 40% 45%;
  place-content: center;
  align-items: center;
  left: 10%;
  background-color: #eeebde;
  scroll-snap-align: start;
  color: white;
  width: 90%;
  height: 92vh;
  top: 8vh;
  position: relative;
  z-index: -3;
  overflow: hidden;
`;

const Service = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  background-color: transparent;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  color: #006044;
  border-bottom: 1px solid #006044;
  @media (max-width: 1000px) {
    padding: 0.5rem;
  }
`;

const ServiceName = styled.p`
  font-size: 20px;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

const ServicePrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  z-index: 3;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

const Message = styled.p`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 20px;
  z-index: 3;
  text-align: center;
  line-height: 1.5;
  border-radius: 10px;
  color: #006044;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 3;
  position: relative;
  top: 8vh;
  visibility: hidden;
  cursor: default;
  width: 100%;
  gap: 3rem;
  > * {
    visibility: visible;
  }

  > * {
    transition: opacity 200ms linear 150ms, transform 200ms ease-in-out 150ms;
  }

  &:hover > * {
    opacity: 0.4;
    transform: scale(0.97);
  }

  > *:hover {
    opacity: 1;
    transform: scale(1);
    transition-delay: 0ms, 0ms;
  }

  @media (max-width: 1000px) {
    gap: 0.5rem;
  }
`;

export default MenuPC;
