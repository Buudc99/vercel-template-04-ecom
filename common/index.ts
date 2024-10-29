import {headers} from "next/headers";

export const Common = {
  keys: {
    filter: {
      all: "all",
      premium: "premium",
      free: "free",
      list: ["all", "premium", "free"],
    },
  },
  styles: {
    contrast_hover:
      "absolute z-[2] opacity-0 top-0 w-full h-full blur-[0px] bg-[#575757]/30 mix-blend-screen backdrop-contrast-[137%] backdrop-brightness-[98%] backdrop-saturate-[0%] blur-[4px] hover:opacity-[0.8] absolute transition-all duration-500 ease-in-out cursor-pointer",
    contrast_unhover:
      "absolute z-[2] top-0 w-full h-full bg-black bg-opacity-40 opacity-100 absolute transition-all duration-500 ease-in-out cursor-pointer",
    overlay_gradient_to_r:
      "before:absolute before:bg-gradient-to-r before:h-full before:w-6 before:top-0 before:left-0 before:z-[2]",
    overlay_gradient_to_l:
      "after:absolute after:bg-gradient-to-l after:h-full after:w-6 after:top-0 after:right-0 after:z-[2]",
    grid_news: {
      container: "grid grid-cols-12 min-h-[66.5625rem] gap-6",
      child_left:
        "col-span-12 810:col-span-8 1200:col-span-9 flex flex-col gap-6",
      child_right:
        "flex flex-col items-start w-full col-span-12 810:col-span-4 1200:col-span-3",
    },
  },
  headers: {
    menu: [
      {
        label: "Business",
        value: "business",
        link: "/business",
        enabled: true,
      },
      {
        label: "LifeStyle",
        value: "lifestyle",
        link: "/lifestyle",
        enabled: true,
      },
      {
        label: "Sport",
        value: "sport",
        link: "/sport",
        enabled: true,
      },
      {
        label: "Travel",
        value: "travel",
        link: "/travel",
        enabled: true,
      },
      {
        label: "Technology",
        value: "technology",
        link: "/technology",
        enabled: true,
      },
    ],
  },
  home: {
    category: [
      {
        label: "Business",
        value: "business",
        link: "/business",
        enabled: true,
        data: [
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          // {
          //   title: "Newspaper in 2024 asfas",
          //   desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
          //   time: "Feb, 28 2024",
          //   name: "Nguyen van a",
          // },
          // {
          //   title: "Newspaper in 2024 asfas",
          //   desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
          //   time: "Feb, 28 2024",
          //   name: "Nguyen van a",
          // },
        ],
      },
      {
        label: "LifeStyle",
        value: "life-style",
        link: "/life-style",
        enabled: true,
        data: [
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
        ],
      },
      {
        label: "Sport",
        value: "sport",
        link: "/sport",
        enabled: true,
        data: [
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
        ],
      },
      {
        label: "Travel",
        value: "travel",
        link: "/travel",
        enabled: true,
        data: [
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
        ],
      },
      {
        label: "Technology",
        value: "technology",
        link: "/technology",
        enabled: true,
        data: [
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
          {
            title: "Newspaper in 2024 asfas",
            desc: "a j s bhdfamsndiahs dnaiskh das ndiahsj",
            time: "Feb, 28 2024",
            name: "Nguyen van a",
          },
        ],
      },
    ],
  },
  business: {
    news_list: [
      {
        title: "Nulla Minim Ea Eiusmod Reprehenderit Esse Sunt In",
        desc: "Elit qui do aliquip incididunt non laboris Lorem ad sint. Pariatur veniam ipsum voluptate labore cillum non aliqua qui labore voluptate qui. Id commodo laborum est est pariatur consectetur exercitation nostrud.",
        time: "Monday, May 16, 2022",
        name: "Hayuda Dan",
        type: "premium",
      },
      {
        title: "Nulla Minim Ea Eiusmod Reprehenderit Esse Sunt In",
        desc: "Elit qui do aliquip incididunt non laboris Lorem ad sint. Pariatur veniam ipsum voluptate labore cillum non aliqua qui labore voluptate qui. Id commodo laborum est est pariatur consectetur exercitation nostrud.",
        time: "Monday, May 16, 2022",
        name: "Hayuda Dan",
        type: "free",
      },
      {
        title: "Nulla Minim Ea Eiusmod Reprehenderit Esse Sunt In",
        desc: "Elit qui do aliquip incididunt non laboris Lorem ad sint. Pariatur veniam ipsum voluptate labore cillum non aliqua qui labore voluptate qui. Id commodo laborum est est pariatur consectetur exercitation nostrud.",
        time: "Monday, May 16, 2022",
        name: "Hayuda Dan",
        type: "free",
      },
    ],
  },
};

export enum Variables {
  AES_SECRET_ID_USER_CODE = "8TfW9Eyu6f2n6P429VPcGMfVL6bEnFrCnJXQNTeLkvQXGF6ibR",
}
