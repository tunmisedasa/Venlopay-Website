import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { validateReferralId } from '../utils/waitlistApi'

export const useReferral = () => {
  const [referralId, setReferralId] = useState('')
  const [isValidReferral, setIsValidReferral] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check URL for referral ID
    const pathMatch = location.pathname.match(/^\/ref\/([a-zA-Z0-9]+)$/)
    const urlParams = new URLSearchParams(location.search)
    const refParam = urlParams.get('ref')
    
    const foundReferralId = pathMatch?.[1] || refParam
    
    if (foundReferralId) {
      const isValid = validateReferralId(foundReferralId)
      setReferralId(foundReferralId)
      setIsValidReferral(isValid)
      
      // Store in sessionStorage for form pre-fill
      if (isValid) {
        sessionStorage.setItem('referralId', foundReferralId)
      }
    } else {
      // Check sessionStorage for previously stored referral
      const storedReferral = sessionStorage.getItem('referralId')
      if (storedReferral && validateReferralId(storedReferral)) {
        setReferralId(storedReferral)
        setIsValidReferral(true)
      }
    }
  }, [location])

  const clearReferral = () => {
    setReferralId('')
    setIsValidReferral(false)
    sessionStorage.removeItem('referralId')
  }

  return {
    referralId,
    isValidReferral,
    clearReferral
  }
}