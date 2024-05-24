import { useContext, useState, useEffect, useRef } from "react";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
import imgSrc from "../assets/servicesImage.webp";
import { TextContext } from "./contexts/TextContext";
import {
  SmallTitle,
  Text,
  StyledButton,
  BottomPart,
  PrivacyWrapper,
  BackButton,
} from "./FooterPc";
import { TimelineLite } from "gsap";
const AboutPC = () => {
  const { language } = useContext(LanguageContext);
  const { text } = useContext(TextContext);
  const aboutText = text.filter((item) => item._id === "about");
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

  return (
    <Wrapper id="about-section">
      <Left>
        <StoryWrapper>
          <Story>
            {language === "en"
              ? aboutText[0].content.split(".")[0]
              : aboutText[0].french.split(".")[0]}
            .
          </Story>
          <Story>
            {language === "en"
              ? aboutText[0].content.split(".")[1]
              : aboutText[0].french.split(".")[1]}
            .
          </Story>
        </StoryWrapper>
        <CoverText ref={(el) => (coverRef2 = el)} key={"textSide"} />
      </Left>
      <div>
        <Cover ref={(el) => (coverRef = el)} />
        <StyledImg
          src={imgSrc}
          alt="shop image"
          onLoad={() => setImageLoaded(true)}
        ></StyledImg>
      </div>
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
const Wrapper = styled.div`
  background-color: #eeebde;
  display: grid;
  grid-template-columns: 45% 45%;
  gap: 2%;
  width: 90%;
  left: 10%;
  height: 92vh;
  place-content: center;
  position: relative;
  top: 8vh;
`;
const Story = styled.p`
  text-align: left;
  font-size: 20px;
  line-height: 1.5;
  color: #006044;
  padding: 0 20px 0 20px;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
const Left = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const StyledImg = styled.img`
  border-radius: 5px;
  width: 65%;
`;

const StoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 20px;
  padding: 50px 30px;
  border-radius: 10px;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: -10%;
  width: 100vw;
  z-index: 1000;
  font-family: "Helvetica Neue", sans-serif;
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
export default AboutPC;
