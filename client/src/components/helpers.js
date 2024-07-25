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
