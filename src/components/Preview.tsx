"use client"
import { CompileContext } from '@/lib/CompileContext';
import { SandpackPreview, useSandpack, SandpackPreviewRef } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef } from 'react'

const Preview = () => {
    const previewRef = useRef<SandpackPreviewRef>(null);
    const { sandpack } = useSandpack();
    const {compile, setCompile}=useContext(CompileContext);

    useEffect(()=>{
        getSandpackClient();
    }, [sandpack && compile])

    const getSandpackClient = async () => {
        const client = previewRef.current?.getClient();
        if (client) {
            console.log(client);
            const result = await (client as any).getCodeSandboxURL();
            console.log(result);
            if(compile?.type=='deploy'){
                window.open(`https://${result?.sandboxId}.csb.app/`);
            } else if (compile?.type=='export'){
                window?.open(result?.editorUrl)
            }
        }
    }

    return (
        <SandpackPreview 
            ref={previewRef} 
            style={{ height: '81.4vh' }} 
            showNavigator={true} 
        />
    )
}

export default Preview