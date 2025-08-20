import i18n from "@/i18n"

export const isRTL = () => i18n.language === "ar"
export const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
export async function urlToBlob(imageUrl) {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl)

    // Ensure the fetch was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    // Convert the image to a Blob
    const imageBlob = await response.blob()

    return imageBlob
  } catch (error) {
    console.error("Error converting URL to Blob:", error)
  }
}
//2 == "ithraa"
//5 == Novotel Thakher Makkah
//6 == rawaf Mina
//7 == Makkah Construction & Development Company
//8 == ithraa-aljoud

export const adminEmail = "admin@admin.com" // Admin email for authentication
export const ithraaEmail = "ithraa@admin.com" // Ithraa email for authentication
export const novotelEmail = "Novotel@admin.com" // Novotel email for authentication
export const rawafMinaEmail = "rawafMina@admin.com" // Rawaf Mina email for authentication
export const MakkahEmail = "Makkah@admin.com" // Makkah email for authentication
export const ithraaAljoudEmail = "ithraaAljoud@admin.com" // Ithraa Aljoud email for authentication
export const correctPassword = "password123"

export function extractTimeWithAmPm(isoString) {
  try {
    let date = new Date(isoString)

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string")
    }

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    let ampm = hours >= 12 ? "م" : "ص"

    hours = hours % 12
    hours = hours ? hours : 12

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    let extractedTime = `${hours}:${minutes}:${seconds} ${ampm}`
    return extractedTime
  } catch (error) {
    console.error("Error extracting time:", error)
    return "Invalid time"
  }
}
