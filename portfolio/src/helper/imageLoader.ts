'use client'

export default function imageLoader({ src, width, quality }: {src: string, width: number, quality: number}) {
  return `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_ENDPOINT}/${src}?w=${width}&q=${quality || 75}`
}