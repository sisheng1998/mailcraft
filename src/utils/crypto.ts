const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY

export const encrypt = (plainText: string): string => {
  const encoder = new TextEncoder()
  const encodedKey = encoder.encode(SECRET_KEY)
  const data = encoder.encode(plainText)

  const encryptedData = Array.from(data).map((byte, index) => {
    const keyByte = encodedKey[index % encodedKey.length]
    return byte ^ keyByte
  })

  return btoa(String.fromCharCode(...encryptedData))
}

export const decrypt = (encryptedText: string): string => {
  const encoder = new TextEncoder()
  const encodedKey = encoder.encode(SECRET_KEY)

  const encryptedData = Uint8Array.from(atob(encryptedText), (char) =>
    char.charCodeAt(0)
  )

  const decryptedData = encryptedData.map((byte, index) => {
    const keyByte = encodedKey[index % encodedKey.length]
    return byte ^ keyByte
  })

  return new TextDecoder().decode(decryptedData)
}
