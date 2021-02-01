/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface  */

import { Theme as DefaultTheme } from "@material-ui/core/styles";
import {
  ClassNameMap,
  Styles,
  WithStylesOptions
} from "@material-ui/styles/withStyles";
import { Omit } from "@material-ui/types";

declare module "@material-ui/core/styles/makeStyles" {
  type MakeStylesOptions<Theme = DefaultTheme> = Omit<
    WithStylesOptions<Theme>,
    "withTheme"
  > & {
    name: string;
  };
  /**
   * `makeStyles` where the passed `styles` do not depend on props
   */
  export default function makeStyles<
    Theme = DefaultTheme,
    ClassKey extends string = string
  >(
    style: Styles<Theme, UnknownRecord, ClassKey>,
    // instead of using https://github.com/madflanderz/eslint-plugin-makestyles
    // makes styles' name mandatory - it's useful for debugging
    options: MakeStylesOptions<Theme>
  ): (props?: UnknownRecord) => ClassNameMap<ClassKey>;

  /**
   * `makeStyles` where the passed `styles` do depend on props
   */
  export default function makeStyles<
    Theme = DefaultTheme,
    Props extends UnknownRecord = UnknownRecord,
    ClassKey extends string = string
  >(
    styles: Styles<Theme, Props, ClassKey>,
    // instead of using https://github.com/madflanderz/eslint-plugin-makestyles
    // makes styles' name mandatory - it's useful for debugging
    options: MakeStylesOptions<Theme>
  ): (props: Props) => ClassNameMap<ClassKey>;
}

declare module "@material-ui/core/styles/createPalette" {
  interface CustomPalette {
    custom: {
      darkGrey: string;
      lightGrey: string;
    };
  }

  export interface Palette extends CustomPalette {}
  export interface PaletteOptions extends CustomPalette {}
}
