import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap, indentWithTab} from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

export default function Editor() {
  const editor = React.useRef()
  const [code, setCode] = React.useState('')
  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString())
  })

  React.useEffect(() => {
    const startState = EditorState.create({
      doc: '# Hello, World',
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark, 
        markdown(),
        onUpdate
      ],
    })

    const view = new EditorView({
      state: startState,
      parent: editor.current,
    })

    return () => {
      view.destroy()
    }
  }, [])

  

  return (
    <div className='container'>
      <div ref={editor}/>
      <div>
        <ReactMarkdown>
          {code}
        </ReactMarkdown>
      </div>
    </div>
  )
}
