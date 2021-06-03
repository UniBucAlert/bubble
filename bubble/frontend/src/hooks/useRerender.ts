import React, { useCallback, useState } from 'react'

export const useRerender = () => {
  const [_, set_] = useState<any>({})

  return useCallback(() => {
    set_({})
  }, [])
}
