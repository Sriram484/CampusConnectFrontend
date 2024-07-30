const convertObjectToString = (obj) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (error) {
      console.error("Error converting object to string:", error);
      return '';
    }
  };

export default convertObjectToString;