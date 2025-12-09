export interface SlackTheme {
  name: string;
  description: string;
  themeString: string;
  colors: {
    columnBg: string;
    menuBgHover: string;
    activeItem: string;
    activeItemText: string;
    hoverItem: string;
    textColor: string;
    activePresence: string;
    mentionBadge: string;
    topNavBg: string;
    topNavText: string;
  };
}

// Slack themes use 10 comma-separated hex colors in this order:
// 1. Column BG (sidebar background)
// 2. Menu BG Hover (hover state in menus)
// 3. Active Item (selected channel background)
// 4. Active Item Text (selected channel text)
// 5. Hover Item (hover state background)
// 6. Text Color (sidebar text)
// 7. Active Presence (online indicator)
// 8. Mention Badge (notification badge)
// 9. Top Nav BG (workspace switcher background)
// 10. Top Nav Text (workspace switcher text)
//
// Reference: https://github.com/sachinh19/slack-themes

export const slackThemes: SlackTheme[] = [
  {
    name: "Sandworm Dark",
    description: "Dark theme matching our design system's dark mode. Recommended for most users.",
    themeString: "#0D0A11,#1B1522,#1B1522,#F7F6F8,#1B1522,#E9E7EB,#72B1AD,#D05082,#0D0A11,#F7F6F8",
    colors: {
      columnBg: "#0D0A11",       // stone-975
      menuBgHover: "#1B1522",    // stone-850
      activeItem: "#1B1522",     // stone-850
      activeItemText: "#F7F6F8", // stone-025
      hoverItem: "#1B1522",      // stone-850
      textColor: "#E9E7EB",      // stone-050
      activePresence: "#72B1AD", // teal-400
      mentionBadge: "#D05082",   // magenta-500
      topNavBg: "#0D0A11",       // stone-975
      topNavText: "#F7F6F8",     // stone-025
    },
  },
  {
    name: "Sandworm Light",
    description: "Light theme for those who prefer a brighter workspace.",
    themeString: "#F7F6F8,#E9E7EB,#E9E7EB,#0D0A11,#E9E7EB,#514A59,#72B1AD,#D05082,#F7F6F8,#0D0A11",
    colors: {
      columnBg: "#F7F6F8",       // stone-025
      menuBgHover: "#E9E7EB",    // stone-050
      activeItem: "#E9E7EB",     // stone-050
      activeItemText: "#0D0A11", // stone-975
      hoverItem: "#E9E7EB",      // stone-050
      textColor: "#514A59",      // stone-600
      activePresence: "#72B1AD", // teal-400
      mentionBadge: "#D05082",   // magenta-500
      topNavBg: "#F7F6F8",       // stone-025
      topNavText: "#0D0A11",     // stone-975
    },
  },
  {
    name: "Violet Accent Dark",
    description: "Dark creative theme using violet tones throughout.",
    themeString: "#14091D,#331B56,#7C6BDB,#FFFFFF,#331B56,#ECE5FE,#9589E5,#7C6BDB,#14091D,#F9F7FF",
    colors: {
      columnBg: "#14091D",       // violet-975
      menuBgHover: "#331B56",    // violet-850
      activeItem: "#7C6BDB",     // violet-500
      activeItemText: "#FFFFFF", // white
      hoverItem: "#331B56",      // violet-850
      textColor: "#ECE5FE",      // violet-050
      activePresence: "#9589E5", // violet-400
      mentionBadge: "#7C6BDB",   // violet-500
      topNavBg: "#14091D",       // violet-975
      topNavText: "#F9F7FF",     // violet-025
    },
  },
  {
    name: "Violet Accent Light",
    description: "Light creative theme using violet tones on a bright background.",
    themeString: "#FCFBFF,#DDD0FD,#7C6BDB,#FFFFFF,#DDD0FD,#5B3FB2,#9589E5,#7C6BDB,#FCFBFF,#14091D",
    colors: {
      columnBg: "#FCFBFF",       // violet-012
      menuBgHover: "#DDD0FD",    // violet-100
      activeItem: "#7C6BDB",     // violet-500
      activeItemText: "#FFFFFF", // white
      hoverItem: "#DDD0FD",      // violet-100
      textColor: "#5B3FB2",      // violet-700
      activePresence: "#9589E5", // violet-400
      mentionBadge: "#7C6BDB",   // violet-500
      topNavBg: "#FCFBFF",       // violet-012
      topNavText: "#14091D",     // violet-975
    },
  },
  {
    name: "Magenta Pop Dark",
    description: "Dark bold theme using magenta tones throughout.",
    themeString: "#180C15,#3D1B32,#B44F85,#FFFFFF,#3D1B32,#F8DDE9,#C87AA1,#B44F85,#180C15,#FCF2F6",
    colors: {
      columnBg: "#180C15",       // magenta-975
      menuBgHover: "#3D1B32",    // magenta-850
      activeItem: "#B44F85",     // magenta-500
      activeItemText: "#FFFFFF", // white
      hoverItem: "#3D1B32",      // magenta-850
      textColor: "#F8DDE9",      // magenta-050
      activePresence: "#C87AA1", // magenta-400
      mentionBadge: "#B44F85",   // magenta-500
      topNavBg: "#180C15",       // magenta-975
      topNavText: "#FCF2F6",     // magenta-025
    },
  },
  {
    name: "Magenta Pop Light",
    description: "Light bold theme using magenta tones on a bright background.",
    themeString: "#FDFBFC,#F4CAD9,#B44F85,#FFFFFF,#F4CAD9,#7E2A59,#C87AA1,#B44F85,#FDFBFC,#180C15",
    colors: {
      columnBg: "#FDFBFC",       // magenta-012
      menuBgHover: "#F4CAD9",    // magenta-100
      activeItem: "#B44F85",     // magenta-500
      activeItemText: "#FFFFFF", // white
      hoverItem: "#F4CAD9",      // magenta-100
      textColor: "#7E2A59",      // magenta-700
      activePresence: "#C87AA1", // magenta-400
      mentionBadge: "#B44F85",   // magenta-500
      topNavBg: "#FDFBFC",       // magenta-012
      topNavText: "#180C15",     // magenta-975
    },
  },
  {
    name: "Teal Focus Dark",
    description: "Dark calm theme using teal tones throughout.",
    themeString: "#0C120F,#283E3C,#72B1AD,#FFFFFF,#283E3C,#E6F5F2,#72B1AD,#558E8B,#0C120F,#EEF8F4",
    colors: {
      columnBg: "#0C120F",       // teal-975
      menuBgHover: "#283E3C",    // teal-850
      activeItem: "#72B1AD",     // teal-400
      activeItemText: "#FFFFFF", // white
      hoverItem: "#283E3C",      // teal-850
      textColor: "#E6F5F2",      // teal-050
      activePresence: "#72B1AD", // teal-400 (matches theme)
      mentionBadge: "#558E8B",   // teal-500
      topNavBg: "#0C120F",       // teal-975
      topNavText: "#EEF8F4",     // teal-025
    },
  },
  {
    name: "Teal Focus Light",
    description: "Light calm theme using teal tones on a bright background.",
    themeString: "#F7FCFA,#E2F2EF,#72B1AD,#FFFFFF,#E2F2EF,#3F5957,#72B1AD,#558E8B,#F7FCFA,#0C120F",
    colors: {
      columnBg: "#F7FCFA",       // teal-012
      menuBgHover: "#E2F2EF",    // teal-100
      activeItem: "#72B1AD",     // teal-400
      activeItemText: "#FFFFFF", // white
      hoverItem: "#E2F2EF",      // teal-100
      textColor: "#3F5957",      // teal-700
      activePresence: "#72B1AD", // teal-400
      mentionBadge: "#558E8B",   // teal-500
      topNavBg: "#F7FCFA",       // teal-012
      topNavText: "#0C120F",     // teal-975
    },
  },
  {
    name: "Desert Sand Dark",
    description: "Dark warm theme using sand tones throughout.",
    themeString: "#18100C,#4F3B2B,#FFB370,#18100C,#4F3B2B,#FEF0DC,#FFB370,#C88A50,#18100C,#FEF5EB",
    colors: {
      columnBg: "#18100C",       // sand-975
      menuBgHover: "#4F3B2B",    // sand-850
      activeItem: "#FFB370",     // sand-300
      activeItemText: "#18100C", // sand-975 (dark text on light bg)
      hoverItem: "#4F3B2B",      // sand-850
      textColor: "#FEF0DC",      // sand-050
      activePresence: "#FFB370", // sand-300 (matches theme)
      mentionBadge: "#C88A50",   // sand-400
      topNavBg: "#18100C",       // sand-975
      topNavText: "#FEF5EB",     // sand-025
    },
  },
  {
    name: "Desert Sand Light",
    description: "Light warm theme using sand tones on a bright background.",
    themeString: "#FFFBF7,#FFEACC,#FFB370,#18100C,#FFEACC,#866149,#FFB370,#C88A50,#FFFBF7,#18100C",
    colors: {
      columnBg: "#FFFBF7",       // sand-012
      menuBgHover: "#FFEACC",    // sand-100
      activeItem: "#FFB370",     // sand-300
      activeItemText: "#18100C", // sand-975 (dark text on light accent)
      hoverItem: "#FFEACC",      // sand-100
      textColor: "#866149",      // sand-700
      activePresence: "#FFB370", // sand-300
      mentionBadge: "#C88A50",   // sand-400
      topNavBg: "#FFFBF7",       // sand-012
      topNavText: "#18100C",     // sand-975
    },
  },
];
