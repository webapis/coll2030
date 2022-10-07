import * as React from 'react';
import { useEffect } from 'react';
export default function KeywordsEditorContainer() {

    useEffect(async () => {
        const response = await fetch('/keywords.json')
        const data = await response.json()
    }, [])
    return <div style={{ marginTop: 300, marginLeft: 300 }}>Keywords editor</div>
}