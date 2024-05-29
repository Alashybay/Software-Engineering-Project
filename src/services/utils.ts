export const parseJSONString = (str: string | null) => {
    try {
      if (str === null) return null

      return JSON.parse(str)
    } catch (error) {
      return null
    }
  }
