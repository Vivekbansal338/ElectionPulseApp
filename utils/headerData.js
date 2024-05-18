import { color2 } from "./colorData";

export const getProfileHeaderData = (status) => {
  switch (status) {
    case "PersonalDetails":
      return {
        color: color2.primary,
        icon: "person-outline",
        scrollx: 0,
        next: "VerificationSecurity",
        prev: "PersonalDetails",
      };
    case "VerificationSecurity":
      return {
        color: color2.success,
        icon: "lock-closed-outline",
        scrollx: 170,
        next: "AccountSettings",
        prev: "PersonalDetails",
      };
    case "AccountSettings":
      return {
        color: color2.help,
        icon: "settings-outline",
        scrollx: 400,
        next: "UpdateProfile",
        prev: "VerificationSecurity",
      };
    case "UpdateProfile":
      return {
        color: color2.secondary,
        icon: "create-outline",
        scrollx: 500,
        next: "UpdateProfile",
        prev: "AccountSettings",
      };
    default:
      return { color: color2.secondary, icon: "create-outline", scrollx: 500 };
  }
};

export const getVoteHeaderData = (status) => {
  switch (status) {
    case "Vote":
      return {
        color: color2.primary,
        icon: "hand-right-outline",
        scrollx: 0,
        next: "Info",
        prev: "Vote",
      };
    case "Info":
      return {
        color: color2.help,
        icon: "information-circle-outline",
        scrollx: 100,
        next: "Stats",
        prev: "Vote",
      };
    case "Stats":
      return {
        color: color2.success,
        icon: "analytics-outline",
        scrollx: 400,
        next: "Map",
        prev: "Info",
      };

    case "Map":
      return {
        color: color2.secondary,
        icon: "map-outline",
        scrollx: 400,
        next: "Chats",
        prev: "Stats",
      };
    case "Chats":
      return {
        color: color2.danger,
        icon: "chatbubbles-outline",
        scrollx: 400,
        next: "Chats",
        prev: "Map",
      };
    default:
      return {
        color: color2.secondary,
        icon: "hand-right-outline",
        scrollx: 0,
      };
  }
};

export const detailedTabs = [
  {
    name: "Voter Data",
    icon: "person-outline",
    color: color2.primary,
  },
  {
    name: "Achievements",
    icon: "trophy-outline",
    color: color2.help,
  },
  {
    name: "Issues",
    icon: "alert-circle-outline",
    color: color2.danger,
  },
  {
    name: "Submit",
    icon: "checkmark-circle-outline",
    color: color2.success,
  },
];

export const infoTabs = [
  { name: "Election", icon: "calendar-outline", color: color2.primary },
  { name: "Party", icon: "people-outline", color: color2.help },
  { name: "Employee", icon: "person-circle-outline", color: color2.danger },
];
