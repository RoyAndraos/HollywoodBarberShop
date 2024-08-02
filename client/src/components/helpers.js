export const filterSlotBeforeFor2Duration = (slot) => {
  const minuteToEdit = slot.slice(0, -2).split(":")[1];
  if (minuteToEdit !== "00") {
    const newMinute = parseInt(minuteToEdit) - 15;
    if (newMinute === 0) {
      return slot.split(":")[0] + ":00" + slot.slice(-2);
    } else {
      return (
        slot.slice(0, -2).split(":")[0] +
        ":" +
        newMinute.toString() +
        slot.slice(-2)
      );
    }
  } else {
    const newMinute = "45";
    const hourToEdit = slot.slice(0, -2).split(":")[0];
    if (hourToEdit !== "1" && hourToEdit !== "12") {
      const newHour = parseInt(slot.slice(0, -2).split(":")[0]) - 1;
      if (newHour.toString().length === 2) {
        return newHour.toString() + ":" + newMinute + slot.slice(-2);
      } else {
        return "0" + newHour.toString() + ":" + newMinute + slot.slice(-2);
      }
    } else if (hourToEdit === "12") {
      return "11:" + newMinute + "am";
    } else {
      const newHour = "12";
      return newHour + ":" + newMinute + "pm";
    }
  }
};

export const removeSlotsForOverLapping = (
  serviceDuration,
  todayReservationStartingSlots
) => {
  let slotsToRemove = [];
  switch (serviceDuration) {
    case "1":
      break;
    case "2":
      todayReservationStartingSlots.forEach((slot) => {
        const slotToEdit = filterSlotBeforeFor2Duration(slot);
        slotsToRemove.push(slotToEdit);
      });
      break;
    case "3":
      todayReservationStartingSlots.forEach((slot) => {
        const slotToEdit = filterSlotBeforeFor2Duration(slot);
        slotsToRemove.push(slotToEdit);
        const slotToEdit2 = filterSlotBeforeFor2Duration(slotToEdit);
        slotsToRemove.push(slotToEdit2);
      });
      break;
    case "4":
      todayReservationStartingSlots.forEach((slot) => {
        const slotToEdit = filterSlotBeforeFor2Duration(slot);
        slotsToRemove.push(slotToEdit);
        const slotToEdit2 = filterSlotBeforeFor2Duration(slotToEdit);
        slotsToRemove.push(slotToEdit2);
        const slotToEdit3 = filterSlotBeforeFor2Duration(slotToEdit2);
        slotsToRemove.push(slotToEdit3);
      });
      break;
    default:
      break;
  }

  return slotsToRemove.map((slot) => {
    if (slot[0] === "0") {
      return slot.slice(1);
    }
    return slot;
  });
};

export const reviews = [
  {
    name: "Steve St. Pierre",
    stars: 5,
    review: `A shop that retained the classic barber experience from the old
    owner and created a new, inviting atmosphere for a great cut.
    <br />
    The best haircut I've had since moving to this city.
    <br />`,
  },
  {
    name: "Julien Kamar",
    stars: 5,
    review: `A combination of a great haircut, impeccable service and a lovely atmosphere.<br/> Highly recommend.`,
  },
  {
    name: "Jesse Polowin",
    stars: 5,
    review: `Impeccable customer service experience, and the haircut was exactly as requested. <br/> Will most definitely be coming back.`,
  },
];

