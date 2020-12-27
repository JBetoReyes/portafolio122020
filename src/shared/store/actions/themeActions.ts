const CHANGE_THEME = "[THEME] change theme";

interface IChangeTheme {
  type: typeof CHANGE_THEME;
  payload: string;
}

export type ThemeActionType = IChangeTheme;

export const changeTheme = (theme: string): ThemeActionType => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
