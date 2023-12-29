import { LucideProps } from "lucide-react";
import { FC } from "react";

const Logo: FC<LucideProps> = (props) => {
  return (
    <svg
      {...props}
      width="5000"
      height="5000"
      viewBox="0 0 5000 5000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="5000" height="5000" fill="url(#paint0_linear_5_8)" />
      <g filter="url(#filter0_dd_5_8)">
        <path
          d="M3863.06 1865.42C3850.28 1846.96 3833.22 1831.86 3813.34 1821.44C3793.45 1811.01 3771.34 1805.56 3748.89 1805.56H1850.69L1690.42 1420.83C1669.4 1370.17 1633.82 1326.89 1588.17 1296.47C1542.53 1266.06 1488.88 1249.89 1434.03 1250H1110V1527.78H1434.03L2092.92 3109.03C2103.47 3134.33 2121.27 3155.94 2144.09 3171.14C2166.9 3186.34 2193.7 3194.45 2221.11 3194.45H3332.22C3390.14 3194.45 3441.94 3158.47 3462.36 3104.44L3879.03 1993.33C3886.9 1972.31 3889.56 1949.69 3886.78 1927.41C3884 1905.13 3875.86 1883.86 3863.06 1865.42ZM3235.97 2916.67H2313.75L1966.53 2083.33H3548.47L3235.97 2916.67Z"
          fill="white"
        />
        <path
          d="M2290.56 3750C2405.61 3750 2498.89 3656.73 2498.89 3541.67C2498.89 3426.61 2405.61 3333.33 2290.56 3333.33C2175.5 3333.33 2082.22 3426.61 2082.22 3541.67C2082.22 3656.73 2175.5 3750 2290.56 3750Z"
          fill="white"
        />
        <path
          d="M3262.78 3750C3377.84 3750 3471.11 3656.73 3471.11 3541.67C3471.11 3426.61 3377.84 3333.33 3262.78 3333.33C3147.72 3333.33 3054.44 3426.61 3054.44 3541.67C3054.44 3656.73 3147.72 3750 3262.78 3750Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_5_8"
          x="1060"
          y="1220"
          width="2857.85"
          height="2560"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="30" dy="30" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5_8"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-50" dy="-30" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_5_8"
            result="effect2_dropShadow_5_8"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_5_8"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_5_8"
          x1="0"
          y1="0"
          x2="3517.5"
          y2="5000"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#070707" />
          <stop offset="1" stopColor="#646464" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Icons = {
  logo: Logo,
};
