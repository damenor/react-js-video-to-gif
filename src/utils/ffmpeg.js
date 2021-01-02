import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: false })

export const load = async () => {
  try {
    await ffmpeg.load()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const convertToGif = async ({ initial, duration, video }) => {

  // Write the file to memory 
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))

  // Run the FFMpeg command
  await ffmpeg.run('-i', 'test.mp4', '-t', duration, '-ss', initial, '-f', 'gif', 'out.gif')
  // Read the result
  const data = ffmpeg.FS('readFile', 'out.gif')

  // Create a URL
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
  return url

}