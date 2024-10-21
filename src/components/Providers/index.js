// src/index.js or src/LoginProvider.js
import currentProvider from './loginConfig';

import { JWTLoginProvider, JWTLoginContext, useJWTLogin } from './JWTLoginProvider.jsx';
import { FakeLoginProvider, FakeLoginContext, useFakeLogin } from './FakeLoginProvider.jsx';
import { LocalHostLoginProvider } from './LocalHostLoginProvider.jsx';
import { ChatifyLoginProvider, ChatifyLoginContext, useChatifyLogin } from './ChatifyLoginProvider.jsx';

const providers = {
    JWT: {
        provider: JWTLoginProvider,
        context: JWTLoginContext,
        hook: useJWTLogin
    },
    Fake: {
        provider: FakeLoginProvider,
        context: FakeLoginContext,
        hook: useFakeLogin
    },
    LocalHost: {
        provider: LocalHostLoginProvider,
        context: null,  // Assume it has no specific context or hook if not provided
        hook: null
    },
    Chatify: {
        provider: ChatifyLoginProvider,
        context: ChatifyLoginContext,
        hook: useChatifyLogin
    }
};

export const LoginProvider = providers[currentProvider].provider;
export const LoginContext = providers[currentProvider].context;
export const useLogin = providers[currentProvider].hook;
