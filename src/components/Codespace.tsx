"use client"
import React from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useTheme } from 'next-themes';

type Props = {}

const Codespace = (props: Props) => {
  const { theme } = useTheme();
  return (
    <div className='mt-1'>
      <SandpackProvider template="react" theme={theme === "dark" ? "dark" : "light"}>
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}

export default Codespace