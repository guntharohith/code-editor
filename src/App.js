import React, { useState } from 'react'
import Editor from './components/Editor'
import useLocalStorage from './useLocalStorage'
import { BiChevronDown} from 'react-icons/bi'
import { MdKeyboardArrowRight} from 'react-icons/md'
import { VscRunAll} from 'react-icons/vsc'
// import urlencode from 'urlencode'
// import axios from 'axios'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [codeDoc, setCodeDoc] = useState('')
  const [codeSelector,setCodeSelector] = useState([true,false,false])
  const [isOpen, setIsOpen] = useState(true)

  function run(){
    setCodeDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
  }
  function toggleMenu(){
    setIsOpen(!isOpen)
  }

  // function getSharableLink(){
  //   axios.post('https://pastebin.com/api/api_post.php',
  //   {
  //     headers:{
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   },
  //   {
  //     api_dev_key : 'G1M4kdua285RFodgZWbOZtMxYWH4yBPf',
  //     api_option : 'paste',
  //     api_paste_code : urlencode(html)
  //   }).then((res) => console.log(res))
  // }

  return (
    <>
      
      <div className="title">
        <h2>Welcome to the Code Editor</h2>
        <div className="run-icon">
          <VscRunAll className="icon"/>
          <button onClick={run} className="run-button" >RUN</button>
        </div>
        
      </div>
      <div className="code-section top-section">
        <div className="lang-main">
          <div className="icon-group" onClick={toggleMenu}>
            {!isOpen && <MdKeyboardArrowRight  className="icon"/>}
            {isOpen && <BiChevronDown className="icon"/>}
            <h3>File Explorer</h3>
          </div>
          <div className="divider"></div>
          {isOpen && <ul className="lang-menu">
            <li className={`${codeSelector[0] ? "active" : ""}`} onClick={() => setCodeSelector([true, false, false])}>index.html</li>
            <li className={`${codeSelector[1] ? "active" : ""}`} onClick={() => setCodeSelector([false, true, false])}>index.css</li>
            <li className={`${codeSelector[2] ? "active" : ""}`} onClick={() => setCodeSelector([false, false, true])}>index.js</li>
          </ul>}
          
        </div>

        {codeSelector[0] && <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />}
        {codeSelector[1] && <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />}
        {codeSelector[2] && <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />}
      </div>
      <div className="code-section">
        <iframe
          srcDoc={codeDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;