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

export const getHomeHeaderData = (status) => {
  switch (status) {
    case "Upcoming":
      return { color: "#17A2B8", icon: "calendar-outline" };
    case "Ongoing":
      return { color: "#28A745", icon: "sync-circle-outline" };
    case "Completed":
      return { color: "#6C757D", icon: "checkmark-circle-outline" };
    default:
      return { color: "#333", icon: "help-circle-outline" };
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

export const statsTabs = [
  { name: "My Stats", icon: "person-outline", color: color2.help },
  { name: "Team Stats", icon: "people-outline", color: color2.primary },
];

export const mapTabs = [
  {
    name: "Journey",
    icon: "car",
    color: color2.primary,
  },
  {
    name: "Current Location",
    icon: "locate",
    color: color2.success,
  },
  {
    name: "Constituency",
    icon: "people-outline",
    color: color2.danger,
  },
];

export const teamStats = [
  {
    name: "Total Votes",
    icon: "checkmark-circle-outline",
    color: color2.success,
    count: 0,
  },
  {
    name: "Detailed Votes",
    icon: "list-outline",
    color: color2.danger,
    count: 0,
  },
  {
    name: "Bulk Votes",
    icon: "file-tray-full-outline",
    color: color2.warning,
    count: 0,
  },
  {
    name: "Quick Votes",
    icon: "speedometer-outline",
    color: color2.secondary,
    count: 0,
  },
  {
    name: "Distance Traveled",
    icon: "navigate-outline",
    color: color2.tertiary,
    count: 0,
  },
];

export const individualStats = [
  {
    name: "Total Votes",
    icon: "checkmark-circle-outline",
    color: color2.success,
    count: 0,
  },
  {
    name: "Detailed Votes",
    icon: "list-outline",
    color: color2.danger,
    count: 0,
  },
  {
    name: "Bulk Votes",
    icon: "file-tray-full-outline",
    color: color2.warning,
    count: 0,
  },
  {
    name: "Quick Votes",
    icon: "speedometer-outline",
    color: color2.secondary,
    count: 0,
  },
  {
    name: "Distance Traveled",
    icon: "navigate-outline",
    color: color2.tertiary,
    count: 0,
  },
];
