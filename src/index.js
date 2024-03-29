import { ThemeProvider, Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import awsExports from "./aws-exports";

Amplify.configure(awsExports);
/* can run this to check timing - places timestamp on each console.log comment */
console.log = (function() {
    var console_log = console.log;
    var timeStart = new Date().getTime();

    return function() {
        var delta = new Date().getTime() - timeStart;
        var args = [];
        args.push((delta / 1000).toFixed(2) + ':');
        for(var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        console_log.apply(console, args);
    };
})();
/* use for changing things in theme like fonts, colors, etc */
/* if used tokes but disabled for now */
const theme: Theme = {
    name: 'custom-theme',
    tokens: {
        colors: {
            green: {value: '#76C988'}
        },
        fonts: {
            default: {
                variable: {value:'\'Open Sans\',\'InterVariable\', \'Inter var\', \'Inter\', -apple-system, BlinkMacSystemFont,\'Helvetica Neue\', \'Segoe UI\', Oxygen, Ubuntu, Cantarell,sans-serif;'}
            }
        },
        components: {
            card: {
                // You can reference other tokens
                backgroundColor: { value: '{colors.background.success}' },
                borderRadius: { value: '{radii.large}' },
                padding: { value: '{space.xl}' },

                // Variations
                outlined: {
                    // Or use explicit values
                    borderWidth: { value: '10px' },
                    backgroundColor: { value: '{colors.background.warning}' },
                },
                elevated: {
                    backgroundColor: { value: '{colors.background.info}' },
                    boxShadow: { value: '{shadows.large}' },
                },
            },

        },
    },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme} >
          <Authenticator.Provider>
              <App />
          </Authenticator.Provider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
