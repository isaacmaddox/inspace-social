import { TailwindConfig } from "@react-email/components";

// Importing HSLA values for dark theme
const surfaceColors = {
   50: 'hsla(220, 25%, 3%, 1)',
   100: 'hsla(220, 25%, 7%, 1)',
   200: 'hsla(220, 23%, 11%, 1)',
   300: 'hsla(220, 23%, 15%, 1)',
   400: 'hsla(220, 21%, 20%, 1)',
   500: 'hsla(220, 21%, 28%, 1)',
   600: 'hsla(220, 19%, 37%, 1)',
   700: 'hsla(220, 19%, 45%, 1)',
   800: 'hsla(220, 17%, 52%, 1)',
   900: 'hsla(220, 17%, 80%, 1)',
   950: 'hsla(220, 15%, 87%, 1)',
};

const primaryColors = {
   50: 'hsla(220, 80%, 70%, 1)',
   100: 'hsla(220, 80%, 65%, 1)',
   200: 'hsla(220, 80%, 60%, 1)',
   300: 'hsla(220, 80%, 55%, 1)',
   400: 'hsla(220, 80%, 50%, 1)',
   500: 'hsla(220, 80%, 45%, 1)',
   600: 'hsla(220, 80%, 40%, 1)',
   700: 'hsla(220, 80%, 35%, 1)',
   800: 'hsla(220, 80%, 30%, 1)',
   900: 'hsla(220, 80%, 25%, 1)',
   950: 'hsla(220, 80%, 20%, 1)',
};

export const tailwindThemeExtend: TailwindConfig = {
   theme: {
      extend: {
         colors: {
            surface: surfaceColors,
            primary: primaryColors,
         },
         textColor: {
            heading: 'hsla(224, 25%, 95%, 1)',
            headingDim: 'hsla(224, 25%, 87.5%, 1)',
            body: 'hsla(224, 15%, 80%, 1)',
            muted: 'hsla(215, 9%, 55%, 1)',
            tooltip: 'hsla(215, 9%, 50%, 1)',
            inverted: 'hsla(222, 47%, 11%, 1)',
            onPrimary: 'hsla(220, 14%, 95%, 1)',
         }
      },
   }
}