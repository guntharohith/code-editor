import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialCode) {

    const [code, setCode] = useState(() => {
        const jsonCode = localStorage.getItem(key)
        if (jsonCode != null) return JSON.parse(jsonCode)

        if (typeof initialCode === 'function') {
            return initialCode()
        } else {
            return initialCode
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(code))
    }, [key, code])

    return [code, setCode]
}