export const countryCodes = [
  { label: "Afghanistan (+93)", value: "+93", iso: "AF" },
  { label: "Albania (+355)", value: "+355", iso: "AL" },
  { label: "Algeria (+213)", value: "+213", iso: "DZ" },
  { label: "American Samoa (+1-684)", value: "+1-684", iso: "AS" },
  { label: "Andorra (+376)", value: "+376", iso: "AD" },
  { label: "Angola (+244)", value: "+244", iso: "AO" },
  { label: "Anguilla (+1-264)", value: "+1-264", iso: "AI" },
  { label: "Antarctica (+672)", value: "+672", iso: "AQ" },
  { label: "Antigua and Barbuda (+1-268)", value: "+1-268", iso: "AG" },
  { label: "Argentina (+54)", value: "+54", iso: "AR" },
  { label: "Armenia (+374)", value: "+374", iso: "AM" },
  { label: "Aruba (+297)", value: "+297", iso: "AW" },
  { label: "Australia (+61)", value: "+61", iso: "AU" },
  { label: "Austria (+43)", value: "+43", iso: "AT" },
  { label: "Azerbaijan (+994)", value: "+994", iso: "AZ" },
  { label: "Bahamas (+1-242)", value: "+1-242", iso: "BS" },
  { label: "Bahrain (+973)", value: "+973", iso: "BH" },
  { label: "Bangladesh (+880)", value: "+880", iso: "BD" },
  { label: "Barbados (+1-246)", value: "+1-246", iso: "BB" },
  { label: "Belarus (+375)", value: "+375", iso: "BY" },
  { label: "Belgium (+32)", value: "+32", iso: "BE" },
  { label: "Belize (+501)", value: "+501", iso: "BZ" },
  { label: "Benin (+229)", value: "+229", iso: "BJ" },
  { label: "Bermuda (+1-441)", value: "+1-441", iso: "BM" },
  { label: "Bhutan (+975)", value: "+975", iso: "BT" },
  { label: "Bolivia (+591)", value: "+591", iso: "BO" },
  { label: "Bosnia and Herzegovina (+387)", value: "+387", iso: "BA" },
  { label: "Botswana (+267)", value: "+267", iso: "BW" },
  { label: "Brazil (+55)", value: "+55", iso: "BR" },
  { label: "British Indian Ocean Territory (+246)", value: "+246", iso: "IO" },
  { label: "British Virgin Islands (+1-284)", value: "+1-284", iso: "VG" },
  { label: "Brunei (+673)", value: "+673", iso: "BN" },
  { label: "Bulgaria (+359)", value: "+359", iso: "BG" },
  { label: "Burkina Faso (+226)", value: "+226", iso: "BF" },
  { label: "Burundi (+257)", value: "+257", iso: "BI" },
  { label: "Cambodia (+855)", value: "+855", iso: "KH" },
  { label: "Cameroon (+237)", value: "+237", iso: "CM" },
  { label: "Canada (+1)", value: "+1", iso: "CA" },
  { label: "Cape Verde (+238)", value: "+238", iso: "CV" },
  { label: "Cayman Islands (+1-345)", value: "+1-345", iso: "KY" },
  { label: "Central African Republic (+236)", value: "+236", iso: "CF" },
  { label: "Chad (+235)", value: "+235", iso: "TD" },
  { label: "Chile (+56)", value: "+56", iso: "CL" },
  { label: "China (+86)", value: "+86", iso: "CN" },
  { label: "Christmas Island (+61)", value: "+61", iso: "CX" },
  { label: "Cocos Islands (+61)", value: "+61", iso: "CC" },
  { label: "Colombia (+57)", value: "+57", iso: "CO" },
  { label: "Comoros (+269)", value: "+269", iso: "KM" },
  { label: "Cook Islands (+682)", value: "+682", iso: "CK" },
  { label: "Costa Rica (+506)", value: "+506", iso: "CR" },
  { label: "Croatia (+385)", value: "+385", iso: "HR" },
  { label: "Cuba (+53)", value: "+53", iso: "CU" },
  { label: "Curacao (+599)", value: "+599", iso: "CW" },
  { label: "Cyprus (+357)", value: "+357", iso: "CY" },
  { label: "Czech Republic (+420)", value: "+420", iso: "CZ" },
  {
    label: "Democratic Republic of the Congo (+243)",
    value: "+243",
    iso: "CD",
  },
  { label: "Denmark (+45)", value: "+45", iso: "DK" },
  { label: "Djibouti (+253)", value: "+253", iso: "DJ" },
  { label: "Dominica (+1-767)", value: "+1-767", iso: "DM" },
  {
    label: "Dominican Republic (+1-809, 1-829, 1-849)",
    value: "+1-809, 1-829, 1-849",
    iso: "DO",
  },
  { label: "East Timor (+670)", value: "+670", iso: "TL" },
  { label: "Ecuador (+593)", value: "+593", iso: "EC" },
  { label: "Egypt (+20)", value: "+20", iso: "EG" },
  { label: "El Salvador (+503)", value: "+503", iso: "SV" },
  { label: "Equatorial Guinea (+240)", value: "+240", iso: "GQ" },
  { label: "Eritrea (+291)", value: "+291", iso: "ER" },
  { label: "Estonia (+372)", value: "+372", iso: "EE" },
  { label: "Ethiopia (+251)", value: "+251", iso: "ET" },
  { label: "Falkland Islands (+500)", value: "+500", iso: "FK" },
  { label: "Faroe Islands (+298)", value: "+298", iso: "FO" },
  { label: "Fiji (+679)", value: "+679", iso: "FJ" },
  { label: "Finland (+358)", value: "+358", iso: "FI" },
  { label: "France (+33)", value: "+33", iso: "FR" },
  { label: "French Polynesia (+689)", value: "+689", iso: "PF" },
  { label: "Gabon (+241)", value: "+241", iso: "GA" },
  { label: "Gambia (+220)", value: "+220", iso: "GM" },
  { label: "Georgia (+995)", value: "+995", iso: "GE" },
  { label: "Germany (+49)", value: "+49", iso: "DE" },
  { label: "Ghana (+233)", value: "+233", iso: "GH" },
  { label: "Gibraltar (+350)", value: "+350", iso: "GI" },
  { label: "Greece (+30)", value: "+30", iso: "GR" },
  { label: "Greenland (+299)", value: "+299", iso: "GL" },
  { label: "Grenada (+1-473)", value: "+1-473", iso: "GD" },
  { label: "Guam (+1-671)", value: "+1-671", iso: "GU" },
  { label: "Guatemala (+502)", value: "+502", iso: "GT" },
  { label: "Guernsey (+44-1481)", value: "+44-1481", iso: "GG" },
  { label: "Guinea (+224)", value: "+224", iso: "GN" },
  { label: "Guinea-Bissau (+245)", value: "+245", iso: "GW" },
  { label: "Guyana (+592)", value: "+592", iso: "GY" },
  { label: "Haiti (+509)", value: "+509", iso: "HT" },
  { label: "Honduras (+504)", value: "+504", iso: "HN" },
  { label: "Hong Kong (+852)", value: "+852", iso: "HK" },
  { label: "Hungary (+36)", value: "+36", iso: "HU" },
  { label: "Iceland (+354)", value: "+354", iso: "IS" },
  { label: "India (+91)", value: "+91", iso: "IN" },
  { label: "Indonesia (+62)", value: "+62", iso: "ID" },
  { label: "Iran (+98)", value: "+98", iso: "IR" },
  { label: "Iraq (+964)", value: "+964", iso: "IQ" },
  { label: "Ireland (+353)", value: "+353", iso: "IE" },
  { label: "Isle of Man (+44-1624)", value: "+44-1624", iso: "IM" },
  { label: "Israel (+972)", value: "+972", iso: "IL" },
  { label: "Italy (+39)", value: "+39", iso: "IT" },
  { label: "Jamaica (+1-876)", value: "+1-876", iso: "JM" },
  { label: "Japan (+81)", value: "+81", iso: "JP" },
  { label: "Jersey (+44-1534)", value: "+44-1534", iso: "JE" },
  { label: "Jordan (+962)", value: "+962", iso: "JO" },
  { label: "Kazakhstan (+7)", value: "+7", iso: "KZ" },
  { label: "Kenya (+254)", value: "+254", iso: "KE" },
  { label: "Kiribati (+686)", value: "+686", iso: "KI" },
  { label: "Korea, North (+850)", value: "+850", iso: "KP" },
  { label: "Korea, South (+82)", value: "+82", iso: "KR" },
  { label: "Kuwait (+965)", value: "+965", iso: "KW" },
  { label: "Kyrgyzstan (+996)", value: "+996", iso: "KG" },
  { label: "Laos (+856)", value: "+856", iso: "LA" },
  { label: "Latvia (+371)", value: "+371", iso: "LV" },
  { label: "Lebanon (+961)", value: "+961", iso: "LB" },
  { label: "Lesotho (+266)", value: "+266", iso: "LS" },
  { label: "Liberia (+231)", value: "+231", iso: "LR" },
  { label: "Libya (+218)", value: "+218", iso: "LY" },
  { label: "Liechtenstein (+423)", value: "+423", iso: "LI" },
  { label: "Lithuania (+370)", value: "+370", iso: "LT" },
  { label: "Luxembourg (+352)", value: "+352", iso: "LU" },
  { label: "Madagascar (+261)", value: "+261", iso: "MG" },
  { label: "Malawi (+265)", value: "+265", iso: "MW" },
  { label: "Malaysia (+60)", value: "+60", iso: "MY" },
  { label: "Maldives (+960)", value: "+960", iso: "MV" },
  { label: "Mali (+223)", value: "+223", iso: "ML" },
  { label: "Malta (+356)", value: "+356", iso: "MT" },
  { label: "Marshall Islands (+692)", value: "+692", iso: "MH" },
  { label: "Mauritania (+222)", value: "+222", iso: "MR" },
  { label: "Mauritius (+230)", value: "+230", iso: "MU" },
  { label: "Mayotte (+262)", value: "+262", iso: "YT" },
  { label: "Mexico (+52)", value: "+52", iso: "MX" },
  { label: "Micronesia (+691)", value: "+691", iso: "FM" },
  { label: "Moldova (+373)", value: "+373", iso: "MD" },
  { label: "Monaco (+377)", value: "+377", iso: "MC" },
  { label: "Mongolia (+976)", value: "+976", iso: "MN" },
  { label: "Montenegro (+382)", value: "+382", iso: "ME" },
  { label: "Montserrat (+1-664)", value: "+1-664", iso: "MS" },
  { label: "Morocco (+212)", value: "+212", iso: "MA" },
  { label: "Mozambique (+258)", value: "+258", iso: "MZ" },
  { label: "Myanmar (+95)", value: "+95", iso: "MM" },
  { label: "Namibia (+264)", value: "+264", iso: "NA" },
  { label: "Nauru (+674)", value: "+674", iso: "NR" },
  { label: "Nepal (+977)", value: "+977", iso: "NP" },
  { label: "Netherlands (+31)", value: "+31", iso: "NL" },
  { label: "New Caledonia (+687)", value: "+687", iso: "NC" },
  { label: "New Zealand (+64)", value: "+64", iso: "NZ" },
  { label: "Nicaragua (+505)", value: "+505", iso: "NI" },
  { label: "Niger (+227)", value: "+227", iso: "NE" },
  { label: "Nigeria (+234)", value: "+234", iso: "NG" },
  { label: "Niue (+683)", value: "+683", iso: "NU" },
  { label: "Norfolk Island (+672-3)", value: "+672-3", iso: "NF" },
  { label: "North Macedonia (+389)", value: "+389", iso: "MK" },
  { label: "Northern Mariana Islands (+1-670)", value: "+1-670", iso: "MP" },
  { label: "Norway (+47)", value: "+47", iso: "NO" },
  { label: "Oman (+968)", value: "+968", iso: "OM" },
  { label: "Pakistan (+92)", value: "+92", iso: "PK" },
  { label: "Palau (+680)", value: "+680", iso: "PW" },
  { label: "Palestine (+970)", value: "+970", iso: "PS" },
  { label: "Panama (+507)", value: "+507", iso: "PA" },
  { label: "Papua New Guinea (+675)", value: "+675", iso: "PG" },
  { label: "Paraguay (+595)", value: "+595", iso: "PY" },
  { label: "Peru (+51)", value: "+51", iso: "PE" },
  { label: "Philippines (+63)", value: "+63", iso: "PH" },
  { label: "Pitcairn Islands (+64-9)", value: "+64-9", iso: "PN" },
  { label: "Poland (+48)", value: "+48", iso: "PL" },
  { label: "Portugal (+351)", value: "+351", iso: "PT" },
  { label: "Puerto Rico (+1-787, 1-939)", value: "+1-787, 1-939", iso: "PR" },
  { label: "Qatar (+974)", value: "+974", iso: "QA" },
  { label: "Romania (+40)", value: "+40", iso: "RO" },
  { label: "Russia (+7)", value: "+7", iso: "RU" },
  { label: "Rwanda (+250)", value: "+250", iso: "RW" },
  { label: "Saint Kitts and Nevis (+1-869)", value: "+1-869", iso: "KN" },
  { label: "Saint Lucia (+1-758)", value: "+1-758", iso: "LC" },
  {
    label: "Saint Vincent and the Grenadines (+1-784)",
    value: "+1-784",
    iso: "VC",
  },
  { label: "Samoa (+685)", value: "+685", iso: "WS" },
  { label: "San Marino (+378)", value: "+378", iso: "SM" },
  { label: "Sao Tome and Principe (+239)", value: "+239", iso: "ST" },
  { label: "Saudi Arabia (+966)", value: "+966", iso: "SA" },
  { label: "Senegal (+221)", value: "+221", iso: "SN" },
  { label: "Serbia (+381)", value: "+381", iso: "RS" },
  { label: "Seychelles (+248)", value: "+248", iso: "SC" },
  { label: "Sierra Leone (+232)", value: "+232", iso: "SL" },
  { label: "Singapore (+65)", value: "+65", iso: "SG" },
  { label: "Sint Maarten (+1-721)", value: "+1-721", iso: "SX" },
  { label: "Slovakia (+421)", value: "+421", iso: "SK" },
  { label: "Slovenia (+386)", value: "+386", iso: "SI" },
  { label: "Solomon Islands (+677)", value: "+677", iso: "SB" },
  { label: "Somalia (+252)", value: "+252", iso: "SO" },
  { label: "South Africa (+27)", value: "+27", iso: "ZA" },
  { label: "South Sudan (+211)", value: "+211", iso: "SS" },
  { label: "Spain (+34)", value: "+34", iso: "ES" },
  { label: "Sri Lanka (+94)", value: "+94", iso: "LK" },
  { label: "Sudan (+249)", value: "+249", iso: "SD" },
  { label: "Suriname (+597)", value: "+597", iso: "SR" },
  { label: "Sweden (+46)", value: "+46", iso: "SE" },
  { label: "Switzerland (+41)", value: "+41", iso: "CH" },
  { label: "Syria (+963)", value: "+963", iso: "SY" },
  { label: "Taiwan (+886)", value: "+886", iso: "TW" },
  { label: "Tajikistan (+992)", value: "+992", iso: "TJ" },
  { label: "Tanzania (+255)", value: "+255", iso: "TZ" },
  { label: "Thailand (+66)", value: "+66", iso: "TH" },
  { label: "Timor-Leste (+670)", value: "+670", iso: "TL" },
  { label: "Togo (+228)", value: "+228", iso: "TG" },
  { label: "Tokelau (+690)", value: "+690", iso: "TK" },
  { label: "Tonga (+676)", value: "+676", iso: "TO" },
  { label: "Trinidad and Tobago (+1-868)", value: "+1-868", iso: "TT" },
  { label: "Tunisia (+216)", value: "+216", iso: "TN" },
  { label: "Turkey (+90)", value: "+90", iso: "TR" },
  { label: "Turkmenistan (+993)", value: "+993", iso: "TM" },
  { label: "Tuvalu (+688)", value: "+688", iso: "TV" },
  { label: "Uganda (+256)", value: "+256", iso: "UG" },
  { label: "Ukraine (+380)", value: "+380", iso: "UA" },
  { label: "United Arab Emirates (+971)", value: "+971", iso: "AE" },
  { label: "United Kingdom (+44)", value: "+44", iso: "GB" },
  { label: "United States (+1)", value: "+1", iso: "US" },
  { label: "Uruguay (+598)", value: "+598", iso: "UY" },
  { label: "Uzbekistan (+998)", value: "+998", iso: "UZ" },
  { label: "Vanuatu (+678)", value: "+678", iso: "VU" },
  { label: "Vatican City (+379)", value: "+379", iso: "VA" },
  { label: "Venezuela (+58)", value: "+58", iso: "VE" },
  { label: "Vietnam (+84)", value: "+84", iso: "VN" },
  { label: "Western Sahara (+212)", value: "+212", iso: "EH" },
  { label: "Yemen (+967)", value: "+967", iso: "YE" },
  { label: "Zambia (+260)", value: "+260", iso: "ZM" },
  { label: "Zimbabwe (+263)", value: "+263", iso: "ZW" },
];
