/*
 * WARNING ! You probably want to use `classNameModule`.
 *
 * Helps to write prettier code.
 *
 * <div className={`MyComponent${active?" active":""}`} />
 * become :
 * <div {...className("MyComponent", {active})} />
 */
export const className = (...list: TClassNameList) => ({
    className: transformList(list).join(' '),
  });
  
  /**
   * Helps to write simpler code for module classNames.
   *
   * Example :
   * ```
   * <div className={`MyComponent${active?" active":""}`} />
   * ```
   *
   * Become :
   *
   * ```
   * import styles from './MyComponent.module.scss'
   * const className = classNameModule(styles)
   * // ...
   * <div {...className('MyComponent', { active })}/>
   * ```
   *
   *
   */
  export const classNameModule =
    (styles: Record<string, string>) =>
    (...list: TClassNameList) => ({
      className: transformList(list)
        .map((item) => styles[item])
        .join(' '),
    });
  
  const transformList = (list: TClassNameList): string[] => {
    const particules: string[] = [];
  
    for (const item of list) {
      if (typeof item === 'string') particules.push(item);
  
      for (const [key, value] of Object.entries(item)) {
        if (value === true && !particules.includes(key)) particules.push(key);
      }
    }
  
    return particules;
  };
  
  export type TClassNameList = TClassNameItem[];
  
  type TClassNameItem = string | { [key: string]: boolean };