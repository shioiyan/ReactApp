/*globals process: false */
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import client from 'axios'
import thunk from 'redux-thunk'
import {connectRouter, routerMiddleware} from 'connected-react-router'

import App from './App'
import reducer from './reducer/reducer'

// redux-devtoolの設定
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// 本番時はredux-devtoolを無効化する
if (process.env.NODE_ENV === 'production') {
    composeEnhancers = compose
}

// ブラウザ履歴保存用のストレージを作成
const history = createHistory()
// axiosをthunkの追加引数に加える
const thunkWithClient = thunk.withExtraArgument(client)
// redux-thunkをミドルウェアに適用、historyをミドルウェアに追加
const store = createStore(connectRouter(history)(reducer), composeEnhancers(applyMiddleware(routerMiddleware(history), thunkWithClient)))

// Material-UIテーマを上書きする
const theme = createMuiTheme({
    // https://material-ui.com/style/typography/#migration-to-typography-v2
    typography: {
        useNextVariants: true,
    },
    // カラーパレット
    palette: {
        type: 'light',
        // メインカラー
        primary: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#2196f3',
            600: '#1e88e5',
            700: '#1976d2',
            800: '#1565c0',
            900: '#0d47a1',
            A100: '#82b1ff',
            A200: '#448aff',
            A400: '#2979ff',
            A700: '#2962ff',
            contrastDefaultColor: 'light', // 対象色のデフォルト色をlightテーマにする
        },
        // アクセントカラー
        secondary: {
            50: '#fce4ec',
            100: '#f8bbd0',
            200: '#f48fb1',
            300: '#f06292',
            400: '#ec407a',
            500: '#e91e63',
            600: '#d81b60',
            700: '#c2185b',
            800: '#ad1457',
            900: '#880e4f',
            A100: '#ff80ab',
            A200: '#ff4081',
            A400: '#f50057',
            A700: '#c51162',
            contrastDefaultColor: 'light', // 対象色のデフォルト色をlightテーマにする
        },
    },
    // レスポンシブレイアウト用の指定
    'breakpoints': {
        'keys': [
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
        ],
        'values': {
            'xs': 360, // スマホ用
            'sm': 768, // タブレット用
            'md': 992, // PC用
            'lg': 1000000000,
            'xl': 1000000000,
        },
    },
    // Material-UIコンポーネントのclassのstyleを上書きする
    overrides: {
        MuiButton: {
            root: {
                // ボタン内アルファベット文字を大文字変換しない
                textTransform: 'none',
            },
        },
    },
})

const render = () => {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App history={history}/>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('root'),
    )
}

render(App)
