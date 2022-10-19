import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Aggregation from './collected-reports/Aggregation';
import Analitics from './access-reports/Analitics';
import KeywordsRoutes from './keywords-editor/KeywordRoutes';

import AppBarComponent from './AppBarComponent';
import groupNames from './keywords-editor/groupNames';
export const AppContext = React.createContext();

const initState = {
    editor: {
        keywords: '',
        title: '',
        exclude: '',
        keywordType: '',
        groupName: '',
        functionName: ''
    },
    keywords: [], filteredGroupName: { groupName: '' },
    groupNames,
    showDisabledIsChecked: false
}
export default class App extends React.Component {

    constructor(props) {
        super(props);


        this.filterKeyword = (e) => {


            this.setState((prevState) => { return { ...prevState, filteredGroupName: groupNames.find(f => f.name === e.name) } })
            localStorage.setItem('filteredGroupName', JSON.stringify({ ...groupNames.find(f => f.name === e.name) }))



        }
        this.editKeyword = (id) => {
            const { keywords } = this.state
            const editor = keywords.find(f => f._id === id)
            debugger
            this.setState(prevState => {
                return { ...prevState, editor }
            })
            localStorage.setItem('editor', JSON.stringify(editor))
            window.location.replace('/keywords/editor')
        }

        this.setEditorValue = (e) => {
            const { name, value } = e.target

            let groupName = ''
            if (name === 'keywordType' && value === 'marka') {
                groupName = 'Marka'
            }
            else if (name === 'keywordType' && value === 'fiyat') {
                groupName = 'Fiyat'
            }

            this.setState((prevState) => {
                return { ...prevState, editor: { ...prevState.editor, [name]: value, groupName } }
            })

        }

        this.saveKeyword = async () => {
            const { editor, filteredGroupName: { keywordType, name: groupName, functionName } } = this.state
            debugger
            if (editor._id) {
                debugger
                const response = await fetch('/.netlify/functions/crud', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...editor, functionName, groupName })
                });

                await response.json()
                window.location.replace('/keywords')


            } else {

                const response = await fetch('/.netlify/functions/crud', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...editor, groupName, keywordType, functionName })
                });

                await response.json()

                window.location.replace('/keywords')
            }
        }


        this.toggleKeywordState = async (event) => {
            const { checked, id } = event.target


            const { keywords, filteredGroupName: { functionName } } = this.state
            const editor = keywords.find(f => f._id === id)
            const toggledState = { ...editor, functionName, disabled: true }
            if (checked) {
                debugger
                toggledState.disabled = false
            }

            debugger
            this.setState(prevState => {
                return { ...prevState, editor }
            })
            localStorage.setItem('editor', JSON.stringify(editor))

            const response = await fetch('/.netlify/functions/crud', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toggledState)
            });

            await response.json()
            debugger
            window.location.reload()
        }

        this.showDisabled = () => {

            this.setState(prevState => {
                return { ...prevState, showDisabledIsChecked: !prevState.showDisabledIsChecked }
            })

            localStorage.setItem('showDisabledIsChecked', !this.state.showDisabledIsChecked)

        }

        this.addKeyword = () => {
            const {filteredGroupName:{functionName,groupName,keywordType}}=this.state
            this.setState(prevState => {
                return { ...prevState, editor: {...initState.editor,functionName,groupName,keywordType} }
            })
            localStorage.setItem('editor', JSON.stringify(initState.editor))
            window.location.replace('/keywords/editor')
        }
        this.state = {
            addKeyword: this.addKeyword, showDisabled: this.showDisabled, saveKeyword: this.saveKeyword, setEditorValue: this.setEditorValue, filterKeyword: this.filterKeyword, editKeyword: this.editKeyword, toggleKeywordState: this.toggleKeywordState, ...initState

        };




    }
    async componentDidMount() {
        debugger
        await this.fetchKeywords()

        const filteredGroupName = JSON.parse(localStorage.getItem('filteredGroupName'))
        if (filteredGroupName === null) {
            localStorage.setItem('filteredGroupName', JSON.stringify({ groupName: '' }))
        } else {
            this.setState((prevState) => {
                return { ...prevState, filteredGroupName }
            })
        }
        const editor = JSON.parse(localStorage.getItem('editor'))
        if (editor) {
            this.setState((prevState) => {
                return { ...prevState, editor }
            })
        }
        const showDisabledIsChecked = JSON.parse(localStorage.getItem('showDisabledIsChecked'))
        if (showDisabledIsChecked) {
            this.setState((prevState) => {
                return { ...prevState, showDisabledIsChecked }
            })
        }
    }

    async fetchKeywords() {
        fetch('/.netlify/functions/crud?type=all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(({ data }) => {
            debugger
            this.setState((prevState) => { return { ...prevState, keywords: data } })



        })
    }


    render() {
        return (
            <AppContext.Provider value={this.state}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AppBarComponent />} />
                        <Route path="aggregation" element={<Aggregation />} />
                        <Route path="analitics" element={<Analitics />} />
                        <Route path="keywords/*" element={<KeywordsRoutes />} />
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>

        );
    }
}