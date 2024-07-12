

type ClassNameOptions = {
    [key: string]: boolean | undefined;
  };
  
  export const classNames = (
    baseClassName: string,
    options?: ClassNameOptions
  ): { className: string } => {
    let classNames = baseClassName;
  
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (value) {
          classNames += ` ${key}`;
        }
      }
    }
  
    return { className: classNames };
  };