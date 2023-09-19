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
    if (hourToEdit !== "12") {
      const newHour = parseInt(slot.slice(0, -2).split(":")[0]) - 1;
      if (newHour.toString().length === 2) {
        return newHour.toString() + ":" + newMinute + slot.slice(-2);
      } else {
        return "0" + newHour.toString() + ":" + newMinute + slot.slice(-2);
      }
    } else {
      const newHour = "11";
      return newHour + ":" + newMinute + "am";
    }
  }
};
