import red from '@material-ui/core/colors/red';

const themesConfig = {
    default    : {
        palette: {
            primary: {
                main: '#ffffff'
            },
            secondary: {
                main: '#f62f5e'
            },
            error    : red,
            text: {
                primary: '#2E2E2E'
            },
            darker: '#6c6c6c',
            dark: '#2E2E2E',
            medium: '#B4B4B4',
            light: '#f7f7f7',
            borders: "#efefef",
            borders2: "#e5e5e5",
            cyan: {
                main: '#00d3ca'
            }
        },
        typography: {
            useNextVariants: true,
            fontFamily: [
                'Open Sans'
            ].join(','),
        }
    }
};

export default themesConfig;
