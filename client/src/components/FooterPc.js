import { useState } from "react";
import styled from "styled-components";
const FooterPc = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
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
    <Wrapper>
      <TopPart>
        <BusinesssHours>
          <Title>Business Hours</Title>
          <Day>Monday: closed</Day>
          <Day>Tuesday - Friday: 9am-7pm</Day>
          <Day>Saturday: 9am-6pm</Day>
          <Day>Sunday: closed</Day>
        </BusinesssHours>
        <LogoWrap>
          <StyledLogo src={"/assets/hello.jpg"} alt="shop logo"></StyledLogo>
        </LogoWrap>
        <Location>
          <Title>Address</Title>
          <Day>18 Av. Fairmount O, Montréal, QC H2T 2M1</Day>
        </Location>
      </TopPart>
      <BottomPart>
        <StyledButton
          onClick={() => {
            handlePrivacy();
          }}
          key={"Privacy"}
        >
          Privacy Policy{" "}
        </StyledButton>
        |{" "}
        <StyledButton
          onClick={() => {
            handleTerms();
          }}
          key={"Terms"}
        >
          Terms of Service
        </StyledButton>{" "}
        | Copyright Hollywood Fairmount Barbershop © {new Date().getFullYear()}
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
            outlines how we collect, use, and protect your personal information
            when you visit our website or use our services.
            <SmallTitle> Information We Collect:</SmallTitle>
            <br />
            We collect personal information such as your full name, email
            address, and phone number when you make a booking appointment
            through our website. This information is used solely for the purpose
            of scheduling and contacting you regarding your appointment.
            <br />
            <SmallTitle>How We Use Your Information:</SmallTitle> <br /> We use
            the information you provide to schedule appointments and communicate
            with you regarding your bookings. We may also use your email address
            or phone number to send appointment reminders or notify you of any
            changes to your appointment.
            <br />
            <SmallTitle>Protection of Your Information:</SmallTitle>
            <br /> We take appropriate measures to safeguard your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. We use industry-standard encryption and security
            protocols to protect your data. Sharing of Your Information: We do
            not sell, trade, or otherwise transfer your personal information to
            outside parties. Your information is only shared with our trusted
            partners or service providers who assist us in operating our website
            or conducting our business, and they are required to keep your
            information confidential. <br />
            <SmallTitle>Your Rights:</SmallTitle> <br />
            You have the right to access, update, or delete your personal
            information at any time. If you would like to do so, please contact
            us using the information provided below.
            <br />
            <SmallTitle>Cookies:</SmallTitle> <br />
            We may use cookies and similar tracking technologies to enhance your
            browsing experience on our website. You can set your browser to
            refuse cookies or alert you when cookies are being sent.
            <br />
            <SmallTitle>Changes to This Policy:</SmallTitle>
            <br /> We reserve the right to update or change this Privacy Policy
            at any time. Any changes will be effective immediately upon posting
            on this page. If you have any questions or concerns regarding our
            Privacy Policy, please contact us at hollywoodfairmount@gmail.com.
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
            Terms of Service These Terms of Service ("Terms") govern your use of
            www.hollywoodfairmount.com and the services provided by hollywood
            Fairmount Barbershop. By accessing or using our website or services,
            you agree to be bound by these Terms.
            <br />
            <SmallTitle>Booking Appointments:</SmallTitle>
            <br /> When booking appointments through our website, you agree to
            provide accurate and complete information, including your full name,
            email address, and phone number. <br />
            <SmallTitle>Cancellation and Rescheduling:</SmallTitle> If you need
            to cancel or reschedule your appointment, please contact us at least
            24h in advance.
            <br />
            <SmallTitle>Payment:</SmallTitle>
            <br /> Payment for services is due at the time of your appointment.
            We accept cash, credit/debit cards .<br />
            <SmallTitle>Use of Services:</SmallTitle>
            <br /> You agree to use our services only for lawful purposes and in
            compliance with these Terms. You may not use our services to harass,
            abuse, or harm others or to engage in any illegal activities.
            <br />
            <SmallTitle>Intellectual Property:</SmallTitle> <br />
            All content on our website, including text, images, logos, and
            graphics, is the property of Hollywood Fairmount Barbershop and is
            protected by copyright laws. You may not reproduce, distribute, or
            transmit any content without our prior written consent.
            <br />
            <SmallTitle>Limitation of Liability:</SmallTitle> <br />
            In no event shall Hollywood Fairmount Barbershop be liable for any
            damages arising out of or in connection with your use of our website
            or services, including but not limited to indirect, incidental,
            consequential, or punitive damages. <br />
            <br />
            If you have any questions or concerns regarding our Terms of
            Service, please contact us at hollywoodfairmount@gmail.com.
          </Text>
        </PrivacyWrapper>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 25vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 0 2vh 0;
`;
const TopPart = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  place-content: top space-evenly;
  width: 100%;
  justify-content: center;
  height: 20vh;
`;
const BottomPart = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
`;
const BusinesssHours = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const Day = styled.p`
  margin: 0.1rem 0;
  font-size: 1rem;
  color: whitesmoke;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  color: #079061;
`;
const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const StyledLogo = styled.img`
  max-height: 13vh;
  border-radius: 30%;
`;
const StyledButton = styled.button`
  color: whitesmoke;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #079061;
  }
`;
const PrivacyWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  top: 0;
  left: 0;
`;
const SmallTitle = styled.h2`
  font-size: 1.2rem;
  color: #079061;
  text-decoration: underline;
  font-style: italic;
  margin: 2rem 0 1rem 0;
`;
const Text = styled.div`
  font-size: 1rem;
  color: black;
  background-color: whitesmoke;
  padding: 2%;
  border-radius: 10px;
  width: 80%;
  position: relative;
`;
const BackButton = styled.button`
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 3rem;
  color: grey;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: sans-serif;
  &:hover {
    color: #079061;
  }
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
export default FooterPc;
