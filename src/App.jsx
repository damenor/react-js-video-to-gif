import React, { useState, useEffect } from 'react'

import { load, convertToGif } from './utils/ffmpeg'

import { FormDynamic } from './components/FormDynamic'

const App = () => {

  const inputs = [
    { name: 'initial', type: 'number', label: 'Initial', value: '0', props: { min: 0, max: 100 }},
    { name: 'duration', type: 'number', label: 'Duration', value: '0', props: { min: 0, max: 100 } }
  ]

  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState()
  const [gif, setGif] = useState()

  useEffect(() =>  {
   (async() => {
      const isLoad = await load()
      console.log(isLoad)
      setReady(isLoad)
   })() 
  }, [])

  const handleResetVideo = () => {
    setVideo(null)
    setGif(null)
  }

  const handleOnChangeInputVideo = (e) => setVideo(e.target.files?.item(0))

  const handleOnLoadData = (e) => inputs.map(input => input.props.max = parseInt(e.target.duration))

  const fileDownload = () => {
    const a = document.createElement('a')
    a.href = gif
    a.download = 'prueba.gif'
    a.click()
  }

  return (
    <div className="container">

      <h1 className="title">VideoToGif</h1>
      
      <div className="container__video">

        { !ready && <img className="loading" src="assets/loading.gif"/> } 

        { ready && video && !gif && <video controls src={URL.createObjectURL(video)} onLoadedData={handleOnLoadData} /> }

        {
          ready && !video && <div className="video-input">
            <input id="video-input" hidden type="file" onChange={handleOnChangeInputVideo}/>
            <label htmlFor="video-input">Choose video</label>
          </div>
        }

        { gif && (
          <div className="image">
            <img src={gif}/>
          </div>
        )}

      </div>

      { ready && video && (
        <div className="container__form">
            <button className="btn-reset" onClick={handleResetVideo}>Reset Video</button>
          { gif && <button className="btn-download" onClick={fileDownload}>Download</button> }
          { !gif && (<>
            <FormDynamic 
              inputs={inputs} 
              onSubmit={async (values) => {
                const gifUrl = await convertToGif({ ...values, video })
                setGif(gifUrl)
              }}
              titleSubmit="Convert"/>
          </>)}

        </div>
      )}

    </div>
  ) 
}

export default App
